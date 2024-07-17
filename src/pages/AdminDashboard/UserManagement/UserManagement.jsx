import { toast } from "react-toastify";
import LoadingState from "../../../components/shared/LoadingState/LoadingState";
import useAxios from "../../../hooks/useAxios";
import useSecureData from "../../../hooks/useSecureData";

const UserManagement = () => {
  const axiosInstance = useAxios();
  const {
    data: users,
    isLoading,
    isError,
    error,
    refetch,
  } = useSecureData(["users"], "/users");

  const getStatusClass = (status) => {
    switch (status) {
      case "Active":
        return "text-green-600";
      case "Pending":
        return "text-yellow-500";
      case "Blocked":
        return "text-red-600";
      default:
        return "";
    }
  };

  const handleActivateUser = async (email, applyFor) => {
    try {
      const res = await axiosInstance.put(
        `/activate-user?email=${email}&role=${applyFor}`
      );
      if (res.data.modifiedCount) {
        toast.success("User Activated Successfully!", {
          position: "top-center",
        });
        refetch();
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleBlockedUser = async (email) => {
    try {
      const res = await axiosInstance.patch(`/blocked-user?email=${email}`);
      if (res.data.modifiedCount) {
        toast.success("User Blocked Successfully!", {
          position: "top-center",
        });
        refetch();
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  if (isLoading) {
    return <LoadingState />;
  }

  return (
    <div>
      <h3 className="text-xl font-semibold mb-4 text-gray-700">
        User Management
      </h3>
      <div className="p-4 bg-gray-200 rounded-lg overflow-x-auto">
        <table className="min-w-full bg-white text-center">
          <thead>
            <tr className="border-b">
              <th className="py-2 px-4">Name</th>
              <th className="py-2 px-4">Phone</th>
              <th className="py-2 px-4">Apply'For</th>
              <th className="py-2 px-4">Status</th>
              <th className="py-2 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id} className="border-b">
                <td className="py-2 px-4 min-w-48">{user.name}</td>
                <td className="py-2 px-4">{user.mobile}</td>
                <td className="py-2 px-4">{user.applyFor}</td>
                <td className={`py-2 px-4 ${getStatusClass(user.status)}`}>
                  {user.status}
                </td>
                <td className="items-center py-2 px-4  flex space-x-2 justify-center">
                  <button
                    onClick={() =>
                      handleActivateUser(user.email, user.applyFor)
                    }
                    className="px-3 py-1.5 bg-gray-800 text-white rounded-lg disabled:bg-gray-200 disabled:cursor-not-allowed hover:bg-gray-700"
                    disabled={user.status === "Active"}
                  >
                    Activate
                  </button>
                  <button
                    onClick={() => handleBlockedUser(user.email)}
                    disabled={user.status === "Blocked"}
                    className="px-3 py-1.5 bg-red-600 text-white disabled:bg-gray-200 disabled:cursor-not-allowed rounded-lg hover:bg-red-500"
                  >
                    Block
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserManagement;
