import { Link } from "react-router-dom"
import { useAuthStore } from "../stores/authStore"

const Home = () => {
  const authUser = useAuthStore((state) => state.authUser)

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 md:px-10 lg:px-8">
      <div className="rounded-[2rem] border border-white/10 bg-[#111111] p-8 text-white shadow-2xl shadow-black/30 lg:p-12">
        <p className="text-sm uppercase tracking-[0.3em] text-gray-400">Dashboard</p>
        <h1 className="mt-4 text-4xl font-semibold">Welcome{authUser?.name ? `, ${authUser.name}` : ""}</h1>
        <p className="mt-4 max-w-2xl text-lg leading-8 text-gray-400">
          Your account is ready. You can now explore listings, manage your profile, and start applying.
        </p>

        <div className="mt-8 flex flex-wrap gap-4">
          <Link
            to="/"
            className="rounded-xl border border-white/10 bg-transparent px-6 py-3 font-medium text-white transition hover:bg-white hover:text-black"
          >
            Back to landing
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Home