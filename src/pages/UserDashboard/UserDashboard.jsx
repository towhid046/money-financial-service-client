import Navbar from "./../../components/shared/Navbar/Navbar";
import useAuth from "./../../hooks/useAuth";
import PendingUser from "../../components/shared/PendingUser/PendingUser";
import LoadingState from "../../components/shared/LoadingState/LoadingState";
import { useForm } from "react-hook-form";
import moment from "moment";
import useAxios from "../../hooks/useAxios";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import CashIn from "./CashIn/CashIn";
import CashOut from "./CashOut/CashOut";

const UserDashboard = () => {
  const { user, loading } = useAuth();
  const { register, handleSubmit, reset } = useForm();
  const axiosInstance = useAxios();
  const [singleUser, setSingleUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [transactions, setTransactions] = useState([]);
  const [sendMoneyLoading, setSendMoneyLoading] = useState(false);

  const loadSingleUserData = async () => {
    try {
      const res = await axiosInstance.get(`/single-user?email=${user?.email}`);
      setSingleUser(res.data);

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
    if (!user?.email || !user.mobile) {
      return setIsLoading(true);
    }
    loadSingleUserData();
  }, [user]);

  const handleSendMoney = async (data) => {
    setSendMoneyLoading(true);
    if (Number(data.amount) > Number(singleUser.total)) {
      toast.error("You do not have enough balance", {
        position: "top-center",
      });
      setSendMoneyLoading(false);
      return;
    }
    if (Number(data.amount) < 50) {
      toast.error("You are not allow to send less than 50 TK", {
        position: "top-center",
      });
      setSendMoneyLoading(false);
      return;
    }

    const transaction = {
      ...data,
      date: moment().format("MMMM Do YYYY, h:mm:ss a"),
      type: "Send Money",
      from: user.mobile,
    };
    try {
      const res = await axiosInstance.post("/transaction", transaction);
      if (res?.data.insertedId) {
        loadSingleUserData();
        toast.success("You have successfully send money", {
          position: "top-center",
        });
        reset();
        if (Number(data.amount) > 100) {
          toast.info("5 Tk for charge");
        }
      }
    } catch (error) {
      toast.error(error?.response?.data?.message, {
        position: "top-center",
      });
    } finally {
      setSendMoneyLoading(false);
    }
  };

  if (isLoading || loading) {
    return <LoadingState />;
  }

  if (singleUser?.status === "Blocked" || singleUser?.status === "Pending") {
    return <PendingUser status={singleUser?.status} />;
  }

  return (
    <div className="min-h-screen  flex flex-col py-12 items-center justify-center px-2 bg-gray-100">
      <div className="bg-white p-8 rounded-lg  w-full max-w-6xl">
        <Navbar />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-4 text-gray-700">
              Your Current Balance
            </h3>
            <div className="p-4 bg-gray-200 rounded-lg">
              <p className="text-3xl font-bold my-4">
                <>Balance:</> {singleUser.total.toFixed(2)} Tk
              </p>
              <p>
                <>Your Number: </>
                {singleUser.mobile}
              </p>
            </div>

            <div className="space-y-5 mt-6">
              {/* Send Money */}
              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-4 text-gray-700">
                  Send Money
                </h3>
                <div className="p-4 bg-gray-200 rounded-lg">
                  <form
                    onSubmit={handleSubmit(handleSendMoney)}
                    className="grid grid-cols-2 gap-5"
                  >
                    <div>
                      <label className="block text-gray-700 mb-2">Amount</label>
                      <input
                        {...register("amount")}
                        type="number"
                        required
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-gray-600"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 mb-2">
                        User Number
                      </label>
                      <input
                        {...register("userNumber")}
                        type="number"
                        required
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-gray-600"
                      />
                    </div>

                    <div>
                      <label className="block text-gray-700 mb-2">
                        Your PIN
                      </label>
                      <input
                        {...register("pin")}
                        type="password"
                        required
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-gray-600"
                      />
                    </div>

                    <div>
                      <label className="block text-gray-700 mb-2">
                        Send Money
                      </label>
                      <input
                        type="Submit"
                        required
                        defaultValue={
                          sendMoneyLoading ? "Sending..." : "Send Money"
                        }
                        className=" px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 w-full"
                      />
                    </div>
                  </form>
                </div>
              </div>

              {/* Cash Out  */}
              <CashOut loadSingleUserData={loadSingleUserData} />
            </div>
          </div>

          {/* ---------------------------------------------------------------------------- */}
          <div>
            {/* Cash In Money */}
            <CashIn />

            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-4 text-gray-700">
                Transactions
              </h3>
              <div className="p-4 bg-gray-200 rounded-lg">
                {transactions.length === 0 ? (
                  <p>No transactions found.</p>
                ) : (
                  <ul>
                    {[...transactions]
                      ?.reverse()
                      ?.slice(0, 10)
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
