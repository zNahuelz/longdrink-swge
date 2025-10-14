import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'vouchers'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.double('subtotal').notNullable()
      table.double('tax_value').notNullable()
      table.double('tax_percentage').notNullable()
      table.double('total').notNullable()
      table.double('change').notNullable()
      table.string('set', 30).notNullable()
      table.string('correlative', 30).notNullable()
      table.integer('student_id').unsigned().references('students.id').notNullable()
      table.integer('voucher_type_id').unsigned().references('voucher_types.id').notNullable()
      table.integer('voucher_series_id').unsigned().references('voucher_series.id').notNullable()
      table.integer('payment_type_id').unsigned().references('payment_types.id').notNullable()
      table.timestamp('created_at')
      table.timestamp('updated_at')
      table.timestamp('deleted_at').nullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
