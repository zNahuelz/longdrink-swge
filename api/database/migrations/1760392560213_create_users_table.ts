import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'users'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').notNullable()
      table.string('username', 20).notNullable().unique()
      table.string('email', 50).notNullable().unique()
      table.string('password').notNullable()
      table.string('profile_picture').nullable()
      table.integer('role_id').unsigned().references('id').inTable('roles').onDelete('SET NULL')
      table.integer('employee_id').unsigned().references('employees.id').nullable().unique()
      table.integer('student_id').unsigned().references('students.id').nullable().unique()
      table.integer('teacher_id').unsigned().references('teachers.id').nullable().unique()
      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').nullable()
      table.timestamp('deleted_at').nullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
