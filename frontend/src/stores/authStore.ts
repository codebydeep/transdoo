import axios from "axios"
import { create } from "zustand"

const authApi = axios.create({
  baseURL: "http://localhost:8000/api/auth",
  withCredentials: true,
})

type AuthUser = {
  id?: string
  email?: string
  name?: string
  image?: string | null
} | null

type AuthApiResponse = {
  user?: AuthUser
  data?: {
    user?: AuthUser
  }
}

type AuthStore = {
  authUser: AuthUser
  loading: boolean
  error: string | null
  initializeAuth: () => Promise<void>
  login: (email: string, password: string) => Promise<boolean>
  register: (name: string, email: string, password: string) => Promise<boolean>
  signout: () => Promise<boolean>
}

const getUser = (response: AuthApiResponse) => response.user ?? response.data?.user ?? null

const fetchSessionUser = async () => {
  const response = await axios.get("http://localhost:8000/api/me", {
    withCredentials: true,
  })

  return getUser(response.data)
}

export const useAuthStore = create<AuthStore>((set) => ({
  authUser: null,
  loading: false,
  error: null,
  initializeAuth: async () => {
    try {
      const authUser = await fetchSessionUser()

      set({ authUser, error: null })
    } catch {
      set({ authUser: null })
    }
  },
  login: async (email, password) => {
    set({ loading: true, error: null })

    try {
      const response = await authApi.post("/sign-in/email", {
        email,
        password,
      })

      const authUser = await fetchSessionUser()

      set({ authUser, loading: false, error: null })
      return true
    } catch (error) {
      const message =
        axios.isAxiosError(error) && typeof error.response?.data?.message === "string"
          ? error.response.data.message
          : "Unable to sign in"

      set({ loading: false, error: message })
      return false
    }
  },
  register: async (name, email, password) => {
    set({ loading: true, error: null })

    try {
      const response = await authApi.post("/sign-up/email", {
        name,
        email,
        password,
      })

      const authUser = await fetchSessionUser()

      set({ authUser, loading: false, error: null })
      return true
    } catch (error) {
      const message =
        axios.isAxiosError(error) && typeof error.response?.data?.message === "string"
          ? error.response.data.message
          : "Unable to create account"

      set({ loading: false, error: message })
      return false
    }
  },
  signout: async () => {
    set({ loading: true, error: null })

    try {
      await authApi.post("/sign-out")
    } finally {
      set({ authUser: null, loading: false, error: null })
    }

    return true
  },
}))