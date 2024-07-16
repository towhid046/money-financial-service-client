import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className="min-h-screen bg-gray-800 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Login</h2>

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
