import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Ability from '../../app/models/ability.js'

export default class extends BaseSeeder {
  async run() {
    await Ability.createMany([
      {
        name: 'Permisos administrativos.',
        key: 'root',
        description: 'Permite el uso de todas las funciones del sistema.',
      },
    ])
  }
}
