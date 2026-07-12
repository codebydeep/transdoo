import AppLayout from "../components/AppLayout"
import { Button } from "../components/ui/button"
import { Separator } from "../components/ui/separator"
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "../components/ui/table"
import { Plus, Fuel, Receipt } from "lucide-react"

const fuelLogs = [
  { vehicle: "VAN-05",   date: "05 Jul 2026", liters: "42 L",  cost: "3,150" },
  { vehicle: "TRUCK-11", date: "06 Jul 2026", liters: "110 L", cost: "8,400" },
  { vehicle: "MINI-03",  date: "06 Jul 2026", liters: "28 L",  cost: "2,050" },
]

const otherExpenses = [
  { trip: "TR001", vehicle: "VAN-05", toll: "120", other: "0",   maintenance: "0",      status: "Available" },
  { trip: "TR002", vehicle: "TRK-12", toll: "340", other: "150", maintenance: "18,000", status: "Completed" },
]

const statusStyles: Record<string, string> = {
  Available: "bg-green-500/15 text-green-500 border border-green-500/20",
  Completed: "bg-sky-500/15 text-sky-400 border border-sky-500/20",
}

export default function FuelExpenses() {
  return (
    <AppLayout>
      {/* Fuel Logs */}
      <div className="mb-5 rounded-xl border border-border bg-card p-5 shadow-sm">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Fuel className="h-4 w-4 text-[#e07b00]" />
            <p className="text-sm font-semibold text-foreground">Fuel Logs</p>
          </div>
          <div className="flex gap-2">
            <Button className="h-8 gap-1.5 bg-[#e07b00] hover:bg-[#c96d00] text-white text-xs shadow-sm shadow-[#e07b00]/20">
              <Plus className="h-3.5 w-3.5" /> Log Fuel
            </Button>
            <Button variant="outline" className="h-8 gap-1.5 border-border text-foreground hover:bg-accent text-xs">
              <Plus className="h-3.5 w-3.5" /> Add Expense
            </Button>
          </div>
        </div>
        <Table>
          <TableHeader>
            <TableRow className="border-border hover:bg-transparent">
              {["Vehicle", "Date", "Liters", "Cost (₹)"].map((h) => (
                <TableHead key={h} className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground px-4 py-2">{h}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {fuelLogs.map((f, i) => (
              <TableRow key={i} className="border-border hover:bg-accent/50">
                <TableCell className="px-4 py-3 text-sm font-semibold text-foreground">{f.vehicle}</TableCell>
                <TableCell className="px-4 py-3 text-sm text-muted-foreground">{f.date}</TableCell>
                <TableCell className="px-4 py-3 text-sm text-foreground">{f.liters}</TableCell>
                <TableCell className="px-4 py-3 text-sm font-semibold text-foreground">₹{f.cost}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Other Expenses */}
      <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
        <div className="mb-4 flex items-center gap-2">
          <Receipt className="h-4 w-4 text-[#e07b00]" />
          <p className="text-sm font-semibold text-foreground">Other Expenses (Toll / Misc)</p>
        </div>
        <Table>
          <TableHeader>
            <TableRow className="border-border hover:bg-transparent">
              {["Trip", "Vehicle", "Toll", "Other", "Maintenance", "Status"].map((h) => (
                <TableHead key={h} className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground px-4 py-2">{h}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {otherExpenses.map((e, i) => (
              <TableRow key={i} className="border-border hover:bg-accent/50">
                <TableCell className="px-4 py-3 font-mono text-sm font-semibold text-foreground">{e.trip}</TableCell>
                <TableCell className="px-4 py-3 text-sm text-foreground">{e.vehicle}</TableCell>
                <TableCell className="px-4 py-3 text-sm text-muted-foreground">₹{e.toll}</TableCell>
                <TableCell className="px-4 py-3 text-sm text-muted-foreground">₹{e.other}</TableCell>
                <TableCell className="px-4 py-3 text-sm text-muted-foreground">₹{e.maintenance}</TableCell>
                <TableCell className="px-4 py-3">
                  <span className={`rounded-md px-2.5 py-0.5 text-xs font-semibold ${statusStyles[e.status]}`}>{e.status}</span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <Separator className="my-4 bg-border" />
        <div className="flex items-center justify-between">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Total Operational Cost (Auto) = Fuel + Maintenance
          </p>
          <p className="text-xl font-black text-[#e07b00]">₹34,070</p>
        </div>
      </div>
    </AppLayout>
  )
}
