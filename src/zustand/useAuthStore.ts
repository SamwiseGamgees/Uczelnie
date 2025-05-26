import { create } from 'zustand';

interface AuthStore {
  username: string | null;
  avatarUrl: string | null; 
  setUsername: (username: string) => void;
  setAvatarUrl: (url: string) => void;
  clearUserData: () => void;
  clearUsername: () => void; // <-- deklarujesz w interfejsie
}

export const useAuthStore = create<AuthStore>((set) => ({
  username: null,
  avatarUrl: null,
  setUsername: (username) => set({ username }),
  setAvatarUrl: (url) => set({ avatarUrl: url }),
  clearUserData: () => set({ username: null, avatarUrl: null }),
  clearUsername: () => set({ username: null }),  // <-- implementujesz funkcję tutaj
}));