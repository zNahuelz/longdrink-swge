import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'payment_concepts'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('name', 50).notNullable()
      table.double('amount').notNullable()
      table.boolean('is_enrollment').notNullable().defaultTo(false)
      table.date('due_date').nullable()
      table.integer('payment_plan_id').unsigned().references('payment_plans.id')
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
