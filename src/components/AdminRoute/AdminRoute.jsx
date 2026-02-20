import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Loader from "../Loader/Loader";

const AdminRoute = ({ children }) => {
  const { user, isReady } = useAuth();
  if (!isReady) return <Loader label="Loading session" />;
  if (!user) return <Navigate to="/login" replace />;
  if (user.role !== "admin") return <Navigate to="/" replace />;
  return children;
};

export default AdminRoute;
