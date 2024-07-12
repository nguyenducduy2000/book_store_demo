import Genre from '#models/genre'
import type { HttpContext } from '@adonisjs/core/http'
export default class GenresController {
    async index({}: HttpContext) {
        return await Genre.all()
    }

    async store({}: HttpContext) {}
}
