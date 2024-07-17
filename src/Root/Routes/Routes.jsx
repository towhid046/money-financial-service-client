import { createBrowserRouter } from "react-router-dom";
import Root from "../Root";
import Home from "../../pages/Home/Home";
import Login from "../../pages/Login/Login";
import Registration from "../../pages/Registration/Registration";
import UserDashboard from "../../pages/UserDashboard/UserDashboard";
import AgentDashboard from "../../pages/AgentDashboard/AgentDashboard";
import AdminDashboard from "../../pages/AdminDashboard/AdminDashboard";
import NotFoundPage from "../../pages/NotFoundPage/NotFoundPage";
import ProtectedRoute from "./ProtectedRoute/ProtectedRoute";
import AdminRoute from "./AdminRoute/AdminRoute";

const routers = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <NotFoundPage />,
    children: [
      {
        path: "/",
        element: <Login />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/registration",
        element: <Registration />,
      },
      {
        path: "/user-dashboard",
        element: (
          <ProtectedRoute>
            <UserDashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: "/agent-dashboard",
        element: (
          <ProtectedRoute>
            <AgentDashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: "/admin-dashboard",
        element: (
          <AdminRoute>
            <AdminDashboard />
          </AdminRoute>
        ),
      },
    ],
  },
]);

export default routers;
