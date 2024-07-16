import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { logInUser, user } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      await logInUser(data.mobile, data.pin);
      if (user) {
        if (user.applyFor === "User") {
          navigate("/user-dashboard");
          return;
        }
        if (user.applyFor === "Agent") {
          navigate("/agent-dashboard");
        }
        if (user.role === "Admin") {
          navigate("/admin-dashboard");
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-2">
      <div className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-md">
      <h2 className="text-3xl font-bold mb-4 text-gray-800 text-center">Welcome to MFS App</h2>
        <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
          Login
        </h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="mobile">
              Mobile Number
            </label>
            <input
              type="number"
              id="mobile"
              {...register("mobile", { required: true })}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-gray-600"
            />
            {errors.mobile && (
              <span className="text-red-500">Mobile number is required</span>
            )}
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 mb-2" htmlFor="pin">
              PIN
            </label>
            <input
              type="password"
              id="pin"
              {...register("pin", { required: true })}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-gray-600"
            />
            {errors.pin && (
              <span className="text-red-500">PIN is required</span>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-gray-800 text-white rounded-lg hover:bg-gray-700 focus:outline-none"
          >
            Login
          </button>
        </form>

        <div className="mt-4 text-center text-gray-600">
          Haven't registered yet?
          <Link
            to="/registration"
            className="text-gray-800 hover:text-gray-600 underline ml-1"
          >
            Please Register
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
