import { useEffect, useState } from "react";
import useAxios from "../../../hooks/useAxios";
import useAuth from "../../../hooks/useAuth";
import LoadingState from "../../../components/shared/LoadingState/LoadingState";

const AgentTransactionHistory = () => {
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const axiosInstance = useAxios();
  const { user } = useAuth();

  const loadSingleUserData = async () => {
    try {
      const resp = await axiosInstance.get(
        `/specific-transactions?mobile=${user?.mobile}`
      );
      setTransactions(resp.data);
    } catch (error) {
      console.log(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!user) {
      return setIsLoading(true);
    }
    loadSingleUserData();
  }, [user]);

  if (isLoading) {
    return <LoadingState />;
  }

  return (
    <div className="mb-6 ">
      <h3 className="text-xl font-semibold mb-4 text-gray-700">
        Transactions History
      </h3>
      <div className="p-4 bg-gray-200 rounded-lg">
        {transactions.length === 0 ? (
          <p>No transactions found.</p>
        ) : (
          <ul>
            {[...transactions]
              ?.reverse()
              ?.slice(0, 20)
              .map((transaction, index) => (
                <li key={index} className="mb-2">
                  <p>
                    <strong>Amount:</strong> {transaction.amount} Taka
                  </p>
                  <p>
                    <strong>Type:</strong> {transaction.type}
                  </p>
                  <p>
                    <strong>Date:</strong> {transaction.date}
                  </p>
                </li>
              ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default AgentTransactionHistory;
