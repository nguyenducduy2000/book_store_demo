import { create } from 'zustand';

interface UserState {
    email: string;
    password: string;
    token: string;
    login: () => void;
}

const useUserState = create<UserState>((set) => ({
    email: '',
    password: '',
    token: '',
    login: () => set({ email: '', password: '' }),
}));

export default useUserState;
