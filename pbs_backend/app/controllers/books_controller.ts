import type { HttpContext } from '@adonisjs/core/http'
import Book from '#models/book'
import Author from '#models/author'
import BookPolicy from '#policies/book_policy'
import { inject } from '@adonisjs/core'
import { imageValidator } from '#validators/book'
import BookService from '#services/book_service'

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
        const book = await Book.find(id)

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
    @inject()
    async update({ request, bouncer, response }: HttpContext, bookService: BookService) {
        // check if user's role is admin
        if (await bouncer.with(BookPolicy).denies('create')) {
            return response.status(403).json({ message: 'Unauthorized' })
        }
        // get update data from request
        const req = request.body()
        const image = request.file('avatar')
        if (image) {
            await imageValidator.validate(image)
        }
        const data = {
            ...req,
            avatar: image?.toJSON(),
        }
        // console.log('before service:::', data)

        // update book in database
        await bookService.UpdateBook(data)

        // redirect to current book after update
        // return response.redirect(`/api/v1/books/${req.id}`)
    }

    // [DELETE] /books/:id - delete a specific book
    async destroy({ request, bouncer, response }: HttpContext) {
        // check if user's role is admin
        if (await bouncer.with(BookPolicy).denies('create')) {
            return response.status(403).json({ message: 'Unauthorized' })
        }

        // get id from request
        const id = request.qs().id

        // delete book from database
        const book = await Book.findOrFail(id)

        await book.delete()

        // redirect to index page
        return response.redirect('/api/v1/books')
    }
}
