import type { HttpContext } from '@adonisjs/core/http'
import Employee from '../models/employee.js'
import { CreateEmployeeValidator } from '../validators/createEmployee.js'
import User from '../models/user.js'
import Role from '../models/role.js'
import db from '@adonisjs/lucid/services/db'
import { DateTime } from 'luxon'
import { UpdateEmployeeValidator } from '../validators/updateEmployee.js'

export default class EmployeeController {
  public async index({ request, response }: HttpContext) {
    try {
      const page = request.input('page', 1)
      const limit = request.input('limit', 10)
      const search = request.input('search', '')
      const searchBy = request.input('searchBy', 'all') // 'names' | 'citizen_id' | 'position' |'id' | 'all'
      const status = request.input('status', 'available') // 'available' | 'deleted' | 'all'
      const orderBy = request.input('orderBy', 'names')
      const orderDir = request.input('orderDir', 'asc') // 'asc' | 'desc'

      const query = Employee.query()

      if (search) {
        query.where((q) => {
          switch (searchBy) {
            case 'id':
              q.where('id', search)
              break
            case 'citizen_id':
              q.whereILike('citizen_id', `%${search}%`)
              break
            case 'position':
              q.whereILike('position', `%${search}%`)
              break
            case 'names':
              q.whereILike('names', `%${search}%`)
                .orWhereILike('paternal_surname', `%${search}%`)
                .orWhereILike('maternal_surname', `%${search}%`)
              break
            case 'all':
            default:
              q.whereILike('citizen_id', `%${search}%`).orWhereILike('names', `%${search}%`)
              break
          }
        })
      }

      switch (status) {
        case 'deleted':
          query.whereNotNull('deleted_at')
          break
        case 'available':
          query.whereNull('deleted_at')
          break
        case 'all':
          break
      }

      const employees = await query
        .preload('user', (userQuery) => {
          userQuery.preload('role')
        })
        .orderBy(orderBy, orderDir)
        .paginate(page, limit)

      employees.baseUrl(request.url())

      return response.ok(employees)
    } catch (error) {
      return response.internalServerError({
        message: 'Error en el listado de empleados, intente nuevamente.',
        error: error.message,
      })
    }
  }

  public async create({ request, response }: HttpContext) {
    const data = await request.validateUsing(CreateEmployeeValidator)
    try {
      const employee = await db.transaction(async (trx) => {
        const newEmployee = await Employee.create(
          {
            names: data.names.trim().toUpperCase(),
            paternalSurname: data.paternalSurname.trim().toUpperCase(),
            maternalSurname: data.maternalSurname.trim().toUpperCase(),
            citizenId: data.citizenId.trim(),
            citizenIdType: data.citizenIdType.trim().toUpperCase(),
            phone: data.phone.trim(),
            address: data.address.trim().toUpperCase(),
            birthDate: DateTime.fromJSDate(data.birthDate),
            hiringDate: DateTime.fromJSDate(data.hiringDate),
            position: data.position.trim().toUpperCase(),
          },
          { client: trx }
        )

        const role = await Role.query({ client: trx }).where('id', data.roleId).firstOrFail()

        const firstNameLetter = newEmployee.names.trim()[0].toUpperCase()
        const paternalLetter = newEmployee.paternalSurname.trim()[0].toUpperCase()
        const username = `${firstNameLetter}${paternalLetter}${newEmployee.citizenId}`

        await User.create(
          {
            username,
            email: data.email,
            password: username,
            profilePicture: null,
            roleId: role.id,
            employeeId: newEmployee.id,
          },
          { client: trx }
        )

        return newEmployee
      })

      await employee.load('user', (query) => query.preload('role'))

      return response.created({
        message: 'Empleado registrado correctamente.',
        employee,
      })
    } catch (error) {
      return response.badRequest({
        message:
          'Error durante el registro de empleado, operación cancelada. Intente nuevamente o comuniquese con administración.',
        error: error.messages || error.message,
      })
    }
  }

  public async update({ params, request, response }: HttpContext) {
    const id = params.id
    const data = await request.validateUsing(UpdateEmployeeValidator, {
      meta: { employeeId: id },
    })

    try {
      const updatedEmployee = await db.transaction(async (trx) => {
        const employee = await Employee.query({ client: trx })
          .where('id', id)
          .preload('user', (u) => u.preload('role'))
          .firstOrFail()

        const citizenIdChanged = employee.citizenId.trim() !== data.citizenId.trim()

        employee.merge({
          names: data.names.trim().toUpperCase(),
          paternalSurname: data.paternalSurname.trim().toUpperCase(),
          maternalSurname: data.maternalSurname.trim().toUpperCase(),
          citizenId: data.citizenId.trim(),
          citizenIdType: data.citizenIdType.trim().toUpperCase(),
          phone: data.phone.trim(),
          address: data.address.trim().toUpperCase(),
          birthDate: DateTime.fromJSDate(data.birthDate),
          hiringDate: DateTime.fromJSDate(data.hiringDate),
          position: data.position.trim().toUpperCase(),
        })
        await employee.save()

        const user = employee.user
        if (!user) throw new Error('El empleado no tiene usuario asociado.')

        if (citizenIdChanged) {
          const firstNameLetter = employee.names.trim()[0].toUpperCase()
          const paternalLetter = employee.paternalSurname.trim()[0].toUpperCase()
          user.username = `${firstNameLetter}${paternalLetter}${employee.citizenId}`
        }

        user.email = data.email
        user.roleId = data.roleId

        await user.save()

        return employee
      })

      await updatedEmployee.load('user', (query) => query.preload('role'))

      return response.ok({
        message: 'Empleado actualizado correctamente.',
        employee: updatedEmployee,
      })
    } catch (error) {
      return response.badRequest({
        message: 'Error durante la actualización de empleado. Operación cancelada.',
        error: error.messages || error.message,
      })
    }
  }

  public async show({ response, params }: HttpContext) {
    const id = Number(params.id)

    if (!Number.isInteger(id) || id <= 0) {
      return response.badRequest({ message: 'El ID de empleado debe ser numérico.' })
    }

    const employee = await Employee.query()
      .where('id', id)
      .preload('user', (userQuery) => {
        userQuery.preload('role', (roleQuery) => {
          roleQuery.preload('abilities')
        })
      })
      .first()

    if (!employee) {
      return response.notFound({ message: `Empleado de ID: ${id} no encontrado.` })
    }

    return response.ok(employee)
  }
}
