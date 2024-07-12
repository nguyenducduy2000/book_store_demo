/*
|--------------------------------------------------------------------------
| routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

const AuthController = () => import('#controllers/auth_controller')
import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'
const BooksController = () => import('#controllers/books_controller')
// import User from '#models/user'
const OrdersController = () => import('#controllers/orders_controller')
const GenresController = () => import('#controllers/genres_controller')
const CategoriesController = () => import('#controllers/categories_controller')
const CartsController = () => import('#controllers/carts_controller')
const UsersController = () => import('#controllers/users_controller')
// import Author from '#models/author'

router.get('/', [UsersController, 'index'])
router.post('/register', [AuthController, 'register'])
router.get('/verify-email', [AuthController, 'verify']).as('verifyEmail')
router.post('/login', [AuthController, 'login'])

router
    .group(() => {
        router.get('/books', [BooksController, 'index'])
        router.get('/books/:id', [BooksController, 'show'])
        router
            .group(() => {
                router.post('/books', [BooksController, 'store'])
                router.patch('/books', [BooksController, 'update'])
                router.delete('/books', [BooksController, 'destroy'])
            })
            .use(middleware.auth({ guards: ['api'] }))
        // factory for testing
        router.post('/books/factory', [BooksController, 'factory'])
    })
    .prefix('/api/v1')

router
    .group(() => {
        router.get('/:id', [UsersController, 'show'])
        router.patch('/edit', [UsersController, 'update'])
        router.delete('/delete', [UsersController, 'destroy'])
    })
    .prefix('/user')
    .use(middleware.auth({ guards: ['api'] }))

router
    .group(() => {
        router.get('/', [GenresController, 'index'])
    })
    .prefix('/genre')

router
    .group(() => {
        router.get('/', [CategoriesController, 'index'])
    })
    .prefix('/category')

router
    .group(() => {
        router.get('', [CartsController, 'index'])
        router.post('/create', [CartsController, 'addItem'])
        router.patch('/update', [CartsController, 'update'])
        router.delete('/delete', [CartsController, 'destroy'])
    })
    .prefix('/cart')

router
    .group(() => {
        router.get('/', [OrdersController, 'index'])
        router.get('/update', [OrdersController, 'update'])
    })
    .prefix('/order')
