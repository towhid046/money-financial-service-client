import { Link } from "react-router-dom";

function Home() {
    return (
      <div className="min-h-screen  flex items-center justify-center px-2">
        <div className="bg-white p-8 rounded-lg shadow-2xl flex flex-col justify-center h-[50vh] w-full max-w-md">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Welcome to MFS App</h2>
          
          <div className="mb-4">
            <Link to='/registration'
              className="w-full py-2 inline-block text-center  px-4 bg-gray-800 text-white rounded-lg hover:bg-gray-700 focus:outline-none"
            >
              Register
            </Link>
          </div>
          
          <div>
            <Link to={'/login'}
              className="w-full inline-block text-center py-2 px-4 bg-gray-800 text-white rounded-lg hover:bg-gray-700 focus:outline-none"
            >
              Login
            </Link>
          </div>
        </div>
      </div>
    );
  }
  
  export default Home;
  