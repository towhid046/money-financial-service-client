import LoadingState from "../../../components/shared/LoadingState/LoadingState";
import useSecureData from "../../../hooks/useSecureData";

const UserManagement = () => {
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
        return "text-yellow-600";
      case "Blocked":
        return "text-red-600";
      default:
        return "";
    }
  };


  const handleActivateUser = () =>{}

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
              <th className="py-2 px-4">Email</th>
              <th className="py-2 px-4">Apply'For</th>
              <th className="py-2 px-4">Status</th>
              <th className="py-2 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-b">
                <td className="py-2 px-4 min-w-48">{user.name}</td>
                <td className="py-2 px-4">{user.email}</td>
                <td className="py-2 px-4">{user.applyFor}</td>
                <td className={`py-2 px-4 ${getStatusClass(user.status)}`}>
                  {user.status}
                </td>
                <td className="items-center py-2 px-4  flex space-x-2 justify-center">
                  <button
                    onClick={() =>
                      handleActivateUser(user.email, user.applyFor)
                    }
                    className="px-3 py-1.5 bg-gray-800 text-white rounded-lg hover:bg-gray-700"
                  >
                    Activate
                  </button>
                  <button className="px-3 py-1.5 bg-red-600 text-white rounded-lg hover:bg-red-500">
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
