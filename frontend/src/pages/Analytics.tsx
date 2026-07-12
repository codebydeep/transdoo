import AppLayout from "../components/AppLayout"
import { TrendingUp } from "lucide-react"

const kpiCards = [
  { label: "Fuel Efficiency",   value: "8.4 km/l", sub: "+0.3 vs last month", accent: "text-sky-400",     border: "border-t-sky-400" },
  { label: "Fleet Utilization", value: "81%",       sub: "+5% vs last month",  accent: "text-green-400",   border: "border-t-green-400" },
  { label: "Operational Cost",  value: "₹34,070",  sub: "Fuel + Maintenance",  accent: "text-orange-400",  border: "border-t-orange-400" },
  { label: "Vehicle ROI",       value: "14.2%",     sub: "Net after all costs", accent: "text-emerald-400", border: "border-t-emerald-400" },
]

const monthlyRevenue = [65, 72, 68, 80, 85, 78, 90, 88]
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"]

const costliestVehicles = [
  { name: "TRUCK-11", pct: 88, color: "bg-red-400",    label: "₹24,500" },
  { name: "MINI-03",  pct: 42, color: "bg-orange-400", label: "₹11,200" },
  { name: "VAN-05",   pct: 18, color: "bg-sky-400",    label: "₹5,050" },
]

export default function Analytics() {
  return (
    <AppLayout>
      {/* KPI Cards */}
      <div className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {kpiCards.map(({ label, value, sub, accent, border }) => (
          <div key={label} className={`rounded-xl border border-border border-t-2 ${border} bg-card p-5 shadow-sm`}>
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{label}</p>
            <p className={`mt-2 text-3xl font-black ${accent}`}>{value}</p>
            <p className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
              <TrendingUp className="h-3 w-3 text-green-500" /> {sub}
            </p>
          </div>
        ))}
      </div>

      <p className="mb-5 text-xs text-muted-foreground">
        ROI = Revenue – (Maintenance + Fuel) / Acquisition Cost
      </p>

      <div className="grid grid-cols-2 gap-5">
        {/* Monthly Revenue chart */}
        <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
          <p className="mb-5 text-sm font-semibold text-foreground">Monthly Revenue</p>
          <div className="flex h-44 items-end gap-2">
            {monthlyRevenue.map((h, i) => (
              <div key={i} className="group flex flex-1 flex-col items-center gap-1">
                <span className="hidden group-hover:block text-[10px] text-muted-foreground">{h}k</span>
                <div
                  className="w-full rounded-t-md bg-sky-500 opacity-70 hover:opacity-100 transition-all cursor-pointer"
                  style={{ height: `${h}%` }}
                />
              </div>
            ))}
          </div>
          <div className="mt-2 flex justify-between">
            {months.map((m) => (
              <span key={m} className="flex-1 text-center text-[10px] text-muted-foreground">{m}</span>
            ))}
          </div>
        </div>

        {/* Costliest vehicles */}
        <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
          <p className="mb-5 text-sm font-semibold text-foreground">Top Costliest Vehicles</p>
          <div className="space-y-5">
            {costliestVehicles.map(({ name, pct, color, label }) => (
              <div key={name}>
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-sm font-semibold text-foreground">{name}</span>
                  <span className="text-xs font-semibold text-muted-foreground">{label}</span>
                </div>
                <div className="h-3 w-full rounded-full bg-muted">
                  <div className={`h-3 rounded-full ${color} transition-all`} style={{ width: `${pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppLayout>
  )
}
