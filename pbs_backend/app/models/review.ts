import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import User from './user.js'
import Book from './book.js'

export default class Review extends BaseModel {
    @column({ isPrimary: true })
    declare id: number

    @column({ columnName: 'user_id' })
    declare userId: number

    @column({ columnName: 'book_id' })
    declare bookId: number

    @column()
    declare rating: number

    @column()
    declare comment: string

    @column({ columnName: 'review_date' })
    declare reviewDate: Date

    @column.dateTime({ autoCreate: true })
    declare createdAt: DateTime

    @column.dateTime({ autoCreate: true, autoUpdate: true })
    declare updatedAt: DateTime

    @belongsTo(() => User, {
        foreignKey: 'user_id',
    })
    declare user: BelongsTo<typeof User>

    @belongsTo(() => Book, {
        foreignKey: 'book_id',
    })
    declare book: BelongsTo<typeof Book>
}
