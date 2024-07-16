import React, { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "./../../components/shared/Navbar/Navbar";
import useAuth from "./../../hooks/useAuth";
import PendingUser from "../../components/shared/PendingUser/PendingUser";

const UserDashboard = () => {
  const [toggle, setToggle] = useState(true);
  const { user } = useAuth();
  // Static data
  const user1 = {
    name: "John Doe",
    email: "john.doe@example.com",
    mobile: "017XXXXXXXX",
    balance: 1000,
  };

  const transactions = [
    { amount: 150, type: "Send Money", date: "2024-07-10T14:48:00.000Z" },
    { amount: 200, type: "Cash Out", date: "2024-07-11T09:15:00.000Z" },
    { amount: 50, type: "Cash In", date: "2024-07-12T16:30:00.000Z" },
    { amount: 100, type: "Send Money", date: "2024-07-13T10:10:00.000Z" },
    { amount: 300, type: "Cash Out", date: "2024-07-14T12:00:00.000Z" },
    { amount: 300, type: "Cash Out", date: "2024-07-14T12:00:00.000Z" },
    { amount: 300, type: "Cash Out", date: "2024-07-14T12:00:00.000Z" },
  ];

  if (user?.role === "Pending") {
    return <PendingUser />;
  }

  return (
    <div className="min-h-screen  flex flex-col py-12 items-center justify-center px-2 bg-gray-100">
      <div className="bg-white p-8 rounded-lg  w-full max-w-6xl">
        <Navbar />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-4 text-gray-700">
              Your Balance
            </h3>
            <div className="p-4 bg-gray-200 rounded-lg">
              <p className="text-3xl font-bold my-4">
                <>Balance:</> {user1.balance} Taka
              </p>
            </div>

            <div className="space-y-5 mt-6">
              {/* Send Money */}
              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-4 text-gray-700">
                  Send Money
                </h3>
                <div className="p-4 bg-gray-200 rounded-lg">
                  <form className="grid grid-cols-2 gap-5">
                    <div>
                      <label
                        className="block text-gray-700 mb-2"
                        htmlFor="amount"
                      >
                        Amount
                      </label>
                      <input
                        type="number"
                        id="amount"
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-gray-600"
                      />
                    </div>
                    <div>
                      <label
                        className="block text-gray-700 mb-2"
                        htmlFor="agentNumber"
                      >
                        User Number
                      </label>
                      <input
                        type="number"
                        id="agentNumber"
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-gray-600"
                      />
                    </div>

                    <div>
                      <label className="block text-gray-700 mb-2" htmlFor="pin">
                        Your PIN
                      </label>
                      <input
                        type="password"
                        id="pin"
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-gray-600"
                      />
                    </div>

                    <div>
                      <label className="block text-gray-700 mb-2" htmlFor="pin">
                        Send Money
                      </label>
                      <input
                        type="Submit"
                        id="pin"
                        value=" Send Money"
                        className=" px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 w-full"
                      />
                    </div>
                  </form>
                </div>
              </div>

              {/* Cash Out  */}
              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-4 text-gray-700">
                  Cash Out
                </h3>
                <div className="p-4 bg-gray-200 rounded-lg">
                  <form className="grid grid-cols-2 gap-5">
                    <div>
                      <label
                        className="block text-gray-700 mb-2"
                        htmlFor="amount"
                      >
                        Amount
                      </label>
                      <input
                        type="number"
                        id="amount"
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-gray-600"
                      />
                    </div>
                    <div>
                      <label
                        className="block text-gray-700 mb-2"
                        htmlFor="agentNumber"
                      >
                        Agent Number
                      </label>
                      <input
                        type="number"
                        id="agentNumber"
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-gray-600"
                      />
                    </div>

                    <div>
                      <label className="block text-gray-700 mb-2" htmlFor="pin">
                        Your PIN
                      </label>
                      <input
                        type="password"
                        id="pin"
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-gray-600"
                      />
                    </div>

                    <div>
                      <label className="block text-gray-700 mb-2" htmlFor="pin">
                        Cash Out
                      </label>
                      <input
                        type="Submit"
                        id="pin"
                        value="Cash Out"
                        className=" px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 w-full"
                      />
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-4 text-gray-700">
              Transactions
            </h3>
            <div className="p-4 bg-gray-200 rounded-lg">
              {transactions.length === 0 ? (
                <p>No transactions found.</p>
              ) : (
                <ul>
                  {transactions.map((transaction, index) => (
                    <li key={index} className="mb-2">
                      <p>
                        <strong>Amount:</strong> {transaction.amount} Taka
                      </p>
                      <p>
                        <strong>Type:</strong> {transaction.type}
                      </p>
                      <p>
                        <strong>Date:</strong>{" "}
                        {new Date(transaction.date).toLocaleString()}
                      </p>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
