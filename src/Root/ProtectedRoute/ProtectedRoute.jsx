import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

import PropTypes from "prop-types";
import LoadingState from "./../../components/shared/LoadingState/LoadingState";
import UserDashboard from "../../pages/UserDashboard/UserDashboard";
import AgentDashboard from "../../pages/AgentDashboard/AgentDashboard";
import AdminDashboard from "../../pages/AdminDashboard/AdminDashboard";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  if (loading) {
    return <LoadingState />;
  }
  if (!user) {
    return navigate("/login");
  }
  if (user.role === "User") {
    return <UserDashboard />;
  }
  if (user.role === "Agent") {
    return <AgentDashboard />;
  }
  if (user.role === "Admin") {
    return <AdminDashboard />;
  }

  return children;
};

ProtectedRoute.propTypes = {
  children: PropTypes.node,
};

export default ProtectedRoute;
