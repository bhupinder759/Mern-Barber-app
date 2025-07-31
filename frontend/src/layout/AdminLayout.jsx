import React from "react";
import { Outlet, NavLink, Link, useNavigate, useLocation } from "react-router-dom";
import { LogOut, LayoutDashboard, CalendarPlus, CalendarDays, Users, UserCircle, Menu, Scissors } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useDispatch } from "react-redux";
import { logout } from "@/store/userSlice";
import { Toaster } from "sonner";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

// --- NAVIGATION DATA ---
const navLinks = [
  { to: "/dashboard", label: "Dashboard", icon: <LayoutDashboard className="w-5 h-5" /> },
  { to: "/dashboard/create-slot", label: "Create Slot", icon: <CalendarPlus className="w-5 h-5" /> },
  { to: "/dashboard/slots", label: "My Slots", icon: <CalendarDays className="w-5 h-5" /> },
  { to: "/dashboard/bookings", label: "Bookings", icon: <Users className="w-5 h-5" /> },
  { to: "/dashboard/barber-profile", label: "Barber Profile", icon: <UserCircle className="w-5 h-5" /> },
];


// --- REUSABLE SIDEBAR CONTENT ---
// This component contains the navigation links and logout button to avoid duplication.
const SidebarContent = ({ onLinkClick }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login"); // Use navigate for cleaner transitions
  };

  return (
    <div className="flex h-full flex-col p-4">
      {/* Logo */}
      <div className="mb-8 flex items-center gap-2 px-2">
        <Link to="/" className="flex items-center gap-2 text-xl font-bold">
          <Scissors className="h-6 w-6 text-blue-400" />
          <span className="text-white">
            Barber<span className="text-blue-400">Book</span>
          </span>
        </Link>
      </div>

      {/* Navigation Links */}
      <nav className="flex flex-col gap-2">
        {navLinks.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            onClick={onLinkClick} // Close mobile menu on click
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-lg px-3 py-2.5 transition-all
               ${isActive
                ? "bg-blue-900/40 text-blue-300" // Active state
                : "text-gray-400 hover:bg-gray-800 hover:text-gray-200" // Inactive state
              } font-medium`
            }
            // Use end for parent dashboard link to not stay active on child routes
            end={link.to === "/dashboard"}
          >
            {link.icon}
            <span>{link.label}</span>
          </NavLink>
        ))}
      </nav>

      {/* Logout Button at the bottom */}
      <div className="mt-auto">
        <Button
          variant="ghost"
          className="w-full justify-start gap-3 rounded-lg px-3 py-2.5 text-red-400 hover:bg-red-900/40 hover:text-red-300"
          onClick={handleLogout}
        >
          <LogOut className="h-5 w-5" />
          Logout
        </Button>
      </div>
    </div>
  );
};


// --- MAIN LAYOUT COMPONENT ---
const AdminLayout = () => {
  return (
    <>
      <Toaster position="top-right" richColors theme="dark" />
      <div className="flex min-h-screen w-full bg-gray-950 text-gray-200">
        
        {/* Desktop Sidebar */}
        <aside className="hidden w-64 flex-col border-r border-gray-800 bg-black md:flex">
          <SidebarContent />
        </aside>

        <div className="flex flex-1 flex-col">
          {/* Mobile Header */}
          <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b border-gray-800 bg-black/50 px-4 backdrop-blur-lg md:hidden">
            <Link to="/dashboard" className="text-lg font-bold text-white">Admin Panel</Link>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Toggle Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-64 border-l-0 bg-black p-0">
                {/* The `onLinkClick` prop is not needed here as the Sheet component handles its own state */}
                <SidebarContent />
              </SheetContent>
            </Sheet>
          </header>

          {/* Main Content */}
          <main className="flex-1 p-4 md:p-8 lg:p-10">
            <Outlet />
          </main>
        </div>
        
      </div>
    </>
  );
};

export default AdminLayout;