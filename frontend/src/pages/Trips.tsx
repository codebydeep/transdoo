import AppLayout from "../components/AppLayout"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "../components/ui/select"
import { AlertCircle, CheckCircle2, Circle } from "lucide-react"

const LIFECYCLE = [
  { label: "Draft",      done: true,  active: false },
  { label: "Dispatched", done: false, active: true  },
  { label: "Completed",  done: false, active: false },
  { label: "Cancelled",  done: false, active: false },
]

const liveTrips = [
  { id: "TR001", vehicle: "VAN-05 / ALEX",     route: "Gandhinagar Depot → Ahmedabad Hub",         status: "Dispatched", eta: "45 min" },
  { id: "TR004", vehicle: "TRUCK-04 / SURESH", route: "Vatva Industrial Area → Sanand Warehouse",  status: "Draft",      eta: "awaiting driver" },
  { id: "TR006", vehicle: "Unassigned",         route: "Mansa → Kalol Depot",                       status: "Cancelled",  eta: "Vehicle sent to shop" },
]

const statusStyles: Record<string, string> = {
  Dispatched: "bg-sky-500/15 text-sky-400 border border-sky-500/20",
  Draft:      "bg-muted text-muted-foreground border border-border",
  Cancelled:  "bg-destructive/15 text-destructive border border-destructive/20",
  Completed:  "bg-green-500/15 text-green-500 border border-green-500/20",
}

export default function Trips() {
  return (
    <AppLayout>
      <div className="grid grid-cols-2 gap-6">
        {/* Left: Create Trip */}
        <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
          {/* Lifecycle */}
          <div className="mb-6">
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">Trip Lifecycle</p>
            <div className="flex items-center">
              {LIFECYCLE.map((step, i) => (
                <div key={step.label} className="flex items-center">
                  <div className="flex flex-col items-center gap-1">
                    {step.done
                      ? <CheckCircle2 className="h-4 w-4 text-green-500" />
                      : step.active
                        ? <div className="h-4 w-4 rounded-full border-2 border-[#e07b00] bg-[#e07b00]/20" />
                        : <Circle className="h-4 w-4 text-muted-foreground/30" />
                    }
                    <span className={`text-[10px] font-medium ${step.active ? "text-[#e07b00]" : step.done ? "text-green-500" : "text-muted-foreground/40"}`}>
                      {step.label}
                    </span>
                  </div>
                  {i < LIFECYCLE.length - 1 && (
                    <div className={`mb-4 mx-2 h-px w-10 ${step.done ? "bg-green-500" : "bg-border"}`} />
                  )}
                </div>
              ))}
            </div>
          </div>

          <p className="mb-4 text-sm font-semibold text-foreground">Create Trip</p>

          <div className="space-y-3">
            {[
              { label: "Source",                placeholder: "Gandhinagar Depot" },
              { label: "Destination",           placeholder: "Ahmedabad Hub" },
              { label: "Vehicle (Available Only)", placeholder: "VAN-05 – 500 kg capacity" },
              { label: "Driver (Available Only)",  placeholder: "Alex" },
              { label: "Cargo Weight (KG)",     placeholder: "700" },
              { label: "Planned Distance (KM)", placeholder: "35" },
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

          {/* Validation error */}
          <div className="mt-4 rounded-lg border border-destructive/30 bg-destructive/10 p-3.5">
            <p className="text-xs text-destructive/80">Vehicle Capacity: 500 kg · Cargo Weight: 700 kg</p>
            <div className="mt-1 flex items-center gap-1.5">
              <AlertCircle className="h-3.5 w-3.5 text-destructive flex-shrink-0" />
              <p className="text-xs font-semibold text-destructive">Capacity exceeded by 200 kg — dispatch blocked</p>
            </div>
          </div>

          <div className="mt-4 flex gap-3">
            <Button className="flex-1 bg-muted text-muted-foreground cursor-not-allowed opacity-50" disabled>
              Dispatch (blocked)
            </Button>
            <Button variant="outline" className="flex-1 border-border text-foreground hover:bg-accent">
              Cancel
            </Button>
          </div>
        </div>

        {/* Right: Live Board */}
        <div>
          <p className="mb-4 text-sm font-semibold text-foreground">Live Board</p>
          <div className="space-y-3">
            {liveTrips.map((t) => (
              <div key={t.id} className="rounded-xl border border-border bg-card p-4 shadow-sm hover:border-[#e07b00]/30 transition-colors">
                <div className="flex items-start justify-between mb-1">
                  <p className="text-xs font-mono font-semibold text-muted-foreground">{t.id}</p>
                  <p className="text-xs text-muted-foreground">{t.vehicle}</p>
                </div>
                <p className="text-sm font-semibold text-foreground">{t.route}</p>
                <div className="mt-2.5 flex items-center justify-between">
                  <span className={`rounded-md px-2.5 py-0.5 text-xs font-semibold ${statusStyles[t.status]}`}>
                    {t.status}
                  </span>
                  <span className="text-xs text-muted-foreground">{t.eta}</span>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-4 text-xs text-muted-foreground">
            On Complete: odometer → Fuel log → expenses → Vehicle & Driver set to Available
          </p>
        </div>
      </div>
    </AppLayout>
  )
}
