import { DateTime } from 'luxon'
import { BaseModel, column, hasOne } from '@adonisjs/lucid/orm'
import User from './user.js'
import type { HasOne } from '@adonisjs/lucid/types/relations'

export default class Employee extends BaseModel {
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

  @column.date()
  declare hiringDate: DateTime

  @column.date()
  declare dismissalDate: DateTime | null

  @column()
  declare position: string

  @hasOne(() => User)
  declare user: HasOne<typeof User>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @column.dateTime()
  declare deletedAt: DateTime | null
}
