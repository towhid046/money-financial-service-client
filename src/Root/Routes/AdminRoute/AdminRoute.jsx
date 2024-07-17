import { useEffect } from "react";
import useAuth from "../../../hooks/useAuth";
import useAxios from "../../../hooks/useAxios";
import { useNavigate } from "react-router-dom";
import LoadingState from "../../../components/shared/LoadingState/LoadingState";

const AdminRoute = ({ children }) => {
  const { setLoading, user, logOutUser, loading } = useAuth();
  const axiosInstance = useAxios();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user?.email) {
      return setLoading(true);
    }
    const loadUserRole = async () => {
      const res = await axiosInstance.get(`/get-user-role/${user.email}`);
      if (res.data?.role !== "Admin") {
        navigate("/login");
        await logOutUser();
      }
    };
    loadUserRole();
  }, [user, axiosInstance, logOutUser, setLoading, navigate]);

  if (!user) {
    return navigate("/login");
  }
  if (loading) {
    return <LoadingState />;
  }

  return children;
};

export default AdminRoute;
