import User from '#models/user'
import Book from '#models/book'
import { BasePolicy } from '@adonisjs/bouncer'
import { AuthorizerResponse } from '@adonisjs/bouncer/types'

export default class BookPolicy extends BasePolicy {
    /**
     * Only logged-in admin user can create a book
     */
    create(user: User): AuthorizerResponse {
        return user.isAdmin
    }

    /**
     * Only the book creator can edit the book
     */
    edit(user: User, book: Book): AuthorizerResponse {
        return user.id === book.pub_id
    }

    /**
     * Only the book creator can delete the book
     */
    delete(user: User, book: Book): AuthorizerResponse {
        return user.id === book.pub_id
    }
}
