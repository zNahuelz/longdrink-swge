import type { HttpContext } from '@adonisjs/core/http'
import Employee from '../models/employee.js'
import { CreateEmployeeValidator } from '../validators/createEmployee.js'
import User from '../models/user.js'
import Role from '../models/role.js'
import db from '@adonisjs/lucid/services/db'
import { DateTime } from 'luxon'

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
}
