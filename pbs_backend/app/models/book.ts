import { DateTime } from 'luxon'
import { BaseModel, column, manyToMany, belongsTo, hasMany, beforeSave } from '@adonisjs/lucid/orm'
import type { ManyToMany, BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import Genre from './genre.js'
import Category from './category.js'
import Author from './author.js'
import Review from './review.js'
import Order from './order.js'

export default class Book extends BaseModel {
    @column({ isPrimary: true })
    declare id: number

    @column()
    declare title: string

    @column()
    declare description: string

    @column()
    declare avatar: string

    @column({ columnName: 'author_id' })
    declare authorId: number

    @column()
    declare genre_id: number

    @column()
    declare isbn: number

    @column()
    declare price: number

    @column()
    declare stock: number

    @column({ columnName: 'publisher_id' })
    declare pub_id: number

    @column.dateTime({ autoCreate: true })
    declare createdAt: DateTime

    @column.dateTime({ autoCreate: true, autoUpdate: true })
    declare updatedAt: DateTime

    @hasMany(() => Review, { foreignKey: 'book_id' })
    declare reviews: HasMany<typeof Review>

    @manyToMany(() => Genre)
    declare genres: ManyToMany<typeof Genre>

    @manyToMany(() => Category)
    declare categories: ManyToMany<typeof Category>

    @manyToMany(() => Order, {
        pivotTable: 'cart_items',
        pivotColumns: ['quantity'],
    })
    declare orders: ManyToMany<typeof Order>

    @belongsTo(() => Author)
    declare author: BelongsTo<typeof Author>

    @beforeSave()
    static async beforeSave(book: Book) {
        if (book.$dirty.avatar) {
            book.avatar = JSON.stringify(book.avatar)
        }
    }
}
