import { DateTime } from 'luxon'
import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import PaymentConcept from './payment_concept.js'
import type { HasMany } from '@adonisjs/lucid/types/relations'

export default class PaymentPlan extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  @column()
  declare totalMonths: number

  @column()
  declare isTemplate: boolean

  @column()
  declare templateName: string | null

  @hasMany(() => PaymentConcept)
  declare concepts: HasMany<typeof PaymentConcept>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @column.dateTime()
  declare deletedAt: DateTime | null
}
