import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column, hasMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import Course from './course.js'
import Grade from './grade.js'

export default class CourseEvaluation extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare courseId: number

  @belongsTo(() => Course)
  declare course: BelongsTo<typeof Course>

  @column()
  declare name: string

  @column()
  declare maxScore: number

  @column()
  declare weight: number

  @column()
  declare displayOrder: number

  @column()
  declare isMandatory: boolean

  @column()
  declare isDefault: boolean

  @hasMany(() => Grade)
  declare grades: HasMany<typeof Grade>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @column.dateTime()
  declare deletedAt: DateTime | null
}
