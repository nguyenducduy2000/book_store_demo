import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import Order from './order.js'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

export default class OrderItem extends BaseModel {
    @column({ isPrimary: true })
    declare id: number

    @column({ columnName: 'order_id' })
    declare orderId: number

    @column({ columnName: 'book_id' })
    declare bookId: number

    @column()
    declare quantity: number

    @belongsTo(() => Order, {
        foreignKey: 'order_id',
    })
    declare order: BelongsTo<typeof Order>

    @column.dateTime({ autoCreate: true })
    declare createdAt: DateTime

    @column.dateTime({ autoCreate: true, autoUpdate: true })
    declare updatedAt: DateTime
}
