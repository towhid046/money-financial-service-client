import Navbar from "../Navbar/Navbar";

const PendingUser = ({ status }) => {
  return (
    <div className="min-h-screen  flex flex-col py-12 items-center justify-center px-2 bg-gray-100">
      <div className="bg-white p-8 rounded-lg  w-full max-w-6xl">
        <Navbar />
        <div className="text-center min-h-[60vh] flex justify-center flex-col">
          <h2 className="text-center mb-2 text-2xl text-gray-700 italic font-semibold">
            Your Account status is {status} Now
          </h2>
          <p className="text-gray-400">
            You will send or Cash out money when the Admin activate your account
          </p>
        </div>
      </div>
    </div>
  );
};

export default PendingUser;
