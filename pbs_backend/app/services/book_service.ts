import Book from '#models/book'
import { Exception } from '@adonisjs/core/exceptions'
// import { imageValidator } from '#validators/book'
// import { HttpContext } from '@adonisjs/core/http'
// import app from '@adonisjs/core/services/app'

export default class BookService {
    // private context: HttpContext

    // constructor(context: HttpContext) {
    //     this.context = context
    // }

    async GetBooks() {
        return Book.all()
    }

    async GetBook(id: number) {
        return Book.find(id)
    }

    async UpdateBook(data: any) {
        console.log(data.id)
        // get book from database
        const book = await Book.find(data.id)
        if (!book) {
            throw new Exception('Book not found', { status: 404 })
        }
        // update book with new data
        book.title = data.title || book?.title
        book.description = data.description || book?.description
        book.price = data.price || book?.price
        book.stock = data.stock || book?.stock
        book.author_id = data.author_id || book?.author_id
        book.genre_id = data.genre_id || book?.genre_id
        book.isbn = data.isbn || book?.isbn
        book.avatar = data.avatar || book?.avatar

        // save book in database
        await book.save()
    }

    async imageUpload() {}
}
