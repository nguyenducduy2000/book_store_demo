import Book from '#models/book'
import { imageValidator } from '#validators/book'
import { HttpContext } from '@adonisjs/core/http'
import app from '@adonisjs/core/services/app'

export default class BookService {
    // private context: HttpContext

    // constructor(context: HttpContext) {
    //     this.context = context
    // }

    async getBooks() {
        return Book.all()
    }

    async getBook(id: number) {
        return Book.find(id)
    }

    async imageUpload() {}
}
