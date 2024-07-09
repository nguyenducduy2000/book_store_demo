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
import User from '#models/user'
// import Author from '#models/author'

router.get('/', async () => {
    const user = User.all()
    return user
})
router.post('/register', [AuthController, 'register'])
router.get('/verify-email', [AuthController, 'verify']).as('verifyEmail')
router.post('/login', [AuthController, 'login'])

router
    .group(() => {
        router.get('/books', [BooksController, 'index'])
        router.get('/books/:id', [BooksController, 'show'])
        router.post('/books', [BooksController, 'store'])
        router.patch('/books', [BooksController, 'update'])
        router.delete('/books', [BooksController, 'destroy'])
    })
    .prefix('/api/v1')
    .use(middleware.auth({ guards: ['api'] }))
