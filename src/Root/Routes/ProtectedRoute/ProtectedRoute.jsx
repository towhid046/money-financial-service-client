import { useNavigate } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import PropTypes from "prop-types";
import LoadingState from "../../../components/shared/LoadingState/LoadingState";
import UserDashboard from "../../../pages/UserDashboard/UserDashboard";
import AgentDashboard from "../../../pages/AgentDashboard/AgentDashboard";
import { useEffect, useState } from "react";
import useAxios from "../../../hooks/useAxios";

const ProtectedRoute = ({ children }) => {
  const { user, loading, setLoading } = useAuth();
  const navigate = useNavigate();
  const [userRole, setUserRole] = useState();
  const axiosInstance = useAxios();

  useEffect(() => {
    if (!user?.email) {
      setLoading(true);
    }
    const loadUserRole = async () => {
      const res = await axiosInstance.get(`/get-user-role/${user.email}`);
      setUserRole(res.data?.role);
    };
    loadUserRole();
  }, [user]);

  if (loading) {
    return <LoadingState />;
  }
  if (!user) {
    return navigate("/login");
  }
  if (userRole === "User") {
    return <UserDashboard />;
  }
  if (userRole === "Agent") {
    return <AgentDashboard />;
  }

  return children;
};

ProtectedRoute.propTypes = {
  children: PropTypes.node,
};

export default ProtectedRoute;
