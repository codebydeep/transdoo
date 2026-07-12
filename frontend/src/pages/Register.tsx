import { useState, type FormEvent } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useAuthStore } from "../stores/authStore"
import { useThemeStore } from "../stores/themeStore"
import { Input } from "../components/ui/input"
import { Button } from "../components/ui/button"
import { Label } from "../components/ui/label"
import { Truck, Sun, Moon } from "lucide-react"

const Register = () => {
  const navigate = useNavigate()
  const register = useAuthStore((s) => s.register)
  const loading  = useAuthStore((s) => s.loading)
  const error    = useAuthStore((s) => s.error)
  const { theme, toggleTheme } = useThemeStore()

  const [name,     setName]     = useState("")
  const [email,    setEmail]    = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const ok = await register(name, email, password)
    if (ok) navigate("/dashboard", { replace: true })
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 relative">
      <button
        onClick={toggleTheme}
        className="absolute top-5 right-5 rounded-lg border border-border bg-card p-2 text-muted-foreground hover:text-foreground transition-colors"
      >
        {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
      </button>

      <div className="w-full max-w-sm">
        <div className="mb-8 flex flex-col items-center text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#e07b00] shadow-lg shadow-[#e07b00]/30 mb-4">
            <Truck className="h-6 w-6 text-white" />
          </div>
          <span className="text-2xl font-black tracking-tight text-foreground">TransDOO</span>
          <h1 className="mt-2 text-xl font-bold text-foreground">Create your account</h1>
          <p className="mt-1 text-sm text-muted-foreground">Start managing your fleet in minutes.</p>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="space-y-1.5">
            <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Full Name</Label>
            <Input
              type="text"
              placeholder="Raven Kumar"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="border-border bg-card focus-visible:ring-[#e07b00] focus-visible:border-[#e07b00]"
            />
          </div>
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

          {error && <p className="text-sm text-destructive">{error}</p>}

          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-[#e07b00] hover:bg-[#c96d00] text-white font-semibold py-5 shadow-lg shadow-[#e07b00]/20"
          >
            {loading ? "Creating account..." : "Create account"}
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link to="/login" className="font-semibold text-[#e07b00] hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Register
