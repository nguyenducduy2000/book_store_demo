import type { HttpContext } from '@adonisjs/core/http'
import Order from '#models/order'
import Book from '#models/book'
import { DateTime } from 'luxon'
export default class OrdersController {
    // [GET] /orders
    async index({ auth }: HttpContext) {
        const user = await auth.authenticate()
        const orders = await Order.query()
            .where('user_id', user.id)
            .where('status', 'instant')
            .preload('books')
        return orders
    }

    // [POST] /orders/create
    async createInstantOrder({ request, auth, response }: HttpContext) {
        const user = await auth.authenticate()
        const bookId = request.input('bookId')
        const quantity = request.input('quantity', 1) // default quantity to 1 if not provided
        const book = await Book.findOrFail(bookId)

        // Create a new instant order
        const newOrder = new Order()
        newOrder.user_id = user.id
        newOrder.status = 'instant'
        newOrder.totalItems = quantity
        newOrder.totalPrice = book.price * quantity
        newOrder.paymentMethod = 'cash' // default payment method, can be adjusted as needed
        await newOrder.save()

        // Attach the book to the order with the specified quantity
        await newOrder.related('books').attach({
            [book.id]: { quantity },
        })

        const updatedOrder = await Order.query()
            .where('id', newOrder.id)
            .preload('books')
            .firstOrFail()
        return response.json(updatedOrder)
    }

    // [DELETE] /orders/cancel/:id
    async cancelInstanceOrder({ params, auth, response }: HttpContext) {
        const user = await auth.authenticate()
        const orderId = params.id

        const order = await Order.query()
            .where('id', orderId)
            .where('user_id', user.id)
            .where('status', 'instant')
            .firstOrFail()

        await order.delete()
        return response.json({ message: 'Order cancelled successfully' })
    }
}
