import type { HttpContext } from '@adonisjs/core/http'
import Order from '#models/order'
import Book from '#models/book'
import { DateTime } from 'luxon'
export default class OrdersController {
    // [GET] /orders
    async index({ auth }: HttpContext) {
        // Authenticate the user
        const user = await auth.authenticate()

        // Query the orders
        const orders = await Order.query()
            .where('user_id', user.id)
            .whereNot('status', 'pending')
            .orderBy('created_at', 'desc')
            .preload('books')

        return orders
    }

    async checkout({ request, auth, response }: HttpContext) {
        try {
            // authenticate the user
            const user = await auth.authenticate()
            const data = await request.body()

            // update the order
            const order = await Order.query()
                .where('user_id', user.id)
                .where('status', 'pending')
                .firstOrFail()

            order.merge({
                status: request.input('status', order.status),
                clientPhoneNumber: request.input('phoneNumber', order.clientPhoneNumber),
                deliveryAddress: request.input('address', order.deliveryAddress),
                paymentMethod: request.input('paymentMethod', order.paymentMethod),
            })
            await order.save()
            response.status(200).json(order)
        } catch (error) {
            response.status(500).json({ message: 'Error occurred while fetching books' })
        }
    }

    async updateCheckout({ request, auth, response }: HttpContext) {
        try {
            // authenticate the user
            const user = await auth.authenticate()

            // find order by it's id
            const data = await request.body()

            const order = await Order.query().where('id', data.id).firstOrFail()

            // update the order status to paid
            order.merge({
                status: request.input('status', request.input('status', order.status)),
            })
            await order.save()
            const updatedOrders = await Order.query()
                .where('user_id', user.id)
                .whereNot('status', 'pending')
                .orderBy('created_at', 'desc')
                .preload('books')

            response.status(200).json(updatedOrders)
        } catch (error) {
            response.status(500).json({ message: 'Error occurred while fetching books' })
        }
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
