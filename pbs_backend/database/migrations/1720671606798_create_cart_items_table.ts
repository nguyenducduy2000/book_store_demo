import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
    protected tableName = 'cart_items'

    async up() {
        this.schema.createTable(this.tableName, (table) => {
            table.integer('order_id').unsigned().references('orders.id').onDelete('CASCADE')
            table.integer('book_id').unsigned().references('books.id').onDelete('CASCADE')
            table.integer('quantity').notNullable().defaultTo(1)
            table.unique(['order_id', 'book_id'])
            table.timestamp('created_at')
            table.timestamp('updated_at')
        })
    }

    async down() {
        this.schema.dropTable(this.tableName)
    }
}
