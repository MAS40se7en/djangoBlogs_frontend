import { Icon } from "@iconify/react"
import ToggleDarkMode from "./ui/ToggleDarkMode"
import { useState } from "react";
import ResponsiveNavBar from "./ResponsiveNavbar";
import { NavLink } from "react-router";

const Navbar = ({ isAuthorized, username }: {isAuthorized: boolean | null, username: string | null}) => {
  const [showNavBar, setShowNavBar] = useState(false);
  
  const logout = () => {
    console.log("logout")
  }

  return (
    <>
      <nav className="max-container padding-x py-6 flex justify-between items-center gap-6 sticky top-0 z-10 bg-white dark:bg-[#141624] pl-10 pr-4">
        <NavLink to="/" className="text-[#141624] text-2xl dark:text-[#FFFFFF]">
          <h1 className="text-3xl font-bold">DJANGO<span className="font-extrabold">BLOGS</span></h1>
        </NavLink>
        <ul className="flex items-center justify-end gap-9 text-[#383C4A] lg:flex-1 max-md:hidden dark:text-[#FFFFFF]">
          {isAuthorized ? (
            <>
              <li>Hi, <NavLink to={`/profile`} className="font-semibold">{username}</NavLink></li>
              <li onClick={logout} className="cursor-pointer">Logout</li>
            </>
          ) : (
            <>
              <li>
                <NavLink
                  to="/auth/login"
                  className={({ isActive }) => (isActive ? "active" : "")}
                >
                  Login
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/auth/register"
                  className={({ isActive }) => (isActive ? "active" : "")}
                >
                  Register
                </NavLink>
              </li>
            </>
          )}
          <li className="font-semibold">
            <NavLink to='/create'>
              Create post
            </NavLink>
          </li>
          <li className="flex items-center gap-3 border rounded-full p-2">Theme <ToggleDarkMode /></li>
        </ul>
        <Icon icon="icon-park:hamburger-button" className="text-black md:hidden block w-10 h-10" onClick={() => setShowNavBar((curr) => !curr)} />
      </nav>

      {showNavBar && (
        <ResponsiveNavBar
        />
      )}
    </>
  )
}

export default Navbar