import moment from "moment";
import { toast } from "react-toastify";
import useAxios from "../../../hooks/useAxios";
import useAuth from "../../../hooks/useAuth";
import { useForm } from "react-hook-form";
import { useState } from "react";

const CashOut = ({ loadSingleUserData }) => {
  const { register, handleSubmit, reset } = useForm();
  const { user } = useAuth();
  const axiosInstance = useAxios();
  const [cashOutLoading, setCashOutLoading] = useState(false);

  const handleCashOut = async (data) => {
    setCashOutLoading(true);

    if (typeof Number(data.amount) !== "number") {
      toast.error("Amount must be a number", {
        position: "top-center",
      });
      setCashOutLoading(false);
      return;
    }

    if (Number(data.amount) > Number(user.total)) {
      toast.error("You do not have enough balance", {
        position: "top-center",
      });
      setCashOutLoading(false);
      return;
    }
    const fee = (Number(data.amount) * 1.5) / 100;
    const transaction = {
      ...data,
      date: moment().format("MMMM Do YYYY, h:mm:ss a"),
      type: "Cash Out",
      from: user.mobile,
      amount: Number(data.amount) + Number(fee),
    };
    try {
      const res = await axiosInstance.post(
        "/requested-transaction-cash-out",
        transaction
      );
      if (res?.data.insertedId) {
        toast.info(
          `Cash Out Fee: ${
            (Number(data.amount) * 1.5) / 100
          } BDT. Your cash out will be success when the agent approve it`,
          {
            position: "top-center",
          }
        );
        reset();
        loadSingleUserData();
      }
    } catch (error) {
      toast.error(error?.response?.data?.message, {
        position: "top-center",
      });
    } finally {
      setCashOutLoading(false);
    }
  };

  return (
    <div className="mb-6">
      <h3 className="text-xl font-semibold mb-4 text-gray-700">Cash Out</h3>
      <div className="p-4 bg-gray-200 rounded-lg">
        <form
          onSubmit={handleSubmit(handleCashOut)}
          className="grid grid-cols-2 gap-5"
        >
          <div>
            <label className="block text-gray-700 mb-2">Amount</label>
            <input
              type="number"
              {...register("amount")}
              required
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-gray-600"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2">Agent Number</label>
            <input
              type="number"
              {...register("userNumber")}
              required
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-gray-600"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Your PIN</label>
            <input
              type="password"
              {...register("pin")}
              required
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-gray-600"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Cash Out</label>
            <input
              type="Submit"
              defaultValue={cashOutLoading ? "Processing..." : "Cash Out"}
              className=" px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 w-full"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default CashOut;
