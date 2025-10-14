import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import Section from './section.js'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

export default class Attendance extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare studentSectionId: number

  @belongsTo(() => Section)
  declare section: BelongsTo<typeof Section>

  @column.date()
  declare date: DateTime

  @column()
  declare status: 'PRESENT' | 'ABSENT' | 'LATE' | 'EXCUSED'

  @column()
  declare note: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @column.dateTime()
  declare deletedAt: DateTime | null
}
