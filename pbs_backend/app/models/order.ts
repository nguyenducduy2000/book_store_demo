import { DateTime } from 'luxon'
import {
    afterDelete,
    afterSave,
    BaseModel,
    beforeSave,
    belongsTo,
    column,
    manyToMany,
} from '@adonisjs/lucid/orm'
import type { BelongsTo, ManyToMany } from '@adonisjs/lucid/types/relations'
import User from './user.js'
import Book from './book.js'

export default class Order extends BaseModel {
    @column({ isPrimary: true })
    declare id: number

    @column()
    declare user_id: number

    @column({ columnName: 'total_items' })
    declare totalItems: number

    @column({ columnName: 'total_price' })
    declare totalPrice: number

    @column({ columnName: 'payment_method' })
    declare paymentMethod: 'cash' | 'card' | 'visa' | 'paypal'

    @column()
    declare status: 'pending' | 'processing' | 'paid' | 'cancelled'

    @belongsTo(() => User, { foreignKey: 'user_id' })
    declare user: BelongsTo<typeof User>

    @manyToMany(() => Book, {
        pivotTable: 'cart_items',
        pivotColumns: ['quantity'],
    })
    declare books: ManyToMany<typeof Book>

    @column.dateTime({ autoCreate: true })
    declare createdAt: DateTime

    @column.dateTime({ autoCreate: true, autoUpdate: true })
    declare updatedAt: DateTime

    @afterSave()
    @afterDelete()
    @beforeSave()
    static async updateTotals(order: Order) {
        if (order.$isNew) {
            return
        }

        await order.load('books')
        const books = order.books

        order.totalItems = books.reduce(
            (total, book) => total + (book.$extras.pivot_quantity || 0),
            0
        )
        order.totalPrice = books.reduce(
            (total, book) => total + book.price * (book.$extras.pivot_quantity || 0),
            0
        )

        // Direct update to avoid recursion in hooks
        await Order.query().where('id', order.id).update({
            total_items: order.totalItems,
            total_price: order.totalPrice,
        })
    }
}
