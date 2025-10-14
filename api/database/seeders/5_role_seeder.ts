import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Role from '../../app/models/role.js'
import Ability from '../../app/models/ability.js'

export default class extends BaseSeeder {
  async run() {
    const admin = await Role.create({ name: 'ADMINISTRADOR' })
    await Role.createMany([{ name: 'DOCENTE' }, { name: 'ALUMNO' }, { name: 'SECRETARIA' }])

    const abilities = await Ability.all()
    const abilityMap = Object.fromEntries(abilities.map((a) => [a.key, a]))

    await admin.related('abilities').attach([abilityMap['root'].id])
  }
}
