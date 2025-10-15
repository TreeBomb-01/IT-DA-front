import create from 'zustand'

type User = {
  id: string
  name: string
  email?: string
} | null

type AuthState = {
  user: User
  setUser: (u: User) => void
  logout: () => void
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  setUser: (u) => set({user: u}),
  logout: () => set({user: null})
}))
