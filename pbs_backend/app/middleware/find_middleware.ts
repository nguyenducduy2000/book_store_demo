import UserException from '#exceptions/user_exception'
import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'

export default class FindMiddleware {
    async handle(ctx: HttpContext, next: NextFn) {
        /**
         * Middleware logic goes here (before the next call)
         */
        const { request } = ctx
        const rq = request.qs().id
        if (Number.parseInt(rq) > 10) {
            throw new UserException()
        }
        /**
         * Call next method in the pipeline and return its output
         */
        const output = await next()
        return output
    }
}
