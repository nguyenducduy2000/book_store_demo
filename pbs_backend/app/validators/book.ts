import vine from '@vinejs/vine'

export const createBook = vine.compile(
    vine.object({
        title: vine.string(),
        description: vine.string().optional(),
        author_id: vine.number(),
        genre_id: vine.number().optional(),
        isbn: vine.number(),
        price: vine.number(),
        stock: vine.number(),
        publication_date: vine.date(),
        publisher_id: vine.number(),
    })
)

export const updateBook = vine.compile(
    vine.object({
        title: vine.string(),
        description: vine.string(),
        author_id: vine.number(),
        genre_id: vine.number(),
        isbn: vine.number(),
        price: vine.number(),
        stock: vine.number(),
        publication_date: vine.date(),
        publisher_id: vine.number(),
        avatar: vine.file({
            size: '2mb',
            extnames: ['jpg', 'png', 'pdf'],
        }),
    })
)

export const imageValidator = vine.compile(
    vine.file({
        size: '2mb',
        extnames: ['jpg', 'png', 'pdf', 'jpeg'],
    })
)
