import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column, hasMany } from '@adonisjs/lucid/orm'
import OrderItem from './order_item.js'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import User from './user.js'

export default class Order extends BaseModel {
    @column({ isPrimary: true })
    declare id: number

    @column()
    declare user_id: number

    @column({ columnName: 'order_date' })
    declare orderDate: Date

    @column({ columnName: 'total_ammount' })
    declare totalAmmount: number

    @belongsTo(() => User, { foreignKey: 'user_id' })
    declare user: BelongsTo<typeof User>

    @hasMany(() => OrderItem, { foreignKey: 'order_id' })
    declare orderItems: HasMany<typeof OrderItem>

    @column.dateTime({ autoCreate: true })
    declare createdAt: DateTime

    @column.dateTime({ autoCreate: true, autoUpdate: true })
    declare updatedAt: DateTime
}
