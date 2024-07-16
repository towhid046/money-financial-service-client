import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

function Registration() {
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
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Register</h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
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

          <div className="mb-4 relative">
            <label className="block text-gray-700 mb-2" htmlFor="pin">
              5-digit PIN
            </label>
            <input
              type={"number"}
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

          <div className="mb-4">
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

          <div className="mb-6">
            <label className="block text-gray-700 mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              {...register("email", { required: true })}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-gray-600"
            />
            {errors.email && (
              <span className="text-red-500">Email is required</span>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-gray-800 text-white rounded-lg hover:bg-gray-700 focus:outline-none"
          >
            Register
          </button>
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
