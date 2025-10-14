import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'courses'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('code', 15).notNullable().unique()
      table.string('name', 150).notNullable()
      table.string('description').notNullable()
      table.string('image').nullable()
      table.integer('payment_plan_id').unsigned().references('id').inTable('payment_plans')
      table.timestamp('created_at')
      table.timestamp('updated_at')
      table.timestamp('deleted_at').nullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
