import React, { useState } from "react";
import { Outlet, NavLink } from "react-router-dom";
import { LogOut, LayoutDashboard, CalendarPlus, CalendarDays, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useDispatch } from "react-redux";
import { logout } from "@/store/userSlice";
import { toast } from "sonner";

const navLinks = [
  {
    to: "/dashboard",
    label: "Dashboard",
    icon: <LayoutDashboard className="w-5 h-5" />,
  },
  {
    to: "/dashboard/create-slot",
    label: "Create Slot",
    icon: <CalendarPlus className="w-5 h-5" />,
  },
  {
    to: "/dashboard/slots",
    label: "My Slots",
    icon: <CalendarDays className="w-5 h-5" />,
  },
  {
    to: "/dashboard/bookings",
    label: "Bookings",
    icon: <Users className="w-5 h-5" />,
  },
];

const AdminLayout = () => {
  const dispatch = useDispatch();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    window.location.href = "/login";
  };

  toast("Welcome to the Admin Panel!", { variant: "success" });

  return (
    <div className="lg:flex min-h-screen bg-gradient-to-tr from-indigo-100 via-purple-100 to-blue-100">
      {/* Sidebar for desktop, Topbar for mobile */}
      {/* Desktop Sidebar */}
      <aside
        className={`
          hidden md:block
          h-screen w-64
          transition-transform duration-300
        `}
      >
        <div
          className="h-full flex flex-col justify-between
            bg-gradient-to-b from-indigo-700 via-indigo-800 to-purple-900/90
            backdrop-blur-xl shadow-2xl
            rounded-tr-3xl rounded-br-3xl
            border-r border-white/20
            p-6
            md:rounded-tr-3xl md:rounded-br-3xl
            md:my-0
            md:ml-0
            md:w-64
            min-w-[220px]
            text-white
            "
        >
          {/* Top: Logo & Nav */}
          <div>
            <h2 className="text-2xl font-bold mb-10 text-white drop-shadow-lg tracking-wide">
              Admin Panel
            </h2>
            <nav className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-2 rounded-xl transition-all duration-200
                    ${
                      isActive
                        ? "bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg"
                        : "text-white/80 hover:bg-indigo-400/30 hover:text-white"
                    }
                    font-medium text-base`
                  }
                  end={link.to === "/dashboard"}
                >
                  {link.icon}
                  <span>{link.label}</span>
                </NavLink>
              ))}
            </nav>
          </div>
          {/* Bottom: Logout */}
          <div className="mb-2">
            <Button
              variant="ghost"
              className="w-full flex items-center justify-center gap-2 text-indigo-200 hover:text-white border-none bg-white/10 hover:bg-indigo-600/60 transition-all duration-200"
              onClick={handleLogout}
            >
              <LogOut className="h-5 w-5" />
              Logout
            </Button>
          </div>
        </div>
      </aside>

      {/* Mobile Topbar */}
      <div className="w-full md:hidden flex flex-col">
        <div className="flex items-center justify-between bg-gradient-to-r from-indigo-700 via-indigo-800 to-purple-900/90 backdrop-blur-xl shadow-2xl px-4 py-3">
          <span className="text-xl font-bold text-white tracking-wide">Admin Panel</span>
          <button
            className="bg-indigo-600/80 text-white p-2 rounded-full shadow-lg focus:outline-none"
            onClick={() => setSidebarOpen((open) => !open)}
            aria-label="Toggle menu"
          >
            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button> 
        </div>
        {/* Mobile Menu Drawer */}
        {sidebarOpen && (
          <div className="bg-gradient-to-b from-indigo-700 via-indigo-800 to-purple-900/90 backdrop-blur-xl shadow-2xl text-white px-4 py-4">
            <nav className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-2 rounded-xl transition-all duration-200
                    ${
                      isActive
                        ? "bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg"
                        : "text-white/80 hover:bg-indigo-400/30 hover:text-white"
                    }
                    font-medium text-base`
                  }
                  end={link.to === "/dashboard"}
                  onClick={() => setSidebarOpen(false)}
                >
                  {link.icon}
                  <span>{link.label}</span>
                </NavLink>
              ))}
            </nav>
            <div className="mt-6">
              <Button
                variant="ghost"
                className="w-full flex items-center justify-center gap-2 text-indigo-200 hover:text-white border-none bg-white/10 hover:bg-indigo-600/60 transition-all duration-200"
                onClick={handleLogout}
              >
                <LogOut className="h-5 w-5" />
                Logout
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8 transition-all duration-300">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;