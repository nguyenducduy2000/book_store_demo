import { create } from 'zustand';

interface BookState {
    newBooks: Array<any> | object;
    setNewBooks: (data: object) => void;
}

const useNewBook = create<BookState>((set) => ({
    newBooks: {},
    setNewBooks: (data) => set({ newBooks: data }),
}));

export default useNewBook;
