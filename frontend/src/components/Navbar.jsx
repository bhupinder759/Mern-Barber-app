import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "@/store/userSlice";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import axiosInstance from "@/utils/axiosInstance";

export default function Navbar() {
  const { user, role } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    const response = axiosInstance.post("/api/auth/logout");
    dispatch(logout(response));
    navigate("/");
  };

  // Menu items based on role
  const adminMenu = [
    { label: "Dashboard", link: "/dashboard" },
    { label: "Slots", link: "/admin/slots" },
    { label: "Bookings", link: "/admin/bookings" },
  ];

  const customerMenu = [
    { label: "Home", link: "/" },
    { label: "Book Slot", link: "/book-slots" },
    { label: "My Bookings", link: "/my-bookings" },
    { label: "Search", link: "/search" }, // Future route
  ];

  const firstLetter = (name) => {
    return name.split(" ").slice(0).map((word) => word.charAt(0)).join("");
  }

  return (
    <nav className="w-full bg-white shadow-md fixed top-0 left-0 z-50 px-4 py-3 flex items-center justify-between">
      {/* Left - Logo */}
      <Link to="/" className="text-xl font-bold text-indigo-600">
        BarberBook
      </Link>

      {/* Center - Menu */}
      <NavigationMenu className="hidden md:flex">
        <NavigationMenuList className="space-x-6">
          {(role === "admin" ? adminMenu : customerMenu).map((item, i) => (
            <NavigationMenuItem key={i}>
              <NavigationMenuLink asChild>
                <Link to={item.link} className="text-gray-700 hover:text-indigo-600 font-medium">
                  {item.label}
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>

      {/* Right - Buttons */}
      <div className="space-x-4 flex items-center md:flex">
        {user ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className='rounded-full h-10 w-10 bg-black text-white'>{firstLetter(user.name) || "Profile"}</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <>
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate("/login")}
              className="text-sm"
            >
              Login
            </Button>
            <Button
              size="sm"
              onClick={() => navigate("/register")}
              className="text-sm"
            >
              Register
            </Button>
          </>
        )}
      </div>

    </nav>
  );
}
