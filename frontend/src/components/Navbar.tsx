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
    <div className="w-full">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 md:px-10 lg:px-8">
        <div className="flex-1">
          <span className="cursive text-2xl font-extrabold">Launchpad</span>
        </div>

        <div className="hidden flex-1 items-center justify-center gap-6 md:flex">

          <NavLink
            to={"/startups"}
            className={({ isActive }) =>
              isActive
                ? "font-semibold text-[#e86100]"
                : "text-gray-400 hover:text-[#d7742d]"
            }
          >Startups</NavLink>
          <NavLink
            to={"/jobs"}
            className={({ isActive }) =>
              isActive
                ? "font-semibold text-[#e86100]"
                : "text-gray-400 hover:text-[#d7742d]"
            }
          >Internships</NavLink>
          <NavLink
            to={"/jobs"}
            className={({ isActive }) =>
              isActive
                ? "font-semibold text-[#e86100]"
                : "text-gray-400 hover:text-[#d7742d]"
            }
          >Interview</NavLink>
          <NavLink
            to={"/jobs"}
            className={({ isActive }) =>
              isActive
                ? "font-semibold text-[#e86100]"
                : "text-gray-400 hover:text-[#d7742d]"
            }
          >Blogs</NavLink>
          <NavLink
            to={"/jobs"}
            className={({ isActive }) =>
              isActive
                ? "font-semibold text-[#e86100]"
                : "text-gray-400 hover:text-[#d7742d]"
            }
          >Resume</NavLink>
        </div>

        <div className="flex flex-1 justify-end">
          {authUser ? (
            <div className="flex gap-3">
              <Button
                variant="outline"
                className="text-md cursor-pointer rounded-lg border border-white/10 bg-transparent px-6 py-5 font-medium text-white transition-colors duration-200 hover:bg-white hover:text-black"
                onClick={handleSignout}
              >
                Sign out
              </Button>
              <Button
                className="text-md cursor-pointer rounded-lg border-none bg-[#e86100] px-6 py-5 font-medium text-white transition-colors duration-200 hover:bg-white hover:text-black"
                onClick={() => navigate("/register")}
              >
                Register
              </Button>
            </div>
          ) : (
            <div className="flex gap-3">
              <Button
                variant="outline"
                className="text-md cursor-pointer rounded-lg border border-white/10 bg-transparent px-6 py-5 font-medium text-white transition-colors duration-200 hover:bg-white hover:text-black"
                onClick={() => navigate("/login")}
              >
                Sign in
              </Button>
              <Button
                className="text-md cursor-pointer rounded-lg border-none bg-[#e86100] px-6 py-5 font-medium text-white transition-colors duration-200 hover:bg-white hover:text-black"
                onClick={() => navigate("/register")}
              >
                Register
              </Button>
            </div>
          )}
        </div>
      </div>
      <div className="mx-auto max-w-7xl border-t border-gray-200 px-4 sm:px-6 md:px-10 lg:px-8 dark:border-zinc-800"></div>
    </div>
  )
}

export default Navbar