import AppLayout from "../components/AppLayout"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "../components/ui/table"
import { ArrowRight, Info } from "lucide-react"

const serviceLogs = [
  { vehicle: "VAN-05",   service: "Oil Change",    cost: "2,500",  status: "In Shop" },
  { vehicle: "TRUCK-11", service: "Engine Repair", cost: "18,000", status: "Completed" },
  { vehicle: "MINI-03",  service: "Tyre Replace",  cost: "6,200",  status: "In Shop" },
]

const statusStyles: Record<string, string> = {
  "In Shop":   "bg-orange-500/15 text-orange-400 border border-orange-500/20",
  "Completed": "bg-green-500/15 text-green-500 border border-green-500/20",
}

export default function Maintenance() {
  return (
    <AppLayout>
      <div className="grid grid-cols-2 gap-6">
        {/* Left: Log form */}
        <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
          <p className="mb-4 text-sm font-semibold text-foreground">Log Service Record</p>
          <div className="space-y-3">
            {[
              { label: "Vehicle",      placeholder: "VAN-05" },
              { label: "Service Type", placeholder: "Oil Change" },
              { label: "Cost (₹)",    placeholder: "2500" },
              { label: "Date",         placeholder: "07/07/2026" },
              { label: "Status",       placeholder: "Active" },
            ].map(({ label, placeholder }) => (
              <div key={label} className="space-y-1">
                <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{label}</Label>
                <Input
                  placeholder={placeholder}
                  className="border-border bg-background focus-visible:ring-[#e07b00] focus-visible:border-[#e07b00]"
                />
              </div>
            ))}
          </div>

          <Button className="mt-5 w-full bg-[#e07b00] hover:bg-[#c96d00] text-white font-semibold shadow-md shadow-[#e07b00]/20">
            Save Record
          </Button>

          {/* State transitions */}
          <div className="mt-5 space-y-2.5">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">Status Flow</p>
            {[
              { from: "Available", to: "In Shop",   fromCls: "text-green-500", toCls: "text-orange-400" },
              { from: "In Shop",   to: "Available", fromCls: "text-orange-400",toCls: "text-green-500" },
            ].map(({ from, to, fromCls, toCls }) => (
              <div key={from+to} className="flex items-center gap-2 rounded-lg border border-border bg-background px-3 py-2">
                <span className={`text-sm font-semibold ${fromCls}`}>{from}</span>
                <ArrowRight className="h-3.5 w-3.5 text-muted-foreground" />
                <span className={`text-sm font-semibold ${toCls}`}>{to}</span>
              </div>
            ))}
          </div>

          <div className="mt-4 flex items-start gap-2 rounded-lg border border-[#e07b00]/20 bg-[#e07b00]/10 p-3">
            <Info className="h-3.5 w-3.5 text-[#e07b00] mt-0.5 flex-shrink-0" />
            <p className="text-xs text-[#e07b00]">In Shop vehicles are removed from the dispatch pool automatically.</p>
          </div>
        </div>

        {/* Right: Service logs */}
        <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
          <p className="mb-4 text-sm font-semibold text-foreground">Service Log</p>
          <Table>
            <TableHeader>
              <TableRow className="border-border hover:bg-transparent">
                {["Vehicle", "Service", "Cost", "Status"].map((h) => (
                  <TableHead key={h} className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground px-3 py-2">{h}</TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {serviceLogs.map((l, i) => (
                <TableRow key={i} className="border-border hover:bg-accent/50">
                  <TableCell className="px-3 py-3 text-sm font-semibold text-foreground">{l.vehicle}</TableCell>
                  <TableCell className="px-3 py-3 text-sm text-muted-foreground">{l.service}</TableCell>
                  <TableCell className="px-3 py-3 text-sm text-foreground">₹{l.cost}</TableCell>
                  <TableCell className="px-3 py-3">
                    <span className={`rounded-md px-2.5 py-0.5 text-xs font-semibold ${statusStyles[l.status]}`}>{l.status}</span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </AppLayout>
  )
}
