import Footer from "@/components/Footer"
import Navbar from "@/components/Navbar"
import { Outlet } from "react-router"
import { ToastContainer } from "react-toastify"

export const DashboardLayout = ({ isAuthorized, username }: { isAuthorized: boolean | null, username: string | null }) => {

  return (
    <div>
      <main className="w-full bg-white dark:bg-[#141624] ">
        <ToastContainer />
        <Navbar isAuthorized={isAuthorized} username={username} />
        <div className="px-10">
          <Outlet />
        </div>
      </main>
      <Footer />
    </div>
  )
}
