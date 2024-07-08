import { Exception } from '@adonisjs/core/exceptions'
import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'

export default class MyAuthMiddleware {
    async handle(ctx: HttpContext, next: NextFn) {
        /**
         * Middleware logic goes here (before the next call)
         */
        const { request } = ctx
        console.log(request.params())
        if (request.params()) {
            if (request.params().password !== '123') {
                throw new Exception('Invalid password')
            } else {
                const output = await next()
                return output
            }
        }
    }
}
