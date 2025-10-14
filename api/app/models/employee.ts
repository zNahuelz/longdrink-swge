import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

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

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @column.dateTime()
  declare deletedAt: DateTime | null
}
