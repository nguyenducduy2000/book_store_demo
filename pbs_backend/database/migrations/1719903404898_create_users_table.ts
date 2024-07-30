import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
    protected tableName = 'users'

    async up() {
        this.schema.createTable(this.tableName, (table) => {
            table.increments('id').notNullable()
            table.string('username').nullable()
            table.string('password').notNullable()
            table.string('email', 254).notNullable()
            table.date('date_of_birth').nullable()
            table.string('phone_number').nullable()
            table.string('address').nullable()
            table.boolean('is_admin').defaultTo(false)
            table.boolean('is_active').defaultTo(true)

            table.timestamp('created_at').notNullable()
            table.timestamp('updated_at').nullable()
        })
    }

    async down() {
        this.schema.dropTable(this.tableName)
    }
}
