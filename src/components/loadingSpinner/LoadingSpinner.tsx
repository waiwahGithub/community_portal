const LoadingSpinner = () => {
  return (
    <div className="flex items-center fixed left-[40%] top-[40%] z-[99]">
      <div className=" animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500 z-[99]"></div>
      <div className={`opacity-25 fixed inset-0 z-40 bg-black`}></div>
    </div>
  );
};

export default LoadingSpinner;
