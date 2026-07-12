import { useEffect } from "react"
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import Landing from "./pages/Landing"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Dashboard from "./pages/Dashboard"
import Fleet from "./pages/Fleet"
import Drivers from "./pages/Drivers"
import Trips from "./pages/Trips"
import Maintenance from "./pages/Maintenance"
import FuelExpenses from "./pages/FuelExpenses"
import Analytics from "./pages/Analytics"
import SettingsPage from "./pages/SettingsPage"
import { useAuthStore } from "./stores/authStore"

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const authUser = useAuthStore((s) => s.authUser)
  const loading  = useAuthStore((s) => s.loading)
  if (loading) return null
  return authUser ? <>{children}</> : <Navigate to="/" replace />
}

function GuestRoute({ children }: { children: React.ReactNode }) {
  const authUser = useAuthStore((s) => s.authUser)
  const loading  = useAuthStore((s) => s.loading)
  if (loading) return null
  return authUser ? <Navigate to="/dashboard" replace /> : <>{children}</>
}

export default function App() {
  const initializeAuth = useAuthStore((s) => s.initializeAuth)

  useEffect(() => { void initializeAuth() }, [initializeAuth])

  return (
    <BrowserRouter>
      <Routes>
        {/* Guest only */}
        <Route path="/"         element={<GuestRoute><Landing /></GuestRoute>} />
        <Route path="/login"    element={<GuestRoute><Login /></GuestRoute>} />
        <Route path="/register" element={<GuestRoute><Register /></GuestRoute>} />

        {/* Protected */}
        <Route path="/dashboard"  element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/fleet"      element={<ProtectedRoute><Fleet /></ProtectedRoute>} />
        <Route path="/drivers"    element={<ProtectedRoute><Drivers /></ProtectedRoute>} />
        <Route path="/trips"      element={<ProtectedRoute><Trips /></ProtectedRoute>} />
        <Route path="/maintenance"element={<ProtectedRoute><Maintenance /></ProtectedRoute>} />
        <Route path="/fuel"       element={<ProtectedRoute><FuelExpenses /></ProtectedRoute>} />
        <Route path="/analytics"  element={<ProtectedRoute><Analytics /></ProtectedRoute>} />
        <Route path="/settings"   element={<ProtectedRoute><SettingsPage /></ProtectedRoute>} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
