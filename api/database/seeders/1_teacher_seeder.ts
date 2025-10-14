import { BaseSeeder } from '@adonisjs/lucid/seeders'
import { DateTime } from 'luxon'
import Teacher from '../../app/models/teacher.js'

export default class extends BaseSeeder {
  async run() {
    const today = DateTime.now()

    await Teacher.create({
      names: 'JUAN',
      paternalSurname: 'JIMENEZ',
      maternalSurname: 'SANCHEZ',
      citizenId: '01122334',
      citizenIdType: 'DNI',
      phone: '999888777',
      address: 'Aija 4900 - Los Olivos',
      birthDate: DateTime.local(1990, 5, 20),
      hiringDate: today,
      dismissalDate: null,
    })
  }
}
