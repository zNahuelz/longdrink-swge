import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'course_evaluations'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('course_id').unsigned().references('courses.id')
      table.string('name', 50).notNullable()
      table.double('max_score').notNullable()
      table.double('weight').notNullable()
      table.integer('display_order').nullable()
      table.boolean('is_mandatory').nullable()
      table.boolean('is_default').nullable()
      table.timestamp('created_at')
      table.timestamp('updated_at')
      table.timestamp('deleted_at').nullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
