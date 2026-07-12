import { useState } from "react"
import { NavLink } from "react-router-dom"

export default function Footer({ footerRef }: { footerRef?: React.RefObject<HTMLElement> }) {
  const [email, setEmail] = useState("")

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setEmail("")
  }

  return (
    <footer
      ref={footerRef}
      className="w-full bg-background border-t border-border"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Top section */}
        <div className="grid grid-cols-1 gap-8 py-14 lg:grid-cols-3">
          {/* Newsletter */}
          <div className="lg:col-span-2">
            <h3 className="mb-3 text-2xl font-bold text-foreground">Stay Updated</h3>
            <p className="mb-6 max-w-lg text-sm leading-relaxed text-muted-foreground">
              Get the latest product updates, feature releases, and transport operations tips
              delivered straight to your inbox. Join the TransDOO community.
            </p>
            <form onSubmit={handleSubmit} className="flex max-w-md flex-col gap-3 sm:flex-row">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="flex-1 rounded-lg border border-border bg-card px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground outline-none transition focus:border-[#e07b00] focus:ring-2 focus:ring-[#e07b00]/20"
              />
              <button
                type="submit"
                className="rounded-lg bg-[#e07b00] px-6 py-2.5 text-sm font-semibold text-white transition-colors duration-200 hover:bg-[#c96d00]"
              >
                Subscribe
              </button>
            </form>
            <p className="mt-3 text-xs text-muted-foreground">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="mb-4 text-xs font-bold uppercase tracking-widest text-muted-foreground">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {[
                { label: "About",       to: "/" },
                { label: "Features",    to: "/" },
                { label: "Help Center", to: "/" },
                { label: "Contact",     to: "/" },
              ].map(({ label, to }) => (
                <li key={label}>
                  <NavLink
                    to={to}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col items-center justify-between gap-4 border-t border-border py-6 md:flex-row">
          <p className="text-sm text-muted-foreground">
            © 2026 <span className="font-semibold text-foreground">TransDOO</span>. All rights reserved.
          </p>
          <div className="flex gap-6">
            {["Privacy Policy", "Terms", "Cookies"].map((item) => (
              <NavLink
                key={item}
                to="/"
                className="text-xs text-muted-foreground transition-colors hover:text-foreground"
              >
                {item}
              </NavLink>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
