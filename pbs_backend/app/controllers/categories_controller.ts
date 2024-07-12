import Category from '#models/category'
import type { HttpContext } from '@adonisjs/core/http'

export default class CategoriesController {
    async index({}: HttpContext) {
        return Category.all()
    }

    async findByCategory({}: HttpContext) {
        return Category.all()
    }
}
