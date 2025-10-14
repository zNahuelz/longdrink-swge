import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import Voucher from './voucher.js'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import PaymentConcept from './payment_concept.js'

export default class VoucherDetail extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare voucherId: number

  @column()
  declare paymentConceptId: number

  @column()
  declare amountPaid: number

  @belongsTo(() => Voucher)
  declare voucher: BelongsTo<typeof Voucher>

  @belongsTo(() => PaymentConcept)
  declare paymentConcept: BelongsTo<typeof PaymentConcept>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @column.dateTime()
  declare deletedAt: DateTime | null
}
