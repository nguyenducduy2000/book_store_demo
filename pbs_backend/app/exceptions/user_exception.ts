import { Exception } from '@adonisjs/core/exceptions'
import { HttpContext } from '@adonisjs/core/http'

export default class UserException extends Exception {
    static status = 400
    static code = 'USER_EXCEPTION'

    async handle(error: this, ctx: HttpContext) {
        return ctx.response.status(error.status).send(UserException.status)
    }
}
