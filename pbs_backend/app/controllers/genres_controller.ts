import Book from '#models/book'
import Genre from '#models/genre'

import type { HttpContext } from '@adonisjs/core/http'
export default class GenresController {
    // [GET] /genre
    async index({}: HttpContext) {
        return await Genre.all()
    }

    // [GET] /genre/find - find books in a specificq genre
    async display({ request, response, pagination }: HttpContext) {
        const { genreId } = request.params()
        try {
            const books = await Book.query()
                .preload('genres')
                .whereHas('genres', (builder) => builder.where('genres.id', genreId))
                .paginate(pagination.page, pagination.perPage)
            return response.ok(books)
        } catch (error) {
            // return error message and status if query fails
            return response.status(500).json({ message: 'Error occurred while fetching books' })
        }
    }
    // [POST] /genre/create - store a book in a specific genre
    async store({ request, auth, response }: HttpContext) {
        try {
            // get user
            // const user = await auth.authenticate()
            // if (!user) {
            //     throw new Error('Unauthorized Access')
            // }
            // get genre_name and book_id from request
            const { genreName, bookId } = request.qs()

            // find genre
            const genre = await Genre.findByOrFail('name', genreName)
            // add book to genre
            await genre.related('books').attach([bookId])
        } catch (error) {
            // return error message and status if not found
            return response
                .status(500)
                .json({ message: 'Error occurred while storing book in genre' })
        }
    }

    // [DELETE] /genre/delete - delete a book from specific genr
    async destroy({ auth, request, response }: HttpContext) {
        try {
            const user = await auth.authenticate()
            if (!user) {
                throw new Error('Unauthorized Access')
            }

            const { genreName, bookId } = request.qs()

            // find genre
            const genre = await Genre.findByOrFail('name', genreName)

            // remove book to genre
            await genre.related('books').detach([bookId])

            return response
        } catch (error) {
            // return error message and status if query fails
            return response
                .status(500)
                .json({ message: 'Error occurred while removing book from genre' })
        }
    }
}
