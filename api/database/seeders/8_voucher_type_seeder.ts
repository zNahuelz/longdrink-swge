import { BaseSeeder } from '@adonisjs/lucid/seeders'
import VoucherType from '../../app/models/voucher_type.js'

export default class extends BaseSeeder {
  async run() {
    await VoucherType.createMany([{ name: 'BOLETA' }, { name: 'FACTURA' }])
  }
}
