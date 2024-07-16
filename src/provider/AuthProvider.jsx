import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import useAxios from "../hooks/useAxios";
import { toast } from "react-toastify";

export const UserContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);
  const axiosInstance = useAxios();

  const logOutUser = () => {};

  const logInUser = async (mobile, pin) => {
    try {
      const res = await axiosInstance.get(
        `/user-login?mobile=${mobile}&pin=${pin}`
      );
      if (res.data.email) {
        const resp = await axiosInstance.post(
          "/jwt",
          { email: res?.data?.email },
          { withCredentials: true }
        );
        if (resp.data.success) {
          // do something if the user jwt set in cookies
          setUser(res.data);
          localStorage.setItem("user", JSON.stringify(res.data));

          toast.success("Login Success", {
            position: "top-center",
          });
        }
      }
    } catch (error) {
      toast.error(error?.response?.data?.message, {
        position: "top-center",
      });
    }
  };

  // Truck the current user status:
  useEffect(() => {
    const initialUser = localStorage.getItem("user");
    if (initialUser) {
      setUser(JSON.parse(initialUser));
    } else {
      setUser(null);
    }
  }, []);

  const userInfo = {
    user,
    logOutUser,
    setLoading,
    loading,
    logInUser,
  };

  return (
    <UserContext.Provider value={userInfo}>{children}</UserContext.Provider>
  );
};
AuthProvider.propTypes = {
  children: PropTypes.node,
};

export default AuthProvider;
