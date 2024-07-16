const LoadingState = () => {
  return (
    <div className="min-h-[60vh] flex items-center justify-center bg-gray-100">
      <div className="flex flex-col items-center">
        <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200  h-14 w-14 mb-4"></div>
        <p className="text-gray-600 text-lg">Loading...</p>
      </div>
    </div>
  );
};

export default LoadingState;
