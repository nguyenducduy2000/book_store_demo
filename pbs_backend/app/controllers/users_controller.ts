import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
export default class UsersController {
    /**
     * Display a list of resource
     */
    async index({}: HttpContext) {
        const user = await User.all()
        return user
    }
    /**
     * Display form to create a new record
     */
    async create({}: HttpContext) {}

    /**
     * Handle form submission for the create action
     */
    async store({}: HttpContext) {}

    /**
     * Show individual record
     */
    async show({}: HttpContext) {}

    /**
     * Edit individual record
     */
    async edit({}: HttpContext) {}

    /**
     * Handle form submission for the edit action
     */
    async update({}: HttpContext) {}

    /**
     * Delete record
     */
    async destroy({}: HttpContext) {}
}

/**
 *     async find({ request }: HttpContext) {
        const user = await User.findBy('id', request.qs().id)
        return user
    }

    async paging({ pagination }: HttpContext) {
        const users = await User.query().paginate(pagination.page, pagination.perPage)
        return users.toJSON()
    }

    async show({ response }: HttpContext) {
        return response.status(ResponseStatus.NotFound).json({ message: 'User not found' })
    }

    async validate({ request, response }: HttpContext) {
        const { email, password, username } = await request.validateUsing(createUserValidator)

        return response.ok({ email, password, username })
    }
 */
