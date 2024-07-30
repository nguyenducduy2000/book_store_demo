import Order from '#models/order'
import Book from '#models/book'
import { Redirect, type HttpContext } from '@adonisjs/core/http'
import { DateTime } from 'luxon'
export default class CartsController {
    // [GET] /carts
    async index({ auth }: HttpContext) {
        const user = await auth.authenticate()

        // Fetch the cart items with the pivot columns
        const cartItems = await Order.query()
            .where('user_id', user.id)
            .where('status', 'pending')
            .preload('books', (bookQuery) => {
                bookQuery.pivotColumns(['quantity'])
            })
            .first()

        if (!cartItems) {
            return null
        }

        // Convert cart items to plain JSON
        const formattedCartItems = cartItems.toJSON()

        // Map through the books to include pivot data
        formattedCartItems.books = cartItems.books.map((book: any) => {
            return {
                ...book.toJSON(),
                quantity: book.$extras?.pivot_quantity || 0,
            }
        })

        return formattedCartItems
    }

    // [GET] /carts/header
    async header({ auth }: HttpContext) {
        const user = await auth.authenticate()
        let cart
        if (user) {
            cart = await Order.query().where('user_id', user.id).where('status', 'pending').first()
            return cart
        }
    }

    // [POST] /carts/create
    // [POST] /carts/create
    async addItem({ request, auth, response }: HttpContext) {
        const user = await auth.authenticate()
        const bookId = request.input('bookId')
        const book = await Book.findOrFail(bookId)

        let order = await Order.query().where('user_id', user.id).where('status', 'pending').first()

        // If there is no existing order, create and save a new one
        if (!order) {
            order = new Order()
            order.user_id = user.id
            order.status = 'pending'
            order.totalItems = 0
            order.totalPrice = 0
            order.paymentMethod = 'cash'
            await order.save()
        }

        const existingBook = await order
            .related('books')
            .pivotQuery()
            .where('book_id', bookId)
            .first()

        if (existingBook) {
            await order
                .related('books')
                .pivotQuery()
                .where('book_id', bookId)
                .update({
                    quantity: existingBook.quantity + 1,
                })
        } else {
            await order.related('books').attach({
                [book.id]: { quantity: 1 },
            })
        }

        // Reload the order to trigger any hooks and ensure consistency
        await order.load('books')
        await order.save()

        // Return the updated order
        const updatedOrder = await Order.query()
            .where('id', order.id)
            .preload('books')
            .firstOrFail()
        return response.json(updatedOrder)
    }

    // [PATCH] /carts/update
    async update({ auth, request, response }: HttpContext) {
        const user = await auth.authenticate()
        const bookId = request.input('bookId')
        const quantity = request.input('quantity')
        // console.log({ bookId, quantity })

        const order = await Order.query()
            .preload('books')
            .where('user_id', user.id)
            .where('status', 'pending')
            .firstOrFail()

        await order.related('books').pivotQuery().where('book_id', bookId).update({ quantity })

        // Reload the order to trigger the hooks
        await order.load('books')
        await order.save()

        const updatedOrder = await Order.query()
            .where('id', order.id)
            .where('status', 'pending')
            .preload('books', (bookQuery) => {
                bookQuery.pivotColumns(['quantity'])
            })
            .firstOrFail()

        if (!updatedOrder) {
            return null
        }

        const formattedCartItems = updatedOrder.toJSON()

        formattedCartItems.books = updatedOrder.books.map((book: any) => {
            return {
                ...book.toJSON(),
                quantity: book.$extras?.pivot_quantity || 0,
            }
        })
        return formattedCartItems
        // return response.json(updatedOrder)
    }

    // [DELETE] /carts/delete
    async destroy({ auth, request, response }: HttpContext) {
        const user = await auth.authenticate()
        const bookId = request.input('bookId')

        const order = await Order.query()
            .preload('books')
            .where('user_id', user.id)
            .where('status', 'pending')
            .firstOrFail()

        await order.related('books').detach([bookId])

        // Reload the order to trigger the hooks
        await order.load('books')
        await order.save()

        const updatedOrder = await Order.query()
            .where('id', order.id)
            .preload('books')
            .firstOrFail()
        return response.json(updatedOrder)
    }
}
