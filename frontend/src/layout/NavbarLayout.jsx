import Navbar from "@/components/Navbar";
import MobileBottomNav from "@/components/MobileBottomNav";
import { Outlet } from "react-router-dom";
import { Toaster } from "sonner";
import { useSelector } from "react-redux";

const NavbarLayout = () => {
  // const { user } = useSelector((state) => state.user);

  // if (!user || user.role !== "customer") return <Outlet />; // If not a customer, just render the Outlet
  return (
    <>
      <Navbar />
      <main className="pt-16"> {/* pb-14 for mobile bottom nav space */}
        <Outlet />
      </main>
      <Toaster position="top-right" richColors />
      <MobileBottomNav />
    </>
  );
};

export default NavbarLayout;
