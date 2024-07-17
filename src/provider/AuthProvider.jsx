import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";

export const UserContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);

  const logOutUser = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  // Truck the current user status:
  useEffect(() => {
    const initialUser = localStorage.getItem("user");
    if (initialUser) {
      setUser(JSON.parse(initialUser));
    } else {
      setUser(null);
    }
    setLoading(false);
  }, []);

  const userInfo = {
    user,
    logOutUser,
    setLoading,
    loading,
    setUser,
  };

  return (
    <UserContext.Provider value={userInfo}>{children}</UserContext.Provider>
  );
};
AuthProvider.propTypes = {
  children: PropTypes.node,
};

export default AuthProvider;
