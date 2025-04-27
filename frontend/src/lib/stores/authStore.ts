import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface User {
  username: string;
}

export interface AuthState {
  user: User | null;
  setUser: (user: User | null) => void;
  isAuthenticated: boolean;
}

type SetState = (state: Partial<AuthState>) => void

export const useAuthStore = create<AuthState>()(
  persist(
    (set: SetState) => ({
      user: null,
      isAuthenticated: false,
      setUser: (user: User | null) => set({ user, isAuthenticated: !!user }),
    }),
    {
      name: "auth-storage",
    },
  ),
);