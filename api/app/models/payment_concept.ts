import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import PaymentPlan from './payment_plan.js'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

export default class PaymentConcept extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  @column()
  declare amount: number

  @column()
  declare isEnrollment: boolean

  @column.date()
  declare dueDate: DateTime | null

  @column()
  declare paymentPlanId: number | null

  @belongsTo(() => PaymentPlan)
  declare paymentPlan: BelongsTo<typeof PaymentPlan>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
