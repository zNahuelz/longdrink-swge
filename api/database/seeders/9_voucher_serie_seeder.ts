import { BaseSeeder } from '@adonisjs/lucid/seeders'
import VoucherSerie from '../../app/models/voucher_serie.js'

export default class extends BaseSeeder {
  async run() {
    await VoucherSerie.create({
      voucherTypeId: 1,
      serie: 'B001',
      nextCorrelative: 1,
      isActive: true,
    })

    await VoucherSerie.create({
      voucherTypeId: 2,
      serie: 'F001',
      nextCorrelative: 1,
      isActive: true,
    })
  }
}
