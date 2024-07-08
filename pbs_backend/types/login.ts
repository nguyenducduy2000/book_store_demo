interface Login {
    email: string
    password: string
}

declare module '@adonisjs/core/http' {
    interface HttpContext {
        login: Login
    }
}
