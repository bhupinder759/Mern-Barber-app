import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const { user, role } = useSelector((state) => state.user);

  // ✅ Check user instead of token
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Role not allowed
  if (allowedRoles.length && !allowedRoles.includes(role)) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
