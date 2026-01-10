import { Link } from "react-router";
import { BellIcon, LogOutIcon, MenuIcon, Sun, Moon } from "lucide-react";
import useLogout from "../hooks/useLogout";
import { useState, useEffect } from "react";

const Navbar = ({ onMenuClick }) => {
  const { logoutMutation } = useLogout();
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Apply theme to document
  const applyTheme = (isDark) => {
    document.documentElement.setAttribute(
      "data-theme",
      isDark ? "dark" : "light"
    );
  };

  // Load theme on mount
  useEffect(() => {
    try {
      const savedTheme = localStorage.getItem("vTalkTheme");
      const isDark = savedTheme === "dark";
      setIsDarkMode(isDark);
      applyTheme(isDark);
    } catch {
      console.log("localStorage not available");
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    applyTheme(newTheme);

    try {
      localStorage.setItem("vTalkTheme", newTheme ? "dark" : "light");

      // Notify other components if needed
      window.dispatchEvent(
        new CustomEvent("themeChanged", {
          detail: { isDark: newTheme },
        })
      );
    } catch {
      console.log("localStorage not available");
    }
  };

  return (
    <nav className="text-white fixed top-0 left-0 right-0 z-50 h-16 flex items-center bg-gradient-to-br from-[#0B1220] via-[#070D1A] to-[#020617] border-b border-base-300 px-4">
      <div className="flex items-center w-full">
        
        {/* Mobile menu */}
        {onMenuClick && (
          <button
            className="lg:hidden btn btn-ghost btn-circle mr-2"
            onClick={onMenuClick}
          >
            <MenuIcon className="h-6 w-6 text-white" />
          </button>
        )}

        {/* Logo */}
        <div className="text-4xl font-bold">Vtalk</div>

        {/* Right actions */}
        <div className="ml-auto flex items-center gap-3 sm:gap-4">
          
          {/* Theme toggle */}
          <button
            className="btn btn-ghost btn-circle"
            onClick={toggleTheme}
            aria-label="Toggle theme"
          >
            {isDarkMode ? (
              <Sun className="h-5 w-5 text-amber-400" />
            ) : (
              <Moon className="h-5 w-5 text-indigo-400" />
            )}
          </button>

          {/* Notifications */}
          <Link to="/notifications">
            <button className="btn btn-ghost btn-circle">
              <BellIcon className="h-6 w-6 text-white" />
            </button>
          </Link>

          {/* Logout */}
          <button
            className="btn btn-ghost btn-circle"
            onClick={logoutMutation}
          >
            <LogOutIcon className="h-6 w-6 text-white" />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;