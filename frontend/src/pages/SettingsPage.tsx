import AppLayout from "../components/AppLayout"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { Separator } from "../components/ui/separator"
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "../components/ui/table"
import { Check, Minus, Eye } from "lucide-react"

const rbacData = [
  { role: "Fleet Manager",    fleet: true,  drivers: true,  trips: false, fuelExp: false, analytics: true  },
  { role: "Dispatcher",       fleet: "view",drivers: false, trips: true,  fuelExp: false, analytics: false },
  { role: "Safety Officer",   fleet: false, drivers: true,  trips: "view",fuelExp: false, analytics: false },
  { role: "Financial Analyst",fleet: "view",drivers: false, trips: false, fuelExp: true,  analytics: true  },
]

function Cell({ val }: { val: boolean | string }) {
  if (val === true)  return <Check className="h-4 w-4 text-green-500" />
  if (val === false) return <Minus className="h-4 w-4 text-muted-foreground/30" />
  return (
    <span className="flex items-center gap-1 text-xs font-semibold text-sky-400">
      <Eye className="h-3 w-3" /> View
    </span>
  )
}

export default function SettingsPage() {
  return (
    <AppLayout>
      <div className="grid grid-cols-2 gap-8">
        {/* General */}
        <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
          <p className="mb-5 text-sm font-semibold text-foreground">General</p>
          <div className="space-y-4">
            {[
              { label: "Depot Name",    value: "Gandhinagar Depot G/N", placeholder: "" },
              { label: "Currency",      value: "INR (₹)",               placeholder: "" },
              { label: "Distance Unit", value: "Kilometers",             placeholder: "" },
            ].map(({ label, value }) => (
              <div key={label} className="space-y-1.5">
                <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{label}</Label>
                <Input
                  defaultValue={value}
                  className="border-border bg-background focus-visible:ring-[#e07b00] focus-visible:border-[#e07b00]"
                />
              </div>
            ))}
            <Button className="mt-2 bg-[#e07b00] hover:bg-[#c96d00] text-white font-semibold shadow-md shadow-[#e07b00]/20">
              Save Changes
            </Button>
          </div>
        </div>

        {/* RBAC */}
        <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
          <p className="mb-5 text-sm font-semibold text-foreground">Role-Based Access (RBAC)</p>
          <Table>
            <TableHeader>
              <TableRow className="border-border hover:bg-transparent">
                {["Role", "Fleet", "Drivers", "Trips", "Fuel/Exp", "Analytics"].map((h) => (
                  <TableHead key={h} className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground px-3 py-2">{h}</TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {rbacData.map((r) => (
                <TableRow key={r.role} className="border-border hover:bg-accent/50">
                  <TableCell className="px-3 py-3 text-sm font-semibold text-foreground">{r.role}</TableCell>
                  <TableCell className="px-3 py-3"><Cell val={r.fleet} /></TableCell>
                  <TableCell className="px-3 py-3"><Cell val={r.drivers} /></TableCell>
                  <TableCell className="px-3 py-3"><Cell val={r.trips} /></TableCell>
                  <TableCell className="px-3 py-3"><Cell val={r.fuelExp} /></TableCell>
                  <TableCell className="px-3 py-3"><Cell val={r.analytics} /></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <Separator className="my-4 bg-border" />
          <p className="text-xs text-muted-foreground">
            ✓ = Full access · View = Read-only · — = No access
          </p>
        </div>
      </div>
    </AppLayout>
  )
}
