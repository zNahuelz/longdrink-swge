import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import VoucherType from './voucher_type.js'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

export default class VoucherSerie extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare voucherTypeId: number

  @column()
  declare serie: string

  @column()
  declare nextCorrelative: number

  @column()
  declare isActive: boolean

  @belongsTo(() => VoucherType)
  declare voucherType: BelongsTo<typeof VoucherType>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @column.dateTime()
  declare deletedAt: DateTime | null
}
