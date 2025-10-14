import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'attendances'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('student_section_id').unsigned().references('student_sections.id').notNullable()
      table.date('date').notNullable()
      table.enu('status', ['PRESENT', 'ABSENT', 'LATE', 'EXCUSED']).defaultTo('PRESENT')
      table.string('note', 100).nullable()
      table.timestamp('created_at')
      table.timestamp('updated_at')
      table.timestamp('deleted_at').nullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
