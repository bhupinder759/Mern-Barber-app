import Navbar from "@/components/Navbar";
import MobileBottomNav from "@/components/MobileBottomNav";
import { Outlet } from "react-router-dom";
import { Toaster } from "sonner";

const NavbarLayout = () => {
  return (
    <>
      <Navbar />
      <main className="pt-16 pb-14 px-4"> {/* pb-14 for mobile bottom nav space */}
        <Outlet />
      </main>
      <Toaster position="top-right" richColors />
      <MobileBottomNav />
    </>
  );
};

export default NavbarLayout;
