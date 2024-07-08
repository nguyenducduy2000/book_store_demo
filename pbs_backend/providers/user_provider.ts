import type { ApplicationService } from '@adonisjs/core/types'

export default class UserProvider {
    constructor(protected app: ApplicationService) {}

    /**
     * Register bindings to the container
     */
    register() {}
}
