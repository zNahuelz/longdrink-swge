import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column, manyToMany } from '@adonisjs/lucid/orm'
import CourseEvaluation from './course_evaluation.js'
import type { BelongsTo, ManyToMany } from '@adonisjs/lucid/types/relations'
import Section from './section.js'
import Student from './student.js'

export default class Grade extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare studentSectionId: number

  @column()
  declare courseEvaluationId: number

  @belongsTo(() => CourseEvaluation)
  declare courseEvaluation: BelongsTo<typeof CourseEvaluation>

  @column()
  declare score: number

  @column.date()
  declare gradedAt: DateTime

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @column.dateTime()
  declare deletedAt: DateTime | null
}
