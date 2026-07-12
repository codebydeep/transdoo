import axios from "axios"
import { create } from "zustand"

const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL ?? "http://localhost:8000"}/api/auth`,
  withCredentials: true,
})

type AuthUser = {
  id:    string
  name:  string
  email: string
  role:  string
} | null

type AuthStore = {
  authUser: AuthUser
  loading:  boolean
  error:    string | null
  initializeAuth: () => Promise<void>
  login:    (email: string, password: string) => Promise<boolean>
  register: (name: string, email: string, password: string) => Promise<boolean>
  signout:  () => Promise<boolean>
}

export const useAuthStore = create<AuthStore>((set) => ({
  authUser: null,
  loading:  false,
  error:    null,

  // Called once on app mount — restores session from cookie
  initializeAuth: async () => {
    try {
      const { data } = await api.get("/me")
      set({ authUser: data.user ?? null, error: null })
    } catch {
      set({ authUser: null })
    }
  },

  login: async (email, password) => {
    set({ loading: true, error: null })
    try {
      const { data } = await api.post("/login", { email, password })
      set({ authUser: data.user, loading: false, error: null })
      return true
    } catch (err) {
      const message =
        axios.isAxiosError(err) && typeof err.response?.data?.message === "string"
          ? err.response.data.message
          : "Unable to sign in"
      set({ loading: false, error: message })
      return false
    }
  },

  register: async (name, email, password) => {
    set({ loading: true, error: null })
    try {
      const { data } = await api.post("/register", { name, email, password })
      set({ authUser: data.user, loading: false, error: null })
      return true
    } catch (err) {
      const message =
        axios.isAxiosError(err) && typeof err.response?.data?.message === "string"
          ? err.response.data.message
          : "Unable to create account"
      set({ loading: false, error: message })
      return false
    }
  },

  signout: async () => {
    set({ loading: true })
    try {
      await api.post("/logout")
    } finally {
      set({ authUser: null, loading: false, error: null })
    }
    return true
  },
}))
