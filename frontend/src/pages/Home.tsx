import { useAuthStore } from "../stores/authStore"

const Home = () => {
  const authUser = useAuthStore((state) => state.authUser)

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 md:px-10 lg:px-8">
      <div className="rounded-3xl border border-white/10 bg-[#111111] p-8 text-white shadow-2xl shadow-black/30">
        <h1 className="text-4xl font-semibold">TransDoo</h1>
        <p className="mt-3 text-gray-400">
          {authUser ? `Signed in as ${authUser.email ?? authUser.name ?? "user"}` : "You are not signed in yet."}
        </p>
      </div>
    </div>
  )
}

export default Home