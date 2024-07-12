import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column, manyToMany } from '@adonisjs/lucid/orm'
// import OrderItem from './order_item.js'
import type { BelongsTo, ManyToMany } from '@adonisjs/lucid/types/relations'
import User from './user.js'
import Book from './book.js'

export default class Order extends BaseModel {
    @column({ isPrimary: true })
    declare id: number

    @column()
    declare user_id: number

    @column({ columnName: 'order_date' })
    declare orderDate: Date

    @column({ columnName: 'total_items' })
    declare totalAmmount: number

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
}
