import Genre from '#models/genre'
import { BaseSeeder } from '@adonisjs/lucid/seeders'
export default class extends BaseSeeder {
    async run() {
        Genre.createMany([
            {
                name: 'Fiction',
            },
            {
                name: 'Non-fiction',
            },
            {
                name: 'Fantasy',
            },
            {
                name: 'Science Fiction',
            },
            {
                name: 'Horror',
            },
            {
                name: 'Mystery',
            },
            {
                name: 'Romance',
            },
            {
                name: 'Thriller',
            },
            {
                name: 'Comedy',
            },
        ])
    }
}
