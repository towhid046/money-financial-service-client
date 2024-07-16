import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import useAxios from "./../../hooks/useAxios";
import { toast } from "react-toastify";

function Registration() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const axiosInstance = useAxios();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const res = await axiosInstance.post("/users", data);
      if (res.data.insertedId) {
        toast.success("Your account created Successfully! Please Login", {
          position: "top-center",
        });
        navigate("/login");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message, {
        position: "top-center",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-2">
      <div className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-2xl">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
          Register
        </h2>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 gap-5 md:grid-cols-2"
        >
          <div>
            <label className="block text-gray-700 mb-2" htmlFor="name">
              Name
            </label>
            <input
              type="text"
              id="name"
              {...register("name", { required: true })}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-gray-600"
            />
            {errors.name && (
              <span className="text-red-500">Name is required</span>
            )}
          </div>

          <div>
            <label className="block text-gray-700 mb-2" htmlFor="pin">
              5-digit PIN
            </label>
            <input
              type="password"
              {...register("pin", {
                required: true,
                pattern: /^\d{5}$/,
                minLength: 5,
                maxLength: 5,
              })}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-gray-600"
            />
            {errors.pin && (
              <span className="text-red-500">PIN must be a 5-digit number</span>
            )}
          </div>

          <div>
            <label className="block text-gray-700 mb-2" htmlFor="mobile">
              Mobile Number
            </label>
            <input
              type="number"
              id="mobile"
              {...register("mobile", {
                required: true,
                minLength: 11,
                maxLength: 11,
                pattern: /^\d{11}$/,
              })}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-gray-600"
            />
            {errors.mobile && (
              <span className="text-red-500">
                Mobile number must be 11 digits
              </span>
            )}
          </div>

          <div>
            <label className="block text-gray-700 mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              {...register("email", {
                required: true,
                pattern: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
              })}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-gray-600"
            />
            {errors.email && (
              <span className="text-red-500">Valid email is required</span>
            )}
          </div>

          <div className="md:col-span-2">
            <fieldset>
              <legend className="block text-gray-700 mb-2">Register As</legend>
              <div className="flex items-center">
                <input
                  type="radio"
                  id="user"
                  defaultChecked
                  {...register("userType", { required: true })}
                  value="User"
                  className="mr-2"
                />
                <label htmlFor="user" className="mr-6">
                  User
                </label>
                <input
                  type="radio"
                  id="agent"
                  {...register("userType", { required: true })}
                  value="Agent"
                  className="mr-2"
                />
                <label htmlFor="agent">Agent</label>
              </div>
              {errors.role && (
                <span className="text-red-500">Please select one role</span>
              )}
            </fieldset>
          </div>

          <div className="md:col-span-2">
            <button
              type="submit"
              className="w-full py-2 px-4 bg-gray-800 text-white rounded-lg hover:bg-gray-700 focus:outline-none"
            >
              Register
            </button>
          </div>
        </form>

        <div className="mt-4 text-center text-gray-600">
          Already registered?
          <Link
            to="/login"
            className="text-gray-800 hover:text-gray-600 underline ml-1"
          >
            Please Login
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Registration;
