import crypto from 'node:crypto'
import Redis from '@adonisjs/redis/services/main'
import { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
import { DateTime } from 'luxon'
export default class OtpService {
    private context: HttpContext

    constructor(context: HttpContext) {
        this.context = context
    }
    static generateOtp() {
        return crypto.randomInt(100000, 999999).toString()
    }

    static async storeOtp(email: string, otp: string, durationInMinutes = 1) {
        const key = `otp:${email}`
        await Redis.set(key, otp, 'EX', durationInMinutes * 60)
    }

    static async verifyOtp(email: string, otp: string) {
        const key = `otp:${email}`
        const storedOtp = await Redis.get(key)

        if (!storedOtp) {
            return { valid: false, message: 'OTP expired or invalid' }
        }

        if (storedOtp !== otp) {
            return { valid: false, message: 'Invalid OTP' }
        }

        await Redis.del(key)
        return { valid: true }
    }

    async verifyOtp({ request, response }: HttpContext) {
        const { email, otp } = request.only(['email', 'otp'])
        const user = await User.findByOrFail('email', email)

        const result = await OtpService.verifyOtp(email, otp)

        if (!result.valid) {
            return response.status(400).send({ error: result.message })
        }

        user.isActive = true

        await user.save()

        return response.send({ message: 'Email verified successfully' })
    }
}
