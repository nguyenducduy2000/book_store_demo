import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
import { loginUser, registerUser } from '#validators/user'
// import mail from '@adonisjs/mail/services/main'
import { inject } from '@adonisjs/core'
import VerificationService from '#services/verification_service'
import UserPolicy from '#policies/user_policy'
export default class AuthController {
    async index({}: HttpContext) {
        return User.all()
    }

    // [POST] /register
    @inject()
    async register({ request, response }: HttpContext, verification: VerificationService) {
        try {
            const validation = await registerUser.validate(
                request.only(['username', 'email', 'password'])
            )
            // find if user is already exists in database
            const existUser = await User.findBy('email', validation.email)

            if (existUser) {
                return response.status(400).json({ message: 'User already exists' })
            }

            await User.create(validation)

            // Generate verification token
            // const token = VerificationService.generateToken()
            // console.log(token)

            // Store token in Redis
            // await VerificationService.storeToken(user.email, token)

            // Send verification email
            // await mail.send((message) => {
            //     message
            //         .to(user.email)
            //         .from('bookstore@localhost')
            //         .subject('Verify your email address')
            //         .htmlView('emails/verify_email_html', { user, token })
            // })
            return response.ok({ message: 'User registered successfully' })
        } catch (error) {
            return response.status(400).json({ message: error.message })
        }
    }

    // [GET] /auth/verify
    // async verify({ request, response }: HttpContext) {
    //     try {
    //         // get email and token from request
    //         const { email, token } = request.only(['email', 'token'])
    //         console.log(email, token)

    //         const result = await VerificationService.verifyToken(email, token)

    //         // check if token is valid
    //         if (!result.valid) {
    //             return response.status(400).send({ error: result.message })
    //         }

    //         // mark email as verified
    //         const user = await User.findByOrFail('email', email)
    //         user.isActive = true
    //         await user.save()

    //         // send success response
    //         return response.send({ message: 'Email verified successfully' })
    //     } catch (error) {
    //         return response.status(400).json({ message: error.message })
    //     }
    // }

    // [POST] /login
    async login({ request, response, bouncer }: HttpContext) {
        console.log(request.body())

        const validate = await loginUser.validate(request.body())

        const user = await User.verifyCredentials(validate.email, validate.password)

        // check if user is active
        if (await bouncer.with(UserPolicy).allows('isActive')) {
            return response.status(403).json({ message: 'Account is not active yet' })
        }

        // generate access token
        const accessToken = await User.accessTokens.create(user)

        return accessToken
    }
}
