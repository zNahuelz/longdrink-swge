import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'sections'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('course_id').unsigned().references('id').inTable('courses').notNullable()
      table.integer('teacher_id').unsigned().references('id').inTable('teachers').notNullable()
      table.date('start_date').notNullable()
      table.date('end_date').notNullable()
      table.integer('capacity').notNullable()
      table
        .enu('status', ['OPEN', 'CLOSED', 'FINISHED', 'SCHEDULED'])
        .notNullable()
        .defaultTo('SCHEDULED')
      table.timestamp('created_at')
      table.timestamp('updated_at')
      table.timestamp('deleted_at').nullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
