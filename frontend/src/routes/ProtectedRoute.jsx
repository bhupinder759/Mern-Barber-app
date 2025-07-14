import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import GlobalLoader from "@/pages/GlobalLoader";

const ProtectedRoute = ({ allowedRoles = [] }) => {
  const { user, role, authChecked } = useSelector((state) => state.user);

  if (!authChecked) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-gray-500 text-xl">Checking auth...</div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles.length && !allowedRoles.includes(role)) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
