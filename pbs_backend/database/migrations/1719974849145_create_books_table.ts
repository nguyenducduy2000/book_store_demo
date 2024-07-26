import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
    protected tableName = 'books'

    async up() {
        this.schema.createTable(this.tableName, (table) => {
            table.increments('id').primary()
            table.string('title').notNullable()
            table.string('description').nullable()
            table.string('avatar').nullable()
            table.integer('isbn').nullable()
            table.integer('price').notNullable()
            table.integer('stock').notNullable()
            table.integer('author_id').unsigned().references('authors.id').onDelete('CASCADE')
            table.integer('publisher_id').unsigned().references('users.id').onDelete('CASCADE')

            table.timestamp('created_at')
            table.timestamp('updated_at')
        })
    }

    async down() {
        this.schema.dropTable(this.tableName)
    }
}
