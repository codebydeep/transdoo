import AppLayout from "../components/AppLayout"
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "../components/ui/select"
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "../components/ui/table"
import { TrendingUp, TrendingDown } from "lucide-react"

const statCards = [
  { label: "Active Vehicles",         value: "53", trend: "+4", up: true,  accent: "text-blue-500",    border: "border-t-blue-500" },
  { label: "Available Vehicles",      value: "42", trend: "-2", up: false, accent: "text-green-500",   border: "border-t-green-500" },
  { label: "In Maintenance",          value: "05", trend: "+1", up: false, accent: "text-orange-500",  border: "border-t-orange-500" },
  { label: "Active Trips",            value: "18", trend: "+3", up: true,  accent: "text-sky-500",     border: "border-t-sky-500" },
  { label: "Pending Trips",           value: "09", trend: "—",  up: true,  accent: "text-yellow-500",  border: "border-t-yellow-500" },
  { label: "Drivers on Duty",         value: "26", trend: "+2", up: true,  accent: "text-purple-500",  border: "border-t-purple-500" },
  { label: "Fleet Utilization",       value: "81%",trend: "+5%",up: true,  accent: "text-emerald-500", border: "border-t-emerald-500" },
]

const recentTrips = [
  { id: "TR001", vehicle: "VAN-05",  driver: "Alex",  status: "On Trip",    eta: "45 min" },
  { id: "TR002", vehicle: "TRK-11",  driver: "John",  status: "Completed",  eta: "—" },
  { id: "TR003", vehicle: "MINI-03", driver: "Priya", status: "Dispatched", eta: "in 10m" },
  { id: "TR004", vehicle: "—",       driver: "—",     status: "Draft",      eta: "Awaiting vehicle" },
]

const statusStyles: Record<string, string> = {
  "On Trip":    "bg-sky-500/15 text-sky-500 border border-sky-500/20",
  "Completed":  "bg-green-500/15 text-green-500 border border-green-500/20",
  "Dispatched": "bg-blue-500/15 text-blue-400 border border-blue-500/20",
  "Draft":      "bg-muted text-muted-foreground border border-border",
}

const vehicleStatus = [
  { label: "Available", value: 79, pct: "79%",  color: "bg-green-500" },
  { label: "On Trip",   value: 34, pct: "34%",  color: "bg-sky-500" },
  { label: "In Shop",   value: 9,  pct: "9%",   color: "bg-orange-500" },
  { label: "Retired",   value: 4,  pct: "4%",   color: "bg-red-400" },
]

export default function Dashboard() {
  return (
    <AppLayout>
      {/* Filters */}
      <div className="mb-5 flex items-center gap-3">
        <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Filters</span>
        {["Vehicle Type", "Status", "Region"].map((f) => (
          <Select key={f} defaultValue="all">
            <SelectTrigger className="h-8 w-36 border-border bg-card text-xs focus:ring-[#e07b00]">
              <SelectValue placeholder={`${f}: All`} />
            </SelectTrigger>
            <SelectContent className="border-border bg-popover">
              <SelectItem value="all">{f}: All</SelectItem>
            </SelectContent>
          </Select>
        ))}
      </div>

      {/* Stat Cards */}
      <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4 xl:grid-cols-7">
        {statCards.map(({ label, value, trend, up, accent, border }) => (
          <div key={label} className={`rounded-xl border border-border border-t-2 ${border} bg-card p-4 shadow-sm`}>
            <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground leading-tight">{label}</p>
            <p className={`mt-1.5 text-2xl font-black ${accent}`}>{value}</p>
            {trend !== "—" && (
              <p className={`mt-1 flex items-center gap-0.5 text-[10px] font-medium ${up ? "text-green-500" : "text-red-400"}`}>
                {up ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                {trend} this week
              </p>
            )}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-4">
        {/* Recent Trips */}
        <div className="col-span-2 rounded-xl border border-border bg-card p-5 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <p className="text-sm font-semibold text-foreground">Recent Trips</p>
            <button className="text-xs text-[#e07b00] hover:underline">View all</button>
          </div>
          <Table>
            <TableHeader>
              <TableRow className="border-border hover:bg-transparent">
                {["Trip", "Vehicle", "Driver", "Status", "ETA"].map((h) => (
                  <TableHead key={h} className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground px-2 py-2">{h}</TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentTrips.map((t) => (
                <TableRow key={t.id} className="border-border hover:bg-accent/50 cursor-pointer">
                  <TableCell className="px-2 py-2.5 text-sm font-mono font-semibold text-foreground">{t.id}</TableCell>
                  <TableCell className="px-2 py-2.5 text-sm text-foreground">{t.vehicle}</TableCell>
                  <TableCell className="px-2 py-2.5 text-sm text-muted-foreground">{t.driver}</TableCell>
                  <TableCell className="px-2 py-2.5">
                    <span className={`rounded-md px-2.5 py-0.5 text-xs font-semibold ${statusStyles[t.status]}`}>
                      {t.status}
                    </span>
                  </TableCell>
                  <TableCell className="px-2 py-2.5 text-sm text-muted-foreground">{t.eta}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Vehicle Status */}
        <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
          <p className="mb-5 text-sm font-semibold text-foreground">Vehicle Status</p>
          <div className="space-y-4">
            {vehicleStatus.map(({ label, pct, color }) => (
              <div key={label}>
                <div className="mb-1.5 flex items-center justify-between">
                  <span className="text-sm text-foreground">{label}</span>
                  <span className="text-xs font-semibold text-muted-foreground">{pct}</span>
                </div>
                <div className="h-2.5 w-full rounded-full bg-muted">
                  <div className={`h-2.5 rounded-full ${color} transition-all`} style={{ width: pct }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppLayout>
  )
}
