import { FaRegUserCircle } from "react-icons/fa";
import { Tooltip } from "react-tooltip";
import useAuth from "./../../../hooks/useAuth";

const Navbar = () => {
  const { user } = useAuth();
  return (
    <nav>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">
            Hey, <em>{user?.name}</em>
          </h2>
        </div>
        <div className="flex gap-2 items-center">
          <button className="px-3 py-1.5 bg-red-600 text-white rounded-lg hover:bg-red-500">
            Logout
          </button>
          <FaRegUserCircle
            data-tooltip-id="my-tooltip"
            data-tooltip-content={user?.name}
            title="Towhid Morol"
            className="cursor-pointer text-3xl text-gray-600 "
          />
        </div>
      </div>
      <Tooltip id="my-tooltip" />
    </nav>
  );
};

export default Navbar;
