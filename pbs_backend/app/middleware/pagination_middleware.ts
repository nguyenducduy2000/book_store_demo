import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'
// import UserService from '#services/user_service'

export default class PaginationMiddleware {
    async handle(ctx: HttpContext, next: NextFn) {
        /**
         * Middleware logic goes here (before the next call)
         */
        const { request } = ctx

        ctx.pagination = {
            perPage: request.input('perPage', 10),
            page: request.input('page', 1),
        }
        console.log(ctx.pagination)

        /**
         * Call next method in the pipeline and return its output
         */
        const output = await next()
        return output
    }
}
