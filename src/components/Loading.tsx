const LoadingPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-32 h-32 relative">
        <div className="w-full h-full border-8 border-gray-200 rounded-full"></div>
        <div className="w-full h-full border-8 border-blue-500 rounded-full absolute top-0 left-0 animate-spin border-t-transparent"></div>
      </div>
      <h2 className="mt-8 text-2xl font-semibold text-gray-700">Loading...</h2>
      <p className="mt-2 text-gray-500">Please wait while we fetch the data.</p>
    </div>
  );
};

export default LoadingPage;
