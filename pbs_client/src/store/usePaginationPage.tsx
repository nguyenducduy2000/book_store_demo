import { create } from 'zustand';

interface PaginationState {
    paginationPage: {
        total: number;
        perPage: number;
        currentPage: number;
        lastPage: number;
        firstPage: number | null;
        firstPageUrl: string | null;
        lastPageUrl: string | null;
        nextPageUrl: string | null;
        previousPageUrl: string | null;
    };
    setPaginationPage: (data: PaginationState['paginationPage']) => void;
    setCurrentPage: (page: number) => void;
}

const usePaginationPage = create<PaginationState>((set) => ({
    paginationPage: {
        total: 0,
        perPage: 0,
        currentPage: 1,
        lastPage: 0,
        firstPage: null,
        firstPageUrl: null,
        lastPageUrl: null,
        nextPageUrl: null,
        previousPageUrl: null,
    },
    setPaginationPage: (data) => set({ paginationPage: data }),
    setCurrentPage: (page) =>
        set((state) => ({
            paginationPage: {
                ...state.paginationPage,
                currentPage: page,
            },
        })),
}));

export default usePaginationPage;
