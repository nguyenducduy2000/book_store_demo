import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
import { loginUser, registerUser } from '#validators/user'
import mail from '@adonisjs/mail/services/main'
import { inject } from '@adonisjs/core'
import VerificationService from '#services/verification_service'
import UserPolicy from '#policies/user_policy'
export default class AuthController {
    // [POST] /register
    @inject()
    async register({ request }: HttpContext, verification: VerificationService) {
        const validation = await registerUser.validate(
            request.only(['username', 'email', 'password'])
        )
        const user = await User.create(validation)

        // Generate verification token
        const token = VerificationService.generateToken()

        // Store token in Redis
        await VerificationService.storeToken(user.email, token)

        // Send verification email
        await mail.send((message) => {
            message
                .to(user.email)
                .from('bookstore@localhost')
                .subject('Verify your email address')
                .htmlView('emails/verify_email_html', { user, token })
        })

        return user
    }

    // [GET] /auth/verify
    async verify({ request, response }: HttpContext) {
        // get email and token from request
        const { email, token } = request.only(['email', 'token'])
        console.log(email, token)

        const result = await VerificationService.verifyToken(email, token)

        // check if token is valid
        if (!result.valid) {
            return response.status(400).send({ error: result.message })
        }

        // mark email as verified
        const user = await User.findByOrFail('email', email)
        user.isActive = true
        await user.save()

        // send success response
        return response.send({ message: 'Email verified successfully' })
    }

    async login({ request, response, bouncer }: HttpContext) {
        const { email, password } = request.only(['email', 'password'])
        console.log({ email, password })
        await loginUser.validate({ email, password })

        // const email = request.only(['email'])

        const user = await User.findByOrFail('email', email)

        // check if user is active
        if (await bouncer.with(UserPolicy).allows('isActive')) {
            return response.status(403).json({ message: 'Account is not active yet' })
        }

        // generate access token
        const accessToken = await User.accessTokens.create(user)

        // redirect to home page
        // return response.redirect('/')

        return accessToken
    }
}
