import { useForm } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";
import { toast } from "react-toastify";
import moment from "moment";
import useAxios from "../../../hooks/useAxios";
import { useState } from "react";

const CashIn = () => {
  const { register, handleSubmit, reset } = useForm();
  const { user } = useAuth();
  const axiosInstance = useAxios();
  const [cashInLoading, setCashInLoading] = useState(false);

  const handleCashIn = async (data) => {
    setCashInLoading(true);

    if (typeof Number(data.amount) !== "number") {
      toast.error("Amount must be a number", {
        position: "top-center",
      });
      setCashInLoading(false);
      return;
    }

    const transaction = {
      ...data,
      date: moment().format("MMMM Do YYYY, h:mm:ss a"),
      type: "Cash In",
      userNumber: user.mobile,
    };
    try {
      const res = await axiosInstance.post(
        "/requested-transaction-cash-in",
        transaction
      );
      if (res?.data.insertedId) {
        toast.info(
          "Your request have send, you will get the money when the Agent approve it",
          {
            position: "top-center",
          }
        );
        reset();
      }
    } catch (error) {
      toast.error(error?.response?.data?.message, {
        position: "top-center",
      });
    } finally {
      setCashInLoading(false);
    }
  };

  return (
    <div className="mb-6">
      <h3 className="text-xl font-semibold mb-4 text-gray-700">Cash In</h3>
      <div className="p-4 bg-gray-200 rounded-lg">
        <form
          onSubmit={handleSubmit(handleCashIn)}
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
            <label className="block text-gray-700 mb-2">Agent Number</label>
            <input
              {...register("from")}
              type="number"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-gray-600"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Cash In</label>
            <input
              type="Submit"
              defaultValue={cashInLoading ? "Processing..." : "Cash In"}
              className=" px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 w-full"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default CashIn;
