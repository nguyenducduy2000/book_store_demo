import { create } from 'zustand';

interface Genre {
    id: number | any;
    name: string | any;
}

interface GenreView {
    genres: Genre[];
    setGenres: (data: Genre[]) => void;
}

const useGenreView = create<GenreView>((set) => ({
    genres: [],
    setGenres: (data) => set({ genres: data }),
}));

export default useGenreView;
