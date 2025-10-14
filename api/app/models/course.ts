import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column, hasMany } from '@adonisjs/lucid/orm'
import CourseEvaluation from './course_evaluation.js'
import PaymentPlan from './payment_plan.js'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'

export default class Course extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare code: string

  @column()
  declare name: string

  @column()
  declare description: string

  @column()
  declare image: string | null

  @column()
  declare paymentPlanId: number | null

  @belongsTo(() => PaymentPlan)
  declare paymentPlan: BelongsTo<typeof PaymentPlan>

  @hasMany(() => CourseEvaluation)
  declare evaluations: HasMany<typeof CourseEvaluation>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @column.dateTime()
  declare deletedAt: DateTime | null
}
