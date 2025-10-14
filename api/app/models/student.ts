import { DateTime } from 'luxon'
import { BaseModel, column, manyToMany } from '@adonisjs/lucid/orm'
import Section from './section.js'
import type { ManyToMany } from '@adonisjs/lucid/types/relations'

export default class Student extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare names: string

  @column()
  declare paternalSurname: string

  @column()
  declare maternalSurname: string

  @column()
  declare citizenId: string

  @column()
  declare citizenIdType: string

  @column()
  declare phone: string

  @column()
  declare address: string

  @column.date()
  declare birthDate: DateTime

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @column.dateTime()
  declare deletedAt: DateTime | null
}
