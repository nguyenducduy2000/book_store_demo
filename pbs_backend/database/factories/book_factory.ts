import factory from '@adonisjs/lucid/factories'
import Book from '#models/book'
import Author from '#models/author'
import Genre from '#models/genre'
import Category from '#models/category'
import Order from '#models/order'

export const AuthorFactory = factory
    .define(Author, async ({ faker }) => {
        return {
            name: faker.person.fullName(),
            bio: faker.person.bio(),
        }
    })
    .build()

export const GenreFactory = factory
    .define(Genre, async ({ faker }) => {
        return {
            name: faker.word.adjective(),
        }
    })
    .build()

const CategoryFactory = factory.define(Category, async ({ faker }) => {
    return {
        name: faker.word.adjective(),
    }
})

export const BookFactory = factory
    .define(Book, async ({ faker }) => {
        return {
            title: faker.commerce.productName(),
            description: faker.commerce.productDescription(),
            price: 100000,
            stock: faker.number.int({ min: 1, max: 10 }),
            author_id: 1,
            genre_id: 1,
            isbn: 1000,
        }
    })
    .build()

export const OrderFactory = factory
    .define(Order, async () => {
        return {
            user_id: 1,
            order_date: new Date(),
            payment_method: 'cash',
            totalAmmount: 0,
            totalPrice: 0,
        }
    })
    .build()
