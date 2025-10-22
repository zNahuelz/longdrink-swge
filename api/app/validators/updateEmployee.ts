import vine from '@vinejs/vine'
import { DateTime } from 'luxon'

const currentYear = DateTime.now().year
const minYear = currentYear - 17

export const UpdateEmployeeValidator = vine.compile(
  vine.object({
    names: vine
      .string()
      .minLength(2)
      .maxLength(30)
      .regex(/^[a-zA-ZáéíóúüñÁÉÍÓÚÜÑ\s]{2,30}$/)
      .regex(/^\S.*$/)
      .regex(/^.*\S.*$/),

    paternalSurname: vine
      .string()
      .minLength(2)
      .maxLength(30)
      .regex(/^[a-zA-ZáéíóúüñÁÉÍÓÚÜÑ\s]{2,30}$/)
      .regex(/^\S.*$/)
      .regex(/^.*\S.*$/),

    maternalSurname: vine
      .string()
      .minLength(2)
      .maxLength(30)
      .regex(/^[a-zA-ZáéíóúüñÁÉÍÓÚÜÑ\s]{2,30}$/)
      .regex(/^\S.*$/)
      .regex(/^.*\S.*$/),

    citizenId: vine
      .string()
      .minLength(8)
      .maxLength(15)
      .regex(/^[0-9]{8,15}$/)
      .unique(async (db, value, field) => {
        const employeeQuery = db.from('employees').where('citizen_id', value)
        if (field.meta?.employeeId) {
          employeeQuery.whereNot('id', field.meta.employeeId)
        }
        const employeeExists = await employeeQuery.first()
        const teacherExists = await db.from('teachers').where('citizen_id', value).first()
        const studentExists = await db.from('students').where('citizen_id', value).first()

        return !(employeeExists || teacherExists || studentExists)
      }),

    citizenIdType: vine.string().in(['DNI', 'PASAPORTE', 'C.EXT', 'OTRO']),

    phone: vine
      .string()
      .minLength(6)
      .maxLength(15)
      .regex(/^\+?\d{6,15}$/),

    address: vine
      .string()
      .minLength(5)
      .maxLength(150)
      .regex(/^\S.*$/)
      .regex(/^.*\S.*$/),

    birthDate: vine.date().before(`${minYear}-12-31`),
    hiringDate: vine.date().beforeOrEqual('today'),
    position: vine.string().in(['GERENTE', 'ENCARGADO', 'SECRETARIA', 'OTRO']),

    roleId: vine.number().exists(async (db, value) => {
      const role = await db.from('roles').where('id', value).first()
      return !!role
    }),
    email: vine
      .string()
      .email()
      .unique(async (db, value, field) => {
        const query = db.from('users').where('email', value)
        if (field.meta?.employeeId) {
          const currentUser = await db
            .from('users')
            .where('employee_id', field.meta.employeeId)
            .first()

          if (currentUser) {
            query.whereNot('id', currentUser.id)
          }
        }
        const existing = await query.first()
        return !existing
      }),
  })
)
