import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import Student from './student.js'
import VoucherType from './voucher_type.js'
import VoucherSerie from './voucher_serie.js'
import PaymentType from './payment_type.js'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

export default class Voucher extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare subtotal: number

  @column()
  declare taxValue: number

  @column()
  declare taxPercentage: number

  @column()
  declare total: number

  @column()
  declare change: number

  @column()
  declare set: string

  @column()
  declare correlative: string

  @column()
  declare studentId: number

  @column()
  declare voucherTypeId: number

  @column()
  declare voucherSeriesId: number

  @column()
  declare paymentTypeId: number

  @belongsTo(() => Student)
  declare student: BelongsTo<typeof Student>

  @belongsTo(() => VoucherType)
  declare voucherType: BelongsTo<typeof VoucherType>

  @belongsTo(() => VoucherSerie)
  declare voucherSerie: BelongsTo<typeof VoucherSerie>

  @belongsTo(() => PaymentType)
  declare paymentType: BelongsTo<typeof PaymentType>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @column.dateTime()
  declare deletedAt: DateTime | null
}
