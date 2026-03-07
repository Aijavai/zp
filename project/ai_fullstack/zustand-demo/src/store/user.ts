import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User } from '../types/index';
interface UserState {
    isLoggin: boolean;
    login: (user: User) => void;
    logout: () => void;
    user: User | null;
}

export const useUserStore = create<UserState>()(
    persist((set, get) => ({
        isLoggin: false,
        login: (user) => set({ isLoggin: true, user }),
        logout: () => set({ isLoggin: false, user: null }), 
        user: null,
    }),
    {
        name: 'users'
    }
)
)
