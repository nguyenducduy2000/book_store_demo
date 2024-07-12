import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
    protected tableName = 'orders'

    async up() {
        this.schema.createTable(this.tableName, (table) => {
            table.increments('id')
            table.integer('user_id').unsigned().references('users.id').onDelete('CASCADE')
            table.dateTime('order_date').notNullable()
            table.integer('total_items').notNullable().defaultTo(0)
            table.integer('total_price').notNullable().defaultTo(0)
            table
                .enum('payment_method', ['cash', 'card', 'visa', 'paypal'])
                .notNullable()
                .defaultTo('cash')
            table
                .enum('status', ['pending', 'processing', 'paid', 'cancelled'])
                .notNullable()
                .defaultTo('pending')

            table.timestamp('created_at')
            table.timestamp('updated_at')
        })
    }

    async down() {
        this.schema.dropTable(this.tableName)
    }
}
