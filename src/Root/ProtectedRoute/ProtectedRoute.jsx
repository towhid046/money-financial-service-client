import PropTypes from "prop-types";

const ProtectedRoute = ({ children }) => {
  return { children };
};

ProtectedRoute.propTypes = {
    children: PropTypes.node,
  };
export default ProtectedRoute;
