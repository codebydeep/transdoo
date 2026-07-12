import { useRef } from "react"
import { Link } from "react-router-dom"
import { useThemeStore } from "../stores/themeStore"
import { Sun, Moon, Truck, BarChart3, Users, Route } from "lucide-react"
import Footer from "../components/Footer"

const features = [
  {
    icon: Truck,
    label: "Fleet",
    title: "Track every vehicle in real-time.",
    desc: "Live status, odometer, fuel, and maintenance — all in one place.",
  },
  {
    icon: Users,
    label: "Drivers",
    title: "Manage drivers and safety profiles.",
    desc: "RBAC roles, license expiry alerts, and trip assignment in seconds.",
  },
  {
    icon: BarChart3,
    label: "Analytics",
    title: "Data-driven operations.",
    desc: "ROI, fuel efficiency, and cost breakdowns updated automatically.",
  },
  {
    icon: Route,
    label: "Trips",
    title: "Dispatch trips with one click.",
    desc: "Capacity validation, live board, and auto expense logging on completion.",
  },
]

const Landing = () => {
  const { theme, toggleTheme } = useThemeStore()
  const footerRef = useRef<HTMLElement | null>(null)

  const scrollToFooter = (e: React.MouseEvent) => {
    e.preventDefault()
    footerRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navbar — fixed, transparent, floats above content */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 sm:px-10
        bg-background/60 backdrop-blur-md border-b border-white/10 dark:border-white/5">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#e07b00]">
            <Truck className="h-4 w-4 text-white" />
          </div>
          <span className="text-lg font-black tracking-tight text-foreground">TransDOO</span>
        </div>

        <div className="flex items-center gap-4">
          {/* About scrolls to footer */}
          <button
            onClick={scrollToFooter}
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            About
          </button>

          <button
            onClick={toggleTheme}
            className="rounded-lg border border-border bg-background/50 p-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
          <Link
            to="/login"
            className="rounded-lg border border-border bg-background/50 px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Sign in
          </Link>
          <Link
            to="/register"
            className="rounded-lg bg-[#e07b00] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#c96d00] shadow-md shadow-[#e07b00]/20"
          >
            Get started
          </Link>
        </div>
      </nav>

      {/* Hero — pt accounts for fixed navbar height */}
      <div className="mx-auto flex max-w-5xl flex-col items-center px-4 pb-16 pt-36 text-center sm:px-6">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#e07b00]/30 bg-[#e07b00]/10 px-4 py-1.5 text-xs font-semibold text-[#e07b00]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#e07b00]" />
          Fleet Management · RBAC · Real-time Analytics
        </div>

        <h1 className="text-5xl font-black leading-[1.05] tracking-tight text-foreground sm:text-6xl md:text-7xl">
          Control your fleet<br />
          <span className="text-[#e07b00]">like never before.</span>
        </h1>

        <p className="mt-6 max-w-xl text-base text-muted-foreground sm:text-lg">
          Real-time tracking, advanced analytics, and seamless trip dispatching — built for transport operations teams.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <Link
            to="/register"
            className="rounded-xl bg-[#e07b00] px-8 py-3 text-sm font-bold text-white shadow-xl shadow-[#e07b00]/25 transition-all hover:bg-[#c96d00] hover:shadow-[#e07b00]/40"
          >
            Get started free
          </Link>
          <Link
            to="/login"
            className="rounded-xl border border-border bg-card px-8 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-accent"
          >
            Sign in
          </Link>
        </div>
      </div>

      {/* Feature grid */}
      <div className="mx-auto max-w-5xl px-4 pb-24 sm:px-6">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {features.map(({ icon: Icon, label, title, desc }) => (
            <div
              key={label}
              className="group rounded-2xl border border-border bg-card p-5 transition-all hover:border-[#e07b00]/40 hover:shadow-lg hover:shadow-[#e07b00]/5"
            >
              <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-[#e07b00]/15 group-hover:bg-[#e07b00]/25 transition-colors">
                <Icon className="h-4 w-4 text-[#e07b00]" />
              </div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1">{label}</p>
              <p className="text-sm font-bold text-foreground leading-snug">{title}</p>
              <p className="mt-1.5 text-xs text-muted-foreground leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>

      <Footer footerRef={footerRef} />
    </div>
  )
}

export default Landing
