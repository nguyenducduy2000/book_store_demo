import { Exception } from '@adonisjs/core/exceptions'
import { HttpContext } from '@adonisjs/core/http'

export default class ClientException extends Exception {
    static status = 404
    static code = 'CLIENT_EXCEPTION'

    async handle(error: this, ctx: HttpContext) {
        return ctx.response.status(error.status).send(ClientException.status)
    }

    async report(error: this, ctx: HttpContext) {
        ctx.logger.error({ err: error }, error.message)
    }
}
