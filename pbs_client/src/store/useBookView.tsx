/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from 'zustand';

interface BookView {
    book: {
        id: number;
        title: string;
        description: string;
        avatar: string;
        authorId: number;
        genreId: number;
        price: number;
        stock: number;
        pubId: number;
        createdAt: string | any;
        author: object | any;
        genres: Array[any] | any;
    };
    setBooks: (data: object) => void;
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
