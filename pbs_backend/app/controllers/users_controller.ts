import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
export default class UsersController {
    /**
     * Show individual record
     */
    // [GET] /
    async index({ auth }: HttpContext) {
        // get user
        const user = await auth.authenticate()
        return user
    }

    // [GET] /user/:id
    async show({ auth }: HttpContext) {
        // get user_id
        const userParam = await auth.authenticate()

        // const id = Number(request.param('id'))
        // find user by id
        const user = await User.findOrFail(userParam.id)

        return user
    }

    /**
     * Handle form submission for the edit action
     */
    // [POST] /user/edit
    async update({ request, auth }: HttpContext) {
        // get user id
        const currentUser = await auth.authenticate()

        const user = await User.findOrFail(currentUser.id)
        user.username = request.input('username') || currentUser.username
        user.password = request.input('password') || currentUser.password
        user.dateOfBirth = request.input('dateOfBirth') || currentUser.dateOfBirth

        await user.save()
        return user
    }

    /**
     * Delete record
     */
    // [DELETE] /user/delete
    async destroy({ auth }: HttpContext) {
        // get user
        const user = await auth.authenticate()

        // delete user
        await user.delete()

        // Return a success message
        return { message: 'User deleted successfully' }
    }
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
