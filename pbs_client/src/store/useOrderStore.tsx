import { create } from 'zustand';

interface OrderState {
    orderItem: Object<any> | Array<any>;
    setOrderItem: (data: object) => void;
}

const useOrderState = create<OrderState>((set) => ({
    orderItem: {},
    setOrderItem: (data) => set({ orderItem: data }),
}));

export default useOrderState;
