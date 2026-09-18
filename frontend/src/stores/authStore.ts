import { create } from "zustand";

type AuthUser = {
  name: string;
  email: string;
};

type AuthState = {
  authUser: AuthUser | null;
  loading: boolean;
  error: string | null;
  initializeAuth: () => Promise<void>;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  signout: () => Promise<boolean>;
};

const storageKey = "transdoo-auth-user";

function saveUser(user: AuthUser | null) {
  if (user) localStorage.setItem(storageKey, JSON.stringify(user));
  else localStorage.removeItem(storageKey);
}

export const useAuthStore = create<AuthState>((set) => ({
  authUser: null,
  loading: true,
  error: null,

  initializeAuth: async () => {
    try {
      const storedUser = localStorage.getItem(storageKey);
      set({ authUser: storedUser ? (JSON.parse(storedUser) as AuthUser) : null, error: null });
    } catch {
      localStorage.removeItem(storageKey);
      set({ authUser: null, error: null });
    } finally {
      set({ loading: false });
    }
  },

  login: async (email, password) => {
    if (!email || !password) {
      set({ error: "Email and password are required." });
      return false;
    }
    const user = { name: email.split("@")[0], email };
    saveUser(user);
    set({ authUser: user, error: null });
    return true;
  },

  register: async (name, email, password) => {
    if (!name || !email || !password) {
      set({ error: "Name, email, and password are required." });
      return false;
    }
    const user = { name, email };
    saveUser(user);
    set({ authUser: user, error: null });
    return true;
  },

  signout: async () => {
    saveUser(null);
    set({ authUser: null, error: null });
    return true;
  },
}));
