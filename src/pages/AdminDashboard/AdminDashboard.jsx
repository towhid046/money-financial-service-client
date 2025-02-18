import { useState } from "react";
import { FiMonitor } from "react-icons/fi";
import { FaUsersGear } from "react-icons/fa6";
import Navbar from "./../../components/shared/Navbar/Navbar";
import UserManagement from "./UserManagement/UserManagement";
import SystemMonitoring from "./SystemMonitoring/SystemMonitoring";
import useAuth from "../../hooks/useAuth";
import LoadingState from "../../components/shared/LoadingState/LoadingState";

const AdminDashboard = () => {
  const { loading } = useAuth();
  const [activeTab, setActiveTab] = useState("userManagement");

  if (loading) {
    return <LoadingState />;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-2 bg-gray-100 py-12">
      <div className="bg-white p-8 rounded-lg  w-full max-w-6xl min-h-[90vh]">
        <Navbar />
        <p className="text-xl font-semibold mb-4 text-gray-700 text-center">
          Admin Dashboard
        </p>

        <div className="mb-6">
          <div className="flex justify-center  mb-4">
            <div className="border-b-2 w-full"></div>

            <button
              className={`px-4 py-2 flex items-center min-w-max space-x-2 rounded-t-lg transition duration-500 ${
                activeTab === "userManagement"
                  ? "border-2 border-b-0 "
                  : "border-b-2"
              }`}
              onClick={() => setActiveTab("userManagement")}
            >
              <FaUsersGear className="inline-block" />
              <span>User Management</span>
            </button>

            <button
              className={`px-4 py-2 flex items-center min-w-max space-x-2 rounded-t-lg transition duration-500  ${
                activeTab === "systemMonitoring"
                  ? "border-2 border-b-0"
                  : "border-b-2"
              }`}
              onClick={() => setActiveTab("systemMonitoring")}
            >
              <FiMonitor className="inline-block" />
              <span>System Monitoring</span>
            </button>
            <div className="border-b-2 w-full"></div>
          </div>

          {activeTab === "userManagement" && <UserManagement />}

          {activeTab === "systemMonitoring" && <SystemMonitoring />}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
