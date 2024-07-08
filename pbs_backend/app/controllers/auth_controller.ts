import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
import { loginUser, registerUser } from '#validators/user'
export default class AuthController {
    async register({ request }: HttpContext) {
        const validation = await registerUser.validate(
            request.only(['username', 'email', 'password'])
        )
        const user = await User.create(validation)

        return User.accessTokens.create(user)
    }

    async login({ request }: HttpContext) {
        await loginUser.validate(request.only(['email', 'password']))

        const email = request.only(['email'])

        const user = await User.findByOrFail(email)

        const accessToken = await User.accessTokens.create(user)

        return accessToken
        // return 'logged in successfully'

        // const { email, password } = request.only(['email', 'password'])
        // const user = await User.query().where('email', email).firstOrFail()
        // if (!(await Hash.verify(user.password, password))) {
        //     return response.unauthorized('Invalid credentials')
        // }
        // const token = await auth.use('api').login(user)
        // return token.toJSON()
    }
}
