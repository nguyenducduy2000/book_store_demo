import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
    protected tableName = 'reviews'

    async up() {
        this.schema.createTable(this.tableName, (table) => {
            table.increments('id')
            table.integer('user_id').unsigned().references('users.id').onDelete('CASCADE')
            table.integer('book_id').unsigned().references('books.id').onDelete('CASCADE')
            table.integer('rating').notNullable()
            table.text('comment').nullable()
            table.timestamp('review_date').notNullable()

            table.timestamp('created_at')
            table.timestamp('updated_at')
        })
    }

    async down() {
        this.schema.dropTable(this.tableName)
    }
}
