import { create } from 'zustand';

interface OrderState {
    orderItem: Object<any> | Array<any> | any;
    setOrderItem: (data: object | any) => void;
}

const useOrderState = create<OrderState>((set) => ({
    orderItem: {},
    setOrderItem: (data) => set({ orderItem: data }),
}));

export default useOrderState;
