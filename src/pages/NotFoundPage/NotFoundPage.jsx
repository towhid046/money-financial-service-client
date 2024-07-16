
import { Link } from 'react-router-dom';
const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-2xl text-center w-full max-w-lg">
        <h1 className="text-6xl font-bold mb-4 text-gray-800">404</h1>
        <h2 className="text-2xl font-semibold mb-4 text-gray-700">Page Not Found</h2>
        <p className="text-gray-600 mb-6">Sorry, the page you are looking for does not exist.</p>
        <Link to="/" className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700">
          Go Home
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;