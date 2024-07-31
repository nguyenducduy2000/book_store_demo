import { create } from 'zustand';

interface PaginationState {
    paginationPage: {
        total: number | any;
        perPage: number | any;
        currentPage: number | any;
        lastPage: number | any;
        firstPage: number | any | null;
        firstPageUrl: string | any | null;
        lastPageUrl: string | any | null;
        nextPageUrl: string | any | null;
        previousPageUrl: string | any | null;
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
