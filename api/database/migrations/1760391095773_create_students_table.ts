import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'students'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('names', 30).notNullable()
      table.string('paternal_surname', 30).notNullable()
      table.string('maternal_surname', 30).notNullable()
      table.string('citizen_id', 20).notNullable().unique()
      table.string('citizen_id_type', 30).notNullable()
      table.string('phone', 15).notNullable()
      table.string('address', 150).notNullable()
      table.date('birth_date').notNullable()
      table.timestamp('created_at')
      table.timestamp('updated_at')
      table.timestamp('deleted_at').nullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
