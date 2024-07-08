import type { HttpContext } from '@adonisjs/core/http'
import Book from '#models/book'
import Author from '#models/author'
import BookPolicy from '#policies/book_policy'
// import { inject } from '@adonisjs/core'
import { imageValidator } from '#validators/book'

export default class BooksController {
    // [GET] /books - display all books
    async index({}: HttpContext) {
        return Book.all()
    }

    // [GET] /books/:id - display a specific book
    async show({ request, response }: HttpContext) {
        // get id from request
        const id = Number(request.param('id'))

        // find book by id
        const book = await Book.findBy('id', id)

        // return book if found
        if (book) {
            return book
        }

        // return error if book not found
        return response.status(404).json({ message: 'Book not found' })
    }

    // [POST] /books - create a new book
    // @inject()
    async store({ bouncer, request, response, auth }: HttpContext) {
        // check if user's role is admin
        if (await bouncer.with(BookPolicy).denies('create')) {
            return response.status(403).json({ message: 'Unauthorized' })
        }
        // get user_id
        const user = await auth.authenticate()

        // get date from request
        const params = request.body()
        const image = request.file('avatar')

        // save inmage locally
        const imageUpload = await imageValidator.validate(image)
        // await imageUpload.move(app.makePath('uploads'))

        // check if author_id exists in database
        if (params.author_id) {
            const author = await Author.findBy('id', params.author_id)
            if (!author) {
                await Author.create({ id: params.author_id })
            }
        }

        // create new book instance in database
        const book = await Book.create({
            ...params,
            avatar: imageUpload.clientName,
            pub_id: user.id,
        })
        return book
    }

    // [PUT] /books/:id - update a specific book
    async update({ bouncer, response }: HttpContext) {
        // check if user's role is admin
        if (await bouncer.with(BookPolicy).denies('create')) {
            return response.status(403).json({ message: 'Unauthorized' })
        }
    }

    // [DELETE] /books/:id - delete a specific book
    async destroy({ bouncer, response }: HttpContext) {
        // check if user's role is admin
        if (await bouncer.with(BookPolicy).denies('create')) {
            return response.status(403).json({ message: 'Unauthorized' })
        }
    }
}
