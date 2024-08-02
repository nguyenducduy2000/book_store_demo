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
// const pagination = () => import('#middleware/pagination_middleware')

router.get('/', [BooksController, 'index'])
router.post('/register', [AuthController, 'register'])
// router.get('/verify-email', [AuthController, 'verify']).as('verifyEmail')
router.post('/login', [AuthController, 'login'])
router.get('/test', [AuthController, 'index'])

router
    .group(() => {
        router.get('/', [BooksController, 'index'])
        router.get('/latest', [BooksController, 'getLastestBooks']).use(middleware.pagination())
        router.get('/:id', [BooksController, 'show'])
        router
            .group(() => {
                router.post('/create', [BooksController, 'store'])
                router.put('/edit', [BooksController, 'update'])
                router.delete('/delete', [BooksController, 'destroy'])
            })
            .use(middleware.auth({ guards: ['api'] }))
        // factory for testing
        router.post('/factory', [BooksController, 'factory'])
    })
    .prefix('/books')

router
    .group(() => {
        router.get('/', [UsersController, 'index'])
        router.get('/:id', [UsersController, 'show'])
        router.put('/edit', [UsersController, 'update'])
        router.delete('/delete', [UsersController, 'destroy'])
    })
    .prefix('/user')
    .use(middleware.auth({ guards: ['api'] }))

router
    .group(() => {
        router.get('/', [GenresController, 'index'])
        router.get('/:genreId', [GenresController, 'display']).use(middleware.pagination())
        router.post('/create', [GenresController, 'store'])
        router.delete('/delete', [GenresController, 'destroy'])
    })
    .prefix('/genres')

router
    .group(() => {
        router.get('/', [CategoriesController, 'index'])
    })
    .prefix('/category')

router
    .group(() => {
        router.get('', [CartsController, 'index'])
        router.post('/create', [CartsController, 'addItem'])
        router.put('/update', [CartsController, 'update'])
        router.delete('/delete', [CartsController, 'destroy'])
    })
    .prefix('/cart')

router
    .group(() => {
        router.put('/checkout', [OrdersController, 'checkout'])
        router.put('/complete', [OrdersController, 'updateCheckout'])
        router.post('/create', [OrdersController, 'createInstantOrder'])
        router.delete('/cancel/:id', [OrdersController, 'cancelInstanceOrder'])
        router.get('/', [OrdersController, 'index'])
    })
    .prefix('/order')
