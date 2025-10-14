import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Employee from '../../app/models/employee.js'
import { DateTime } from 'luxon'

export default class extends BaseSeeder {
  async run() {
    const today = DateTime.now()

    await Employee.create({
      names: 'ADMINISTRADOR',
      paternalSurname: '-----',
      maternalSurname: '-----',
      citizenId: '00000001',
      citizenIdType: 'DNI',
      phone: '999999999',
      address: '-----',
      birthDate: DateTime.local(2000, 1, 1),
      hiringDate: today,
      dismissalDate: null,
      position: 'GERENTE',
    })

    await Employee.create({
      names: 'ALEJANDRA',
      paternalSurname: 'SUAREZ',
      maternalSurname: 'MALAVER',
      citizenId: '03344556',
      citizenIdType: 'DNI',
      phone: '111222333',
      address: 'Av. Globo Terraqueo 103',
      birthDate: DateTime.local(1999, 3, 14),
      hiringDate: today,
      dismissalDate: null,
      position: 'SECRETARIA',
    })
  }
}
