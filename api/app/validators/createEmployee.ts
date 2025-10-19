import vine from '@vinejs/vine'
import { DateTime } from 'luxon'

const currentYear = DateTime.now().year
const minYear = currentYear - 17

export const CreateEmployeeValidator = vine.compile(
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
      .unique({ table: 'employees', column: 'citizen_id', caseInsensitive: true })
      .unique({ table: 'teachers', column: 'citizen_id', caseInsensitive: true })
      .unique({ table: 'students', column: 'citizen_id', caseInsensitive: true }),
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
    email: vine.string().email().unique({ table: 'users', column: 'email', caseInsensitive: true }),
  })
)
