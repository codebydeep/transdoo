import AppLayout from "../components/AppLayout"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "../components/ui/select"
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "../components/ui/table"
import { Plus } from "lucide-react"

const vehicles = [
  { reg: "GJ01AB452", name: "VAN-05",   type: "Van",   capacity: "500 kg", odometer: "74,000",  acqCost: "6,20,000",  status: "Available" },
  { reg: "GJ01AB998", name: "TRUCK-11", type: "Truck", capacity: "5 Ton",  odometer: "182,000", acqCost: "24,50,000", status: "On Trip" },
  { reg: "GJ01AB120", name: "MINI-03",  type: "Mini",  capacity: "1 Ton",  odometer: "66,000",  acqCost: "4,10,000",  status: "In Shop" },
  { reg: "GJ01AB008", name: "VAN-09",   type: "Van",   capacity: "750 kg", odometer: "241,900", acqCost: "5,90,000",  status: "Retired" },
]

const statusStyles: Record<string, string> = {
  Available: "bg-green-500/15 text-green-500 border border-green-500/20",
  "On Trip": "bg-sky-500/15 text-sky-400 border border-sky-500/20",
  "In Shop": "bg-orange-500/15 text-orange-400 border border-orange-500/20",
  Retired:   "bg-red-400/15 text-red-400 border border-red-400/20",
}

export default function Fleet() {
  return (
    <AppLayout>
      <div className="mb-5 flex items-center gap-3">
        <Select defaultValue="all">
          <SelectTrigger className="h-8 w-28 border-border bg-card text-xs focus:ring-0">
            <SelectValue placeholder="Type: All" />
          </SelectTrigger>
          <SelectContent className="border-border bg-popover">
            <SelectItem value="all">Type: All</SelectItem>
            <SelectItem value="van">Van</SelectItem>
            <SelectItem value="truck">Truck</SelectItem>
            <SelectItem value="mini">Mini</SelectItem>
          </SelectContent>
        </Select>

        <Select defaultValue="all">
          <SelectTrigger className="h-8 w-32 border-border bg-card text-xs focus:ring-0">
            <SelectValue placeholder="Status: All" />
          </SelectTrigger>
          <SelectContent className="border-border bg-popover">
            <SelectItem value="all">Status: All</SelectItem>
            <SelectItem value="available">Available</SelectItem>
            <SelectItem value="on_trip">On Trip</SelectItem>
            <SelectItem value="in_shop">In Shop</SelectItem>
            <SelectItem value="retired">Retired</SelectItem>
          </SelectContent>
        </Select>

        <Input
          placeholder="Search reg. no..."
          className="h-8 w-44 border-border bg-card text-xs placeholder:text-muted-foreground focus-visible:ring-[#e07b00]"
        />

        <div className="ml-auto">
          <Button className="h-8 gap-1.5 bg-[#e07b00] hover:bg-[#c96d00] text-white text-xs shadow-md shadow-[#e07b00]/20">
            <Plus className="h-3.5 w-3.5" /> Add Vehicle
          </Button>
        </div>
      </div>

      <div className="rounded-xl border border-border bg-card shadow-sm">
        <Table>
          <TableHeader>
            <TableRow className="border-border hover:bg-transparent">
              {["Reg. No.", "Name/Model", "Type", "Capacity", "Odometer", "Acq. Cost", "Status"].map((h) => (
                <TableHead key={h} className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground px-4 py-3">{h}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {vehicles.map((v) => (
              <TableRow key={v.reg} className="border-border hover:bg-accent/50 cursor-pointer">
                <TableCell className="px-4 py-3 font-mono text-sm font-semibold text-foreground">{v.reg}</TableCell>
                <TableCell className="px-4 py-3 text-sm font-medium text-foreground">{v.name}</TableCell>
                <TableCell className="px-4 py-3 text-sm text-muted-foreground">{v.type}</TableCell>
                <TableCell className="px-4 py-3 text-sm text-muted-foreground">{v.capacity}</TableCell>
                <TableCell className="px-4 py-3 text-sm text-muted-foreground">{v.odometer}</TableCell>
                <TableCell className="px-4 py-3 text-sm text-muted-foreground">₹{v.acqCost}</TableCell>
                <TableCell className="px-4 py-3">
                  <span className={`rounded-md px-2.5 py-0.5 text-xs font-semibold ${statusStyles[v.status]}`}>{v.status}</span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <p className="mt-3 text-xs text-[#e07b00]">
        Rule: Registration No. must be unique · Retired/In Shop vehicles are hidden from Trip Dispatcher
      </p>
    </AppLayout>
  )
}
