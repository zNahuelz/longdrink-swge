import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Student from '../../app/models/student.js'
import { DateTime } from 'luxon'

export default class extends BaseSeeder {
  async run() {
    await Student.create({
      names: 'FRANCISCA',
      paternalSurname: 'GARCIA',
      maternalSurname: 'PEREZ',
      citizenId: '02233445',
      citizenIdType: 'DNI',
      phone: '555666777',
      address: 'Av. El Trebol 334',
      birthDate: DateTime.local(2003, 5, 16),
    })
  }
}
