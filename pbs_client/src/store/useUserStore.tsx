/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from 'zustand';

interface UserStore {
    user: {
        id: number;
        username: string | any;
        email: string | any;
        dateOfBirth: string | any;
        phoneNumber: string | any;
        address: string | any;
        gender: string | any;
        avatar: string | any;
    };
    setUser: (data: UserStore['user']) => void;
}

const useUserStore = create<UserStore>((set) => ({
    user: {
        id: 0,
        username: '',
        email: '',
        dateOfBirth: '',
        phoneNumber: '',
        address: '',
        gender: '',
        avatar: '',
    },
    setUser: (data) => set({ user: data }),
}));

export default useUserStore;
