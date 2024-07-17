import React, { useEffect, useState } from "react";
import Navbar from "./../../components/shared/Navbar/Navbar";
import useAuth from "../../hooks/useAuth";
import useSecureData from "../../hooks/useSecureData";
import LoadingState from "../../components/shared/LoadingState/LoadingState";
import PendingUser from "../../components/shared/PendingUser/PendingUser";
import useAxios from "../../hooks/useAxios";
import { toast } from "react-toastify";
import AgentTransactionHistory from "./AgentTransactionHistory/AgentTransactionHistory";

const AgentDashboard = () => {
  const { user, loading } = useAuth();
  const axiosInstance = useAxios();
  const [agent, setAgent] = useState({});
  const [approveLoading, setApproveLoading] = useState(false);
  const [declineLoading, setDeclineLoading] = useState(false);

  const {
    data: requested_transactions,
    isLoading,
    isError,
    error,
    refetch,
  } = useSecureData("requested-transactions", "/requested-transactions");

  const loadAgent = async () => {
    try {
      const res = await axiosInstance.get(`/single-user?email=${user?.email}`);
      setAgent(res.data);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    if (!user.email) {
      return;
    }
    loadAgent();
  }, [user]);

  const handleApproveTransaction = async (id) => {
    setApproveLoading(true);
    try {
      const res = await axiosInstance.post(`/approve-transaction?id=${id}`);
      if (res.data?.deletedCount) {
        toast.success("Approved successful!", {
          position: "top-center",
        });
        refetch();
        loadAgent();
      }
    } catch (error) {
      toast.error(error?.response?.data?.message, {
        position: "top-center",
      });
    } finally {
      setApproveLoading(false);
    }
  };

  const handleDeclineTransactionReq = async (id, mobile) => {
    setDeclineLoading(true);
    try {
      const res = await axiosInstance.delete(
        `/delete-transaction?id=${id}&mobile=${mobile}`
      );
      if (res.data?.deletedCount) {
        toast.success("Decline successful!", {
          position: "top-center",
        });
        refetch();
      }
    } catch (error) {
      toast.error(error?.response?.data?.message, {
        position: "top-center",
      });
    } finally {
      setDeclineLoading(false);
    }
  };

  if (isLoading || loading) {
    return <LoadingState />;
  }

  if (agent?.status !== "Active") {
    return <PendingUser status={agent?.status} />;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-2 bg-gray-100 py-12">
      <div className="bg-white p-8 rounded-lg w-full max-w-6xl">
        <Navbar />
        <p className="text-xl font-semibold mb-4 text-gray-700 text-center">
          Agent Dashboard
        </p>
        <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
          Total Balance: {agent?.total.toFixed(2)} BDT
        </h2>

        <div className="grid gap-6 grid-cols-1">
          <div className="mb-6">
            <div className="flex justify-between flex-warp">
              <h3 className="text-xl font-semibold mb-4 text-gray-700">
                {approveLoading || declineLoading
                  ? "Processing..."
                  : "Transaction Management"}
              </h3>
              <p className="text-gray-700">Your Number: {user.mobile}</p>
            </div>
            <div className="p-4 bg-gray-200 rounded-lg overflow-x-auto">
              <table className="min-w-full bg-white text-center">
                <thead>
                  <tr className="border-b">
                    <th className="py-2 px-4">Amount</th>
                    <th className="py-2 px-4">Type</th>
                    <th className="py-2 px-4">From</th>
                    <th className="py-2 px-4">Date</th>
                    <th className="py-2 px-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {requested_transactions.map((transaction) => (
                    <tr key={transaction._id} className="border-b">
                      <td className="py-2 px-4">{transaction.amount} Tk</td>
                      <td className="py-2 px-4">{transaction.type}</td>
                      <td className="py-2 px-4">
                        {transaction.from === user.mobile
                          ? transaction.userNumber
                          : transaction.from}
                      </td>
                      <td
                      // className={`py-2 px-4 ${getStatusClass(user.status)}`}
                      >
                        {transaction.date}
                      </td>
                      <td className="items-center py-2 px-4  flex space-x-2 justify-center">
                        <button
                          onClick={() =>
                            handleApproveTransaction(transaction._id)
                          }
                          className="px-3 py-1.5 bg-gray-800 text-white rounded-lg disabled:bg-gray-200 disabled:cursor-not-allowed hover:bg-gray-700"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() =>
                            handleDeclineTransactionReq(
                              transaction._id,
                              transaction.from
                            )
                          }
                          className="px-3 py-1.5 bg-red-600 text-white disabled:bg-gray-200 disabled:cursor-not-allowed rounded-lg hover:bg-red-500"
                        >
                          Decline
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Agent transaction history */}
          <AgentTransactionHistory />
        </div>
      </div>
    </div>
  );
};

export default AgentDashboard;
