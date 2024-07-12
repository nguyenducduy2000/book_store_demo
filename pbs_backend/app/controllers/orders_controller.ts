import type { HttpContext } from '@adonisjs/core/http'
import Order from '#models/order'

export default class OrdersController {
    async index({}: HttpContext) {
        const order = await Order.query().preload('books')
        return order
    }

    async update({}: HttpContext) {
        const order = await Order.query().preload('books')
        return order
    }
}
