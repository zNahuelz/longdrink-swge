import factory from '@adonisjs/lucid/factories'
import Teacher from '#models/teacher'
import { DateTime } from 'luxon'

export const TeacherFactory = factory
  .define(Teacher, async ({ faker }) => {
    return {
      names: faker.person.firstName().toUpperCase(),
      paternalSurname: faker.person.lastName().toUpperCase(),
      maternalSurname: faker.person.lastName().toUpperCase(),
      citizenId: faker.string.numeric(8),
      citizenIdType: 'DNI',
      phone: faker.phone.number({ style: 'human' }).slice(0, 9),
      address: faker.location.streetAddress(),
      birthDate: DateTime.fromJSDate(faker.date.birthdate()),
      hiringDate: DateTime.now(),
      dismissalDate: null,
    }
  })
  .build()
