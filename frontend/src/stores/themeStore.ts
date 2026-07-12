import { create } from "zustand"
import { persist } from "zustand/middleware"

type Theme = "dark" | "light"

type ThemeStore = {
  theme: Theme
  toggleTheme: () => void
  setTheme: (t: Theme) => void
}

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set, get) => ({
      theme: "dark",
      toggleTheme: () => {
        const next = get().theme === "dark" ? "light" : "dark"
        set({ theme: next })
        document.documentElement.classList.toggle("dark", next === "dark")
      },
      setTheme: (t) => {
        set({ theme: t })
        document.documentElement.classList.toggle("dark", t === "dark")
      },
    }),
    { name: "transdoo-theme" }
  )
)

/** Call once on app mount to sync DOM with persisted preference */
export function applyStoredTheme() {
  const raw = localStorage.getItem("transdoo-theme")
  try {
    const parsed = raw ? JSON.parse(raw) : null
    const theme: Theme = parsed?.state?.theme ?? "dark"
    document.documentElement.classList.toggle("dark", theme === "dark")
  } catch {
    document.documentElement.classList.add("dark")
  }
}
