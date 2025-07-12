import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const { user, token, role } = useSelector((state) => state.user);

  // Not logged in
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Role not allowed
  if (allowedRoles.length && !allowedRoles.includes(role)) {
    return <Navigate to="/" replace />;
  }

  useEffect(() => {
    if (user === null) {
      return <Navigate to="/" replace />;
    } else {
        return children;
    }
  }, [user]);
  
  return children;
};

export default ProtectedRoute;
