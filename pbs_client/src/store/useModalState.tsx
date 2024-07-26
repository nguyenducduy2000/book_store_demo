import { create } from 'zustand';

interface ModalState {
    show: boolean;
    status: 'create' | 'update';
    toggleShow: () => void;
    setClose: () => void;
    setStatus: (data: 'create' | 'update') => void;
}

const useModalState = create<ModalState>((set) => ({
    show: false,
    status: 'create',
    toggleShow: () => set((state) => ({ show: !state.show })),
    setClose: () => set({ show: false }),
    setStatus: (data) => set({ status: data }),
}));

export default useModalState;
