import { useAuthStore } from "../stores/authStore"
import { Button } from "./ui/button"
import { NavLink, useNavigate } from "react-router-dom"

const Navbar = () => {
  const navigate = useNavigate()

  const { authUser } = useAuthStore()

  const signout = useAuthStore((s) => s.signout)

  const handleSignout = async () => {
    const success = await signout()

    if (success) {
      navigate("/login", {
        replace: true,
      })
    }
  }

  return (
    <div className="w-full border-b border-gray-100 bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 md:px-10 lg:px-8">
        {/* Logo */}
        <div className="flex-1">
          <span className="manrope text-xl font-extrabold tracking-tight text-black">TransDOO</span>
        </div>

        {/* Nav links */}
        <div className="hidden flex-1 items-center justify-center gap-7 md:flex">
          <NavLink
            to={"/startups"}
            className={({ isActive }) =>
              isActive
                ? "text-sm font-semibold text-black"
                : "text-sm text-gray-500 transition-colors hover:text-black"
            }
          >Vehicles</NavLink>
          <NavLink
            to={"/drivers"}
            className={({ isActive }) =>
              isActive
                ? "text-sm font-semibold text-black"
                : "text-sm text-gray-500 transition-colors hover:text-black"
            }
          >Drivers</NavLink>
          <NavLink
            to={"/trips"}
            className={({ isActive }) =>
              isActive
                ? "text-sm font-semibold text-black"
                : "text-sm text-gray-500 transition-colors hover:text-black"
            }
          >Trips</NavLink>
          <NavLink
            to={"/reports"}
            className={({ isActive }) =>
              isActive
                ? "text-sm font-semibold text-black"
                : "text-sm text-gray-500 transition-colors hover:text-black"
            }
          >Reports</NavLink>
          <NavLink
            to={"/about"}
            className={({ isActive }) =>
              isActive
                ? "text-sm font-semibold text-black"
                : "text-sm text-gray-500 transition-colors hover:text-black"
            }
          >About</NavLink>
        </div>

        {/* Auth button */}
        <div className="flex flex-1 items-center justify-end gap-3">
          {authUser ? (
            <Button
              variant="outline"
              className="cursor-pointer rounded-full border border-gray-200 bg-white px-5 py-2 text-sm font-medium text-black transition-colors duration-200 hover:bg-black hover:text-white"
              onClick={handleSignout}
            >
              Logout
            </Button>
          ) : (
            <>
              <button
                className="text-sm font-medium text-gray-600 transition-colors hover:text-black"
                onClick={() => navigate("/login")}
              >
                Sign in
              </button>
              <Button
                variant="outline"
                className="cursor-pointer rounded-full border-0 bg-black px-5 py-2 text-sm font-medium text-white transition-colors duration-200 hover:bg-gray-800"
                onClick={() => navigate("/register")}
              >
                Get started
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default Navbar