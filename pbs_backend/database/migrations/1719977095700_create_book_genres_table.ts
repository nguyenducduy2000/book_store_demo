import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
    protected tableName = 'book_genres'

    async up() {
        this.schema.createTable(this.tableName, (table) => {
            table.increments('id').primary()
            table.integer('book_id').unsigned().references('books.id').onDelete('CASCADE')
            table.integer('genre_id').unsigned().references('genres.id').onDelete('CASCADE')
            table.unique(['book_id', 'genre_id'])

            table.timestamp('created_at')
            table.timestamp('updated_at')
        })
    }

    async down() {
        this.schema.dropTable(this.tableName)
    }
}
