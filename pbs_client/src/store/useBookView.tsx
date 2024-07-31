/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from 'zustand';

interface BookView {
    book: {
        id: number | any;
        title: string | any;
        description: string | any;
        avatar: string | any;
        authorId: number | any;
        genreId: number | any;
        price: number | any;
        stock: number | any;
        pubId: number | any;
        createdAt: string | any | any;
        author: object | any;
        genres: Array[any] | any;
    };
    setBooks: (data: BookView['book']) => void;
}

const useBookView = create<BookView>((set) => ({
    book: {
        id: 0,
        title: '',
        description: '',
        avatar: '',
        authorId: 0,
        genreId: 0,
        price: 0,
        stock: 0,
        pubId: 0,
        createdAt: '',
        author: {},
        genre: {},
    },
    setBooks: (data) => set({ book: data }),
}));

export default useBookView;
