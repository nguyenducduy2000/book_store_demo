// import { DateTime } from 'luxon'
import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'
// import { DbAccessTokensProvider } from '@adonisjs/auth/access_tokens'
import parseDuration from 'parse-duration'

import { JwtAccessTokenProvider, JwtSecret } from '#providers/jwt_access_token_provider'
import Book from './book.js'
import Order from './order.js'
import { DateTime } from 'luxon'
import Review from './review.js'

export default class User extends BaseModel {
    @column({ isPrimary: true })
    declare id: number

    @column()
    declare username: string | null

    @column()
    declare password: string

    @column()
    declare email: string

    @column({ columnName: 'date_of_birth' })
    declare dateOfBirth: Date | null

    @column({ columnName: 'is_admin' })
    declare isAdmin: boolean

    @column.dateTime({ autoCreate: true })
    declare createdAt: DateTime

    @column.dateTime({ autoCreate: true, autoUpdate: true })
    declare updatedAt: DateTime | null

    @hasMany(() => Book, { foreignKey: 'pub_id' })
    declare books: HasMany<typeof Book>

    @hasMany(() => Review, { foreignKey: 'user_id' })
    declare reviews: HasMany<typeof Review>

    @hasMany(() => Order, { foreignKey: 'user_id' })
    declare orders: HasMany<typeof Order>

    static accessTokens = JwtAccessTokenProvider.forModel(User, {
        expiresInMillis: parseDuration('1 day')!,
        key: new JwtSecret('BjBZ-s9JFJTBwUsOo1Ml-fzkCqja_byX'),
        primaryKey: 'id',
        algorithm: 'HS256',
        audience: 'https://client.example.com',
        issuer: 'https://server.example.com',
    })
}
