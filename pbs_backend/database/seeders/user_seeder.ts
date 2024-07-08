import { BaseSeeder } from '@adonisjs/lucid/seeders'
import User from '#models/user'

export default class extends BaseSeeder {
    async run() {
        // Write your database queries inside the run method
        await User.createMany([
            {
                username: 'admin',
                email: 'admin@gmail.com',
                password: 'admin',
                isAdmin: true,
            },
            {
                username: 'abc',
                email: 'abc@gmail.com',
                password: 'abc',
            },
        ])
    }
}
