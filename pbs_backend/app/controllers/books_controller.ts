import type { HttpContext } from '@adonisjs/core/http'
import Book from '#models/book'
// import Order from '#models/order'
import Author from '#models/author'
import Genre from '#models/genre'
import cloudinary from '../../cloudinary.config.js'
import { v4 as uuidv4 } from 'uuid'
import { Buffer } from 'buffer'

import BookPolicy from '#policies/book_policy'
import { inject } from '@adonisjs/core'
import { imageValidator } from '#validators/book'
import BookService from '#services/book_service'
import { BookFactory, AuthorFactory, OrderFactory } from '#database/factories/book_factory'
export default class BooksController {
    // [GET] /books - display all books
    async index({ response }: HttpContext) {
        try {
            const [Comedy, Romance, Fantasy] = await Promise.all([
                Book.query()
                    .preload('author')
                    .preload('genres')
                    .whereHas('genres', (builder) => builder.where('name', 'Comedy'))
                    .limit(10),
                Book.query()
                    .preload('author')
                    .preload('genres')
                    .whereHas('genres', (builder) => builder.where('name', 'Romance'))
                    .limit(10),
                Book.query()
                    .preload('author')
                    .preload('genres')
                    .whereHas('genres', (builder) => builder.where('name', 'Fantasy'))
                    .limit(10),
            ])

            // console.log('Load books successfully')
            return { Comedy, Romance, Fantasy }
        } catch (error) {
            response.status(500).json({ message: 'Error occurred while fetching books' })
        }
    }

    async getLastestBooks({}: HttpContext) {
        const books = await Book.query()
            .preload('author')
            .preload('genres')
            .orderBy('created_at', 'desc')
            .limit(15)

        return books
    }

    async factory({}: HttpContext) {
        // const author = await AuthorFactory.make()
        // const user = await BookFactory.with('author', 2).createMany(10)
        const order = await OrderFactory.create()
        // return user1
        return order
    }

    // [GET] /books/:id - display a specific book
    async show({ request, response }: HttpContext) {
        // get id from request
        const id = Number(request.param('id'))

        // find book by id
        const book = await Book.query().where('id', id).preload('author').preload('genres').first()

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
        // Check if the user's role is admin
        const user = await auth.authenticate()
        if (await bouncer.with('BookPolicy').denies('create')) {
            return response.status(403).json({ message: 'Unauthorized' })
        }

        // Validate request data
        const data = request.only([
            'title',
            'description',
            'author',
            'isbn',
            'price',
            'stock',
            'genreId',
        ])
        const avatarData = request.input('avatar')
        let avatarUrl = null

        // Validate the avatar file
        if (avatarData && avatarData.length > 0) {
            try {
                const base64String = avatarData[0].thumbUrl.split(',')[1]
                const buffer = Buffer.from(base64String, 'base64')

                // Handle avatar upload to Cloudinary with a promise
                const uploadToCloudinary = () => {
                    return new Promise((resolve, reject) => {
                        const uploadStream = cloudinary.uploader.upload_stream(
                            { public_id: uuidv4(), folder: 'uploads' },
                            (error, result) => {
                                if (error) {
                                    reject(error)
                                } else {
                                    resolve(result.secure_url)
                                }
                            }
                        )
                        uploadStream.end(buffer)
                    })
                }

                avatarUrl = await uploadToCloudinary()
                // console.log(avatarUrl)
            } catch (error) {
                console.error('Cloudinary upload error:', error)
                return response.status(500).json({ message: 'Image upload failed' })
            }
        }

        // Find or create the author
        let author = await Author.findBy('name', data.author)
        if (!author) {
            author = await Author.create({ name: data.author })
        }

        // Create the book
        const book = await Book.create({
            title: data.title,
            description: data.description,
            avatar: avatarUrl,
            isbn: data.isbn,
            price: Number(data.price),
            stock: Number(data.stock),
            pubId: user.id,
        })

        // Attach genres
        if (data.genreId && Array.isArray(data.genreId)) {
            const genres = await Genre.query().whereIn('id', data.genreId)
            await book.related('genres').attach(genres.map((genre) => genre.id))
        }

        // Attach book to author
        await book.related('author').associate(author)

        // Return the created book
        return response.json({
            id: book.id,
            title: book.title,
            description: book.description,
            avatar: book.avatar,
            author: author.name,
            genres: await book.related('genres').query(),
            isbn: book.isbn,
            price: book.price,
            stock: book.stock,
            createdAt: book.createdAt,
            updatedAt: book.updatedAt,
        })
    }

    // [PUT] /books/:id - update a specific book
    // @inject()
    // async update({ request, bouncer, response }: HttpContext, bookService: BookService) {
    //     // check if user's role is admin
    //     if (await bouncer.with(BookPolicy).allows('create')) {
    //         return response.status(403).json({ message: 'Unauthorized' })
    //     }
    //     // get update data from request
    //     const req = request.body()
    //     const image = request.file('avatar')
    //     if (image) {
    //         await imageValidator.validate(image)
    //     }
    //     const data = {
    //         ...req,
    //         avatar: image?.toJSON(),
    //     }

    //     // update book in database
    //     await bookService.UpdateBook(data)
    // }
    async update({ request, bouncer, response, auth }: HttpContext) {
        // Check if the user's role is admin
        const user = await auth.authenticate()
        if (await bouncer.with('BookPolicy').denies('edit')) {
            return response.status(403).json({ message: 'Unauthorized' })
        }

        const data = request.only([
            'id',
            'title',
            'description',
            'author',
            'isbn',
            'price',
            'stock',
            'genreId',
        ])

        // Get the book to update
        const book = await Book.findOrFail(data.id)

        // Validate request data

        const avatarData = request.input('avatar')
        let newAvatarUrl = null
        let oldAvatarPublicId = null

        // Validate the avatar file
        if (avatarData && avatarData.length > 0) {
            try {
                const base64String = avatarData[0].thumbUrl.split(',')[1]
                const buffer = Buffer.from(base64String, 'base64')

                // Handle avatar upload to Cloudinary with a promise
                const uploadToCloudinary = () => {
                    return new Promise((resolve, reject) => {
                        const uploadStream = cloudinary.uploader.upload_stream(
                            { public_id: uuidv4(), folder: 'uploads' },
                            (error, result) => {
                                if (error) {
                                    reject(error)
                                } else {
                                    resolve(result.secure_url)
                                }
                            }
                        )
                        uploadStream.end(buffer)
                    })
                }

                newAvatarUrl = await uploadToCloudinary()

                // Extract the old avatar's public_id if it exists
                if (book.avatar) {
                    const urlParts = book.avatar.split('/')
                    const publicIdWithExtension = urlParts[urlParts.length - 1]
                    oldAvatarPublicId = `uploads/${publicIdWithExtension.split('.')[0]}`
                }
            } catch (error) {
                console.error('Cloudinary upload error:', error)
                return response.status(500).json({ message: 'Image upload failed' })
            }
        }

        // Find or create the author
        let author = await Author.findBy('name', data.author)
        if (!author) {
            author = await Author.create({ name: data.author })
        }

        // Update the book
        book.merge({
            title: data.title,
            description: data.description,
            avatar: newAvatarUrl || book.avatar,
            isbn: data.isbn,
            price: Number(data.price),
            stock: Number(data.stock),
            pubId: user.id,
        })
        await book.save()

        // Update genres
        if (data.genreId && Array.isArray(data.genreId)) {
            const genres = await Genre.query().whereIn('id', data.genreId)
            await book.related('genres').sync(genres.map((genre) => genre.id))
        }

        // Attach book to author
        await book.related('author').associate(author)

        // Delete old avatar from Cloudinary if a new one is uploaded
        if (oldAvatarPublicId) {
            cloudinary.uploader
                .destroy(oldAvatarPublicId)
                .then((result) => {
                    console.log('Deleted old avatar:', result)
                })
                .catch((error) => {
                    console.error('Cloudinary delete error:', error)
                })
        }

        // Return the updated book
        const updatedBook = await Book.query()
            .where('id', book.id)
            .preload('author')
            .preload('genres')
            .first()

        return updatedBook
    }

    // [DELETE] /books/:id - delete a specific book
    async destroy({ request, bouncer, response }: HttpContext) {
        try {
            // check if user's role is admin
            if (await bouncer.with(BookPolicy).denies('delete')) {
                return response.status(403).json({ message: 'Unauthorized' })
            }
            // get id from request
            const id = request.body().id
            // delete book from database
            const book = await Book.findOrFail(id)
            await book.delete()
            response.status(200).json({ message: 'Book deleted successfully' })
        } catch (error) {
            return response.status(500).json({ message: 'Error deleting book' })
        }

        // redirect to index page
        // return response.redirect('/books')
    }
}
