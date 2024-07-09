import crypto from 'node:crypto'
import redis from '@adonisjs/redis/services/main'

export default class VerificationService {
    static generateToken() {
        return crypto.randomBytes(32).toString('hex')
    }

    static async storeToken(email: string, token: string, durationInMinutes = 10) {
        const key = `verify:${email}`
        await redis.set(key, token, 'EX', durationInMinutes * 60)
    }

    static async verifyToken(email: string, token: string) {
        const key = `verify:${email}`
        const storedToken = await redis.get(key)

        if (!storedToken || storedToken !== token) {
            return { valid: false, message: 'Invalid or expired token' }
        }

        await redis.del(key)
        return { valid: true }
    }
}
