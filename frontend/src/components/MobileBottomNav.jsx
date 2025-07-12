import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { Home, Calendar, Scissors, User } from "lucide-react"; // Lucide icons
import clsx from "clsx"; // for conditional class handling
import { Icon } from "lucide-react";

const navItems = [
  { to: "/", label: "Home", icon: Home },
  { to: "/book-slots", label: "Book", icon: Scissors },
  { to: "/my-bookings", label: "Bookings", icon: Calendar },
  { to: "/profile", label: "Profile", icon: User }, // You can later make this dynamic
];

const MobileBottomNav = () => {
  const location = useLocation();
  const { user } = useSelector((state) => state.user);

  // Show only if user is logged in
  if (!user) return null;

  return (
    <nav className="fixed bottom-0 z-50 w-full bg-white border-t border-gray-200 md:hidden shadow">
      <div className="flex justify-around items-center py-2">
        {navItems.map(({ to, label, icon: Icon }) => (
          <Link key={to} to={to} className="flex flex-col items-center text-xs">
            <Icon
              className={clsx(
                "w-5 h-5",
                location.pathname === to ? "text-indigo-600" : "text-gray-500"
              )}
            />
            <span className={clsx(location.pathname === to ? "text-indigo-600 font-medium" : "text-gray-500")}>
              {label}
            </span>
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default MobileBottomNav;
