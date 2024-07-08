import vine from '@vinejs/vine'

export const loginUser = vine.compile(
    vine.object({
        email: vine.string().email().normalizeEmail(),
        password: vine.string(),
    })
)

export const registerUser = vine.compile(
    vine.object({
        username: vine.string(),
        email: vine.string().email().normalizeEmail(),
        password: vine.string(),
    })
)
