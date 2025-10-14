import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'grades'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('student_section_id').unsigned().references('student_sections.id').notNullable()
      table
        .integer('course_evaluation_id')
        .unsigned()
        .references('course_evaluations.id')
        .notNullable()
      table.double('score').notNullable()
      table.date('graded_at').notNullable()
      table.timestamp('created_at')
      table.timestamp('updated_at')
      table.timestamp('deleted_at').nullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
