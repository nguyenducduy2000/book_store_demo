import { create } from 'zustand';

interface BookState {
    books: Array<any> | object;
    setBooks: (data: object) => void;
}

const useBookState = create<BookState>((set) => ({
    books: {},
    setBooks: (data) => set({ books: data }),
}));

export default useBookState;
