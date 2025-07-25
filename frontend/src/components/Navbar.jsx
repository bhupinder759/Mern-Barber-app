import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "@/store/userSlice";
import axiosInstance from "@/utils/axiosInstance";

// UI & ICONS
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Scissors, Menu } from "lucide-react";

export default function ModernNavbar() {
  const { user, role } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation(); // To track active links
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  // --- LOGIC (No Changes) ---
  const handleLogout = () => {
    // This logic remains exactly the same
    axiosInstance.post("/api/auth/logout").then(response => {
        dispatch(logout(response));
        navigate("/");
    });
  };

  const getMenuItems = (userRole) => {
    if (userRole === "admin") {
      return [
        { label: "Dashboard", link: "/dashboard" },
        { label: "Slots", link: "/admin/slots" },
        { label: "Bookings", link: "/admin/bookings" },
      ];
    }
    return [
      { label: "Home", link: "/" },
      { label: "Book a Slot", link: "/book-slots" },
      { label: "My Bookings", link: "/my-bookings" },
    ];
  };

  const menuItems = getMenuItems(role);

  const firstLetter = (name) => {
    if (!name) return "";
    return name.charAt(0).toUpperCase();
  };

  // --- UI COMPONENTS ---

  // Reusable component for navigation links to handle active state styling
  const NavLink = ({ to, children, onClick }) => {
    const isActive = location.pathname === to;
    return (
      <Link
        to={to}
        onClick={onClick}
        className={`transition-colors text-sm font-medium ${
          isActive ? "text-white" : "text-gray-400 hover:text-white"
        }`}
      >
        {children}
      </Link>
    );
  };

  return (
    <header className="fixed top-0 left-0 z-50 w-full bg-black/30 backdrop-blur-lg border-b border-gray-800">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        {/* Left - Logo */}
        <Link to="/" className="flex items-center gap-2 text-xl font-bold">
          <Scissors className="h-6 w-6 text-blue-400" />
          <span className="text-white">
            Barber<span className="text-blue-400">Book</span>
          </span>
        </Link>

        {/* Center - Desktop Menu */}
        <nav className="hidden md:flex items-center gap-6">
          {menuItems.map((item) => (
            <NavLink key={item.label} to={item.link}>
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* Right - Buttons & User Profile */}
        <div className="hidden md:flex items-center gap-3">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="secondary" className="relative h-10 w-10 text-white rounded-full bg-gray-800 hover:bg-gray-700">
                  {firstLetter(user.name)}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 bg-gray-900 border-gray-700 text-gray-200" align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-gray-700" />
                <DropdownMenuItem className="cursor-pointer focus:bg-gray-800 focus:text-white" onClick={() => navigate('/profile')}>
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer focus:bg-gray-800 focus:text-white" onClick={handleLogout}>
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Button variant="ghost" className="text-white hover:bg-gray-800 hover:text-white" onClick={() => navigate("/login")}>
                Login
              </Button>
              <Button className="bg-blue-500 text-white hover:bg-blue-600" onClick={() => navigate("/register")}>
                Register
              </Button>
            </>
          )}
        </div>

        {/* Mobile Menu Trigger */}
        <div className="md:hidden">
          <Sheet open={isMobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="text-white hover:bg-gray-800">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-gray-900/95 border-l border-gray-800 text-white">
              <div className="flex flex-col h-full p-6">
                <nav className="grid gap-6 text-lg font-medium mt-10">
                  {menuItems.map((item) => (
                    <NavLink key={item.label} to={item.link} onClick={() => setMobileMenuOpen(false)}>
                      {item.label}
                    </NavLink>
                  ))}
                </nav>
                <div className="mt-auto">
                   {user ? (
                     <div className="text-center">
                        <p className="font-semibold">{user.name}</p>
                        <Button variant="destructive" className="w-full mt-4" onClick={() => { handleLogout(); setMobileMenuOpen(false); }}>Logout</Button>
                     </div>
                   ) : (
                     <div className="grid gap-4">
                        <Button variant="outline" className="border-gray-600 bg-transparent hover:bg-gray-800" onClick={() => { navigate("/login"); setMobileMenuOpen(false); }}>Login</Button>
                        <Button className="bg-blue-500 hover:bg-blue-600" onClick={() => { navigate("/register"); setMobileMenuOpen(false); }}>Register</Button>
                     </div>
                   )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}