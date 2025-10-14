import { BaseSeeder } from '@adonisjs/lucid/seeders'
import PaymentType from '../../app/models/payment_type.js'

export default class extends BaseSeeder {
  async run() {
    await PaymentType.createMany([
      { name: 'EFECTIVO' },
      { name: 'TARJETA BANCARIA' },
      { name: 'YAPE' },
      { name: 'PLIN' },
    ])
  }
}
