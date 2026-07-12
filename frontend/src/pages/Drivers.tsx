import AppLayout from "../components/AppLayout"
import { Button } from "../components/ui/button"
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "../components/ui/table"
import { Plus, ShieldAlert } from "lucide-react"

const drivers = [
  { name: "Alex",   license: "DL-88213", category: "LMV", expiry: "12/2028",         contact: "98765xxxxx", tripCompl: "96%", safety: "Available", status: "Available", expired: false },
  { name: "John",   license: "DL-44120", category: "HMV", expiry: "03/2025",         contact: "98220xxxx",  tripCompl: "81%", safety: "Suspended", status: "Suspended", expired: true  },
  { name: "Priya",  license: "DL-77031", category: "LMV", expiry: "08/2027",         contact: "99810xxxxx", tripCompl: "99%", safety: "On Trip",   status: "On Trip",   expired: false },
  { name: "Suresh", license: "DL-90045", category: "HMV", expiry: "01/2027",         contact: "97440xxxxx", tripCompl: "88%", safety: "Available", status: "Off Duty",  expired: false },
]

const safetyStyles: Record<string, string> = {
  Available: "bg-green-500/15 text-green-500 border border-green-500/20",
  Suspended: "bg-orange-500/15 text-orange-400 border border-orange-500/20",
  "On Trip": "bg-sky-500/15 text-sky-400 border border-sky-500/20",
}
const statusStyles: Record<string, string> = {
  Available: "bg-green-500/15 text-green-500 border border-green-500/20",
  Suspended: "bg-orange-500/15 text-orange-400 border border-orange-500/20",
  "On Trip": "bg-sky-500/15 text-sky-400 border border-sky-500/20",
  "Off Duty":"bg-muted text-muted-foreground border border-border",
}

export default function Drivers() {
  return (
    <AppLayout>
      <div className="mb-5 flex items-center justify-end">
        <Button className="h-8 gap-1.5 bg-[#e07b00] hover:bg-[#c96d00] text-white text-xs shadow-md shadow-[#e07b00]/20">
          <Plus className="h-3.5 w-3.5" /> Add Driver
        </Button>
      </div>

      <div className="rounded-xl border border-border bg-card shadow-sm">
        <Table>
          <TableHeader>
            <TableRow className="border-border hover:bg-transparent">
              {["Driver", "License No", "Category", "Expiry", "Contact", "Trip Compl.", "Safety", "Status"].map((h) => (
                <TableHead key={h} className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground px-4 py-3">{h}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {drivers.map((d) => (
              <TableRow key={d.license} className={`border-border hover:bg-accent/50 cursor-pointer ${d.expired ? "bg-destructive/5" : ""}`}>
                <TableCell className="px-4 py-3 text-sm font-semibold text-foreground">{d.name}</TableCell>
                <TableCell className="px-4 py-3 font-mono text-sm text-foreground">{d.license}</TableCell>
                <TableCell className="px-4 py-3 text-sm text-muted-foreground">{d.category}</TableCell>
                <TableCell className="px-4 py-3">
                  <span className={`flex items-center gap-1 text-sm ${d.expired ? "text-destructive font-semibold" : "text-muted-foreground"}`}>
                    {d.expired && <ShieldAlert className="h-3.5 w-3.5" />}
                    {d.expiry}
                    {d.expired && <span className="text-xs">(EXPIRED)</span>}
                  </span>
                </TableCell>
                <TableCell className="px-4 py-3 text-sm text-muted-foreground">{d.contact}</TableCell>
                <TableCell className="px-4 py-3 text-sm font-semibold text-foreground">{d.tripCompl}</TableCell>
                <TableCell className="px-4 py-3">
                  <span className={`rounded-md px-2.5 py-0.5 text-xs font-semibold ${safetyStyles[d.safety] ?? "bg-muted text-muted-foreground"}`}>{d.safety}</span>
                </TableCell>
                <TableCell className="px-4 py-3">
                  <span className={`rounded-md px-2.5 py-0.5 text-xs font-semibold ${statusStyles[d.status] ?? "bg-muted text-muted-foreground"}`}>{d.status}</span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="mt-5 flex items-start gap-3 rounded-xl border border-destructive/20 bg-destructive/5 p-4">
        <ShieldAlert className="h-4 w-4 text-destructive mt-0.5 flex-shrink-0" />
        <p className="text-xs text-destructive">
          <span className="font-semibold">Rule:</span> Expired license or Suspended status → blocked from trip assignment automatically.
        </p>
      </div>
    </AppLayout>
  )
}
