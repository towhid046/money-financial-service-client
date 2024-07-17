import LoadingState from "../../../components/shared/LoadingState/LoadingState";
import useAxios from "../../../hooks/useAxios";
import useSecureData from "../../../hooks/useSecureData";

const SystemMonitoring = () => {
  // const axiosInstance = useAxios();
  const {
    data: transactions,
    isLoading,
    isError,
    error,
    refetch,
  } = useSecureData(["transactions"], "/transactions");

  if (isLoading) {
    return <LoadingState />;
  }

  return (
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
              <th className="py-2 px-4 border-b">From</th>
              <th className="py-2 px-4 border-b">To</th>
              <th className="py-2 px-4 border-b">Date</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => (
              <tr key={transaction.id}>
                <td className="py-2 px-4 border-b">{transaction.amount}</td>
                <td className="py-2 px-4 border-b">{transaction.type}</td>
                <td className="py-2 px-4 border-b">{transaction.from}</td>
                <td className="py-2 px-4 border-b">{transaction.userNumber}</td>
                <td className="py-2 px-4 border-b">{transaction.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SystemMonitoring;
