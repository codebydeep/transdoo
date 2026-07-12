import { useState, type FormEvent } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useAuthStore } from "../stores/authStore"
import { useThemeStore } from "../stores/themeStore"
import { Input } from "../components/ui/input"
import { Button } from "../components/ui/button"
import { Checkbox } from "../components/ui/checkbox"
import { Label } from "../components/ui/label"
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "../components/ui/select"
import { AlertCircle, Sun, Moon, Truck } from "lucide-react"

const ROLES = [
  { value: "fleet_manager",     label: "Fleet Manager" },
  { value: "dispatcher",        label: "Dispatcher" },
  { value: "safety_officer",    label: "Safety Officer" },
  { value: "financial_analyst", label: "Financial Analyst" },
]

const ROLE_PERMS: Record<string, string> = {
  fleet_manager:     "Fleet, Maintenance, Analytics",
  dispatcher:        "Dashboard, Trips",
  safety_officer:    "Drivers, Compliance",
  financial_analyst: "Fuel & Expenses, Analytics",
}

const Login = () => {
  const navigate = useNavigate()
  const login    = useAuthStore((s) => s.login)
  const loading  = useAuthStore((s) => s.loading)
  const error    = useAuthStore((s) => s.error)
  const { theme, toggleTheme } = useThemeStore()

  const [email,    setEmail]    = useState("")
  const [password, setPassword] = useState("")
  const [role, setRole] = useState("dispatcher")

  const handleRoleChange = (val: string | null) => setRole(val ?? "dispatcher")
  const [remember, setRemember] = useState(false)

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const ok = await login(email, password)
    if (ok) navigate("/dashboard", { replace: true })
  }

  return (
    <div className="flex min-h-screen bg-background text-foreground">
      {/* ── Left brand panel ── */}
      <div className="hidden lg:flex w-[380px] flex-shrink-0 flex-col justify-between border-r border-border bg-card px-10 py-10">
        <div>
          {/* Logo */}
          <div className="flex items-center gap-3 mb-12">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#e07b00] shadow-lg shadow-[#e07b00]/30">
              <Truck className="h-5 w-5 text-white" />
            </div>
            <div>
              <p className="text-xl font-black tracking-tight text-foreground">TransDOO</p>
              <p className="text-xs text-muted-foreground">Smart Transport Operations</p>
            </div>
          </div>

          {/* Roles */}
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            One login, four roles
          </p>
          <div className="space-y-2 mb-8">
            {ROLES.map((r) => (
              <div
                key={r.value}
                className={`flex items-center gap-3 rounded-lg border px-3 py-2.5 transition-colors cursor-pointer ${
                  role === r.value
                    ? "border-[#e07b00]/50 bg-[#e07b00]/10"
                    : "border-border bg-background hover:border-border"
                }`}
                onClick={() => setRole(r.value)}
              >
                <span className={`h-2 w-2 rounded-full flex-shrink-0 ${role === r.value ? "bg-[#e07b00]" : "bg-muted-foreground/30"}`} />
                <div>
                  <p className={`text-sm font-medium ${role === r.value ? "text-[#e07b00]" : "text-foreground"}`}>{r.label}</p>
                  <p className="text-[10px] text-muted-foreground">{ROLE_PERMS[r.value]}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <div className="rounded-lg border border-border bg-background p-3">
            <p className="text-[11px] text-muted-foreground">
              Access is scoped by role after login. Expired licenses and suspended drivers are automatically blocked from trip assignment.
            </p>
          </div>
          <p className="text-xs text-muted-foreground">TransDOO © 2026 · RBAC v2.0</p>
        </div>
      </div>

      {/* ── Right form panel ── */}
      <div className="flex flex-1 items-center justify-center px-6 relative">
        {/* Theme toggle */}
        <button
          onClick={toggleTheme}
          className="absolute top-5 right-5 rounded-lg border border-border bg-card p-2 text-muted-foreground hover:text-foreground transition-colors"
        >
          {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </button>

        <div className="w-full max-w-sm">
          {/* Mobile logo */}
          <div className="mb-8 flex items-center gap-2 lg:hidden">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#e07b00]">
              <Truck className="h-4 w-4 text-white" />
            </div>
            <span className="text-lg font-black text-foreground">TransDOO</span>
          </div>

          <div className="mb-8">
            <h1 className="text-2xl font-bold text-foreground">Sign in to your account</h1>
            <p className="mt-1.5 text-sm text-muted-foreground">Enter your credentials to continue</p>
          </div>

          {error && (
            <div className="mb-5 flex items-start gap-2.5 rounded-lg border border-destructive/30 bg-destructive/10 p-3.5">
              <AlertCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-destructive" />
              <div>
                <p className="text-sm font-semibold text-destructive">Invalid credentials</p>
                <p className="text-xs text-destructive/80 mt-0.5">{error}</p>
              </div>
            </div>
          )}

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="space-y-1.5">
              <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Email</Label>
              <Input
                type="email"
                placeholder="you@transdoo.in"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="border-border bg-card focus-visible:ring-[#e07b00] focus-visible:border-[#e07b00]"
              />
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Password</Label>
              <Input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="border-border bg-card focus-visible:ring-[#e07b00] focus-visible:border-[#e07b00]"
              />
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Role</Label>
              <Select value={role} onValueChange={handleRoleChange}>
                <SelectTrigger className="border-border bg-card focus:ring-[#e07b00]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="border-border bg-popover">
                  {ROLES.map((r) => (
                    <SelectItem key={r.value} value={r.value}>{r.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center justify-between pt-1">
              <div className="flex items-center gap-2">
                <Checkbox
                  id="remember"
                  checked={remember}
                  onCheckedChange={(v) => setRemember(!!v)}
                  className="data-[state=checked]:bg-[#e07b00] data-[state=checked]:border-[#e07b00]"
                />
                <Label htmlFor="remember" className="text-sm cursor-pointer text-foreground">Remember me</Label>
              </div>
              <button type="button" className="text-sm text-[#e07b00] hover:underline font-medium">
                Forgot password?
              </button>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-[#e07b00] hover:bg-[#c96d00] text-white font-semibold py-5 text-sm shadow-lg shadow-[#e07b00]/20"
            >
              {loading ? "Signing in..." : "Sign In"}
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            New to TransDOO?{" "}
            <Link to="/register" className="font-semibold text-[#e07b00] hover:underline">
              Create account
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login
