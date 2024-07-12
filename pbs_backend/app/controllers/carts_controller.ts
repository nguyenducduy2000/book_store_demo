import Order from '#models/order'
import Book from '#models/book'
import type { HttpContext } from '@adonisjs/core/http'
export default class CartsController {
    async index({ auth }: HttpContext) {
        // get current user
        const user = await auth.authenticate()

        // find current cart list that belong to that user
        const cartItem = await Order.query().where('user_id', user.id).preload('books')
        return cartItem
    }

    async addItem({ request, auth }: HttpContext) {
        // find order belongs to user where current status is 'pending'
        const user = await auth.authenticate()
        const order = await Order.query()
            .where('user_id', user.id)
            .where('status', 'pending')
            .first()

        if (!order) {
            const newOrder = await Order.create({
                user_id: user.id,
                status: 'pending',
                orderDate: new Date(),
                totalAmmount: 0,
                totalPrice: 0,
                paymentMethod: 'cash',
            })
            return newOrder
        }
        // if (!order) {
        //     // create new order
        //     const newOrder = await Order.create({ user_id: user.id, status: 'pending' })
        //     return newOrder
        // }

        // find book by id
        const { bookId } = request.qs()
        const book = await Book.findOrFail(bookId)

        // select user's order if not exist then create new order

        // add book to cart
        order?.related('books').attach([book.id])
    }

    async update({ auth, request }: HttpContext) {
        // find order belongs to user where current status is 'pending'
        const user = await auth.authenticate()
        const order = await Order.query()
            .preload('books')
            .where('user_id', user.id)
            .where('status', 'pending')
            .first()

        if (!order) {
            throw new Error('Order not found')
        }

        console.log(order)

        // find book by id
        const { bookId, quantity } = request.qs()

        // update book in cart
        await order.related('books').pivotQuery().where('book_id', bookId).update({
            quantity: quantity,
        })
        return order
    }

    async destroy({ auth, request }: HttpContext) {
        // find order belongs to user where current status is 'pending'
        const user = await auth.authenticate()
        const order = await Order.query()
            .preload('books')
            .where('user_id', user.id)
            .where('status', 'pending')
            .first()
        if (!order) {
            throw new Error('Order not found')
        }

        // find book by id
        const { bookId } = request.qs()

        // delete book from cart if not found then return error
        await order.related('books').detach([bookId])
    }
}
