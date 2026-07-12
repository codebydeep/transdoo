import { NavLink, useNavigate } from "react-router-dom"
import { useAuthStore } from "../stores/authStore"
import { useThemeStore } from "../stores/themeStore"
import { Input } from "./ui/input"
import { ScrollArea } from "./ui/scroll-area"
import {
  LayoutDashboard, Truck, Users, Route, Wrench,
  Fuel, BarChart3, Settings, Search, LogOut, Sun, Moon,
} from "lucide-react"

const navItems = [
  { label: "Dashboard",       to: "/dashboard",   icon: LayoutDashboard },
  { label: "Fleet",           to: "/fleet",        icon: Truck },
  { label: "Drivers",         to: "/drivers",      icon: Users },
  { label: "Trips",           to: "/trips",        icon: Route },
  { label: "Maintenance",     to: "/maintenance",  icon: Wrench },
  { label: "Fuel & Expenses", to: "/fuel",         icon: Fuel },
  { label: "Analytics",       to: "/analytics",    icon: BarChart3 },
  { label: "Settings",        to: "/settings",     icon: Settings },
]

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const { authUser, signout } = useAuthStore()
  const { theme, toggleTheme } = useThemeStore()
  const navigate = useNavigate()

  const handleSignout = async () => {
    await signout()
    navigate("/", { replace: true })
  }

  const initials = authUser?.name
    ? authUser.name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase()
    : "U"

  return (
    <div className="flex h-screen overflow-hidden bg-background text-foreground">
      {/* ── Sidebar ── */}
      <aside className="flex w-48 flex-shrink-0 flex-col border-r border-border bg-card">
        {/* Logo */}
        <div className="flex items-center gap-2.5 px-4 py-4 border-b border-border">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#e07b00]">
            <span className="text-sm font-black text-white">T</span>
          </div>
          <div>
            <span className="text-sm font-black tracking-tight text-foreground">TransDOO</span>
            <p className="text-[9px] text-muted-foreground leading-tight">Fleet Management</p>
          </div>
        </div>

        <ScrollArea className="flex-1 py-2">
          <nav className="flex flex-col gap-0.5 px-2">
            {navItems.map(({ label, to, icon: Icon }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  `flex items-center gap-2.5 rounded-md px-3 py-2 text-sm transition-all duration-150 ${
                    isActive
                      ? "bg-[#e07b00] text-white font-semibold shadow-sm"
                      : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                  }`
                }
              >
                <Icon className="h-4 w-4 flex-shrink-0" />
                {label}
              </NavLink>
            ))}
          </nav>
        </ScrollArea>

        {/* Bottom actions */}
        <div className="space-y-1 border-t border-border px-2 py-3">
          <button
            onClick={toggleTheme}
            className="flex w-full items-center gap-2.5 rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
          >
            {theme === "dark"
              ? <Sun className="h-4 w-4" />
              : <Moon className="h-4 w-4" />
            }
            {theme === "dark" ? "Light mode" : "Dark mode"}
          </button>
          <button
            onClick={handleSignout}
            className="flex w-full items-center gap-2.5 rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
          >
            <LogOut className="h-4 w-4" />
            Sign out
          </button>
        </div>
      </aside>

      {/* ── Main area ── */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Topbar */}
        <header className="flex h-13 flex-shrink-0 items-center justify-between border-b border-border bg-card px-5">
          <div className="relative w-60">
            <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search anything..."
              className="h-8 rounded-lg border-border bg-background pl-8 text-xs placeholder:text-muted-foreground focus-visible:ring-1 focus-visible:ring-[#e07b00]"
            />
          </div>

          <div className="flex items-center gap-3">
            <span className="text-sm text-muted-foreground">{authUser?.name ?? "User"}</span>
            <span className="rounded-full bg-[#e07b00]/15 px-2.5 py-0.5 text-xs font-semibold text-[#e07b00] capitalize">
              {authUser?.role ?? "user"}
            </span>
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#3b7fd4] text-xs font-bold text-white ring-2 ring-[#3b7fd4]/30">
              {initials}
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-auto bg-background p-6">
          {children}
        </main>
      </div>
    </div>
  )
}
