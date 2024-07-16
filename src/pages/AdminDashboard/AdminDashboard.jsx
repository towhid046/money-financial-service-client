import { useState } from "react";
import { FiMonitor } from "react-icons/fi";
import { FaUsersGear } from "react-icons/fa6";
import Navbar from "./../../components/shared/Navbar/Navbar";
import UserManagement from "./UserManagement/UserManagement";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("userManagement");

  const transactions = [
    {
      id: 1,
      amount: 150,
      type: "Send Money",
      user: "John Doe",
      date: "2024-07-10T14:48:00.000Z",
    },
    {
      id: 2,
      amount: 200,
      type: "Cash Out",
      user: "Jane Smith",
      date: "2024-07-11T09:15:00.000Z",
    },
    {
      id: 3,
      amount: 50,
      type: "Cash In",
      user: "Michael Johnson",
      date: "2024-07-12T16:30:00.000Z",
    },
  ];

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

          {activeTab === "systemMonitoring" && (
            <div>
              <h3 className="text-xl font-semibold mb-4 text-gray-700">
                System Monitoring
              </h3>
              <div className="p-4 bg-gray-200 rounded-lg overflow-x-auto">
                <table className="min-w-full bg-white text-center">
                  <thead>
                    <tr>
                      <th className="py-2 px-4 border-b">Amount</th>
                      <th className="py-2 px-4 border-b">Type</th>
                      <th className="py-2 px-4 border-b">User</th>
                      <th className="py-2 px-4 border-b">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {transactions.map((transaction) => (
                      <tr key={transaction.id}>
                        <td className="py-2 px-4 border-b">
                          {transaction.amount} Taka
                        </td>
                        <td className="py-2 px-4 border-b">
                          {transaction.type}
                        </td>
                        <td className="py-2 px-4 border-b">
                          {transaction.user}
                        </td>
                        <td className="py-2 px-4 border-b">
                          {new Date(transaction.date).toLocaleString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
