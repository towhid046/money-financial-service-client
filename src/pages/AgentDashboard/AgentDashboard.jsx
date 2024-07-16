import React from "react";
import Navbar from "./../../components/shared/Navbar/Navbar";

const AgentDashboard = () => {
  // Static data
  const agent = {
    name: "Alice Johnson",
    email: "alice.johnson@example.com",
    mobile: "017XXXXXXXX",
    balance: 5000,
  };

  const transactions = [
    {
      id: 1,
      amount: 150,
      type: "Cash In",
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
      amount: 300,
      type: "Cash In",
      user: "Michael Johnson",
      date: "2024-07-12T16:30:00.000Z",
    },
    {
      id: 4,
      amount: 100,
      type: "Cash Out",
      user: "Emily Davis",
      date: "2024-07-13T10:10:00.000Z",
    },
    {
      id: 5,
      amount: 400,
      type: "Cash In",
      user: "David Lee",
      date: "2024-07-14T12:00:00.000Z",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-2 bg-gray-100 py-12">
      <div className="bg-white p-8 rounded-lg w-full max-w-6xl">
        <Navbar />
        <p className="text-xl font-semibold mb-4 text-gray-700 text-center">
          Agent Dashboard
        </p>
        <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
          Total Balance: {agent.balance} Taka
        </h2>

        <div className="grid gap-6 grid-cols-1 md:grid-cols-1">
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-4 text-gray-700">
              Transaction Management
            </h3>
            <div className="p-4 bg-gray-200 rounded-lg overflow-x-auto">
              <table className="min-w-full bg-white text-center">
                <thead>
                  <tr>
                    <th className="py-2 px-4 border-b">Amount</th>
                    <th className="py-2 px-4 border-b">Type</th>
                    <th className="py-2 px-4 border-b">User</th>
                    <th className="py-2 px-4 border-b">Date</th>
                    <th className="py-2 px-4 border-b">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((transaction) => (
                    <tr key={transaction.id}>
                      <td className="py-2 px-4 border-b">
                        {transaction.amount} Taka
                      </td>
                      <td className="py-2 px-4 border-b">{transaction.type}</td>
                      <td className="py-2 px-4 border-b">{transaction.user}</td>
                      <td className="py-2 px-4 border-b">
                        {new Date(transaction.date).toLocaleString()}
                      </td>
                      <td className="py-2 px-4 border-b flex space-x-2 justify-center">
                        <button className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700">
                          Approve
                        </button>
                        <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-500">
                          Decline
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgentDashboard;
