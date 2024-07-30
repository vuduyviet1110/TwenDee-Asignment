import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUsers, setupdatePage } from "../store/userSlice";
import { RootState, AppDispatch } from "../store"; // Import RootState and AppDispatch

const Pagination: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { currentPage, totalPages } = useSelector(
    (state: RootState) => state.users
  );

  const handlePageChange = (page: number) => {
    dispatch(setupdatePage(page));
    dispatch(fetchUsers(page));
  };

  return (
    <div className="flex justify-center mt-4">
      <button
        className="px-4 py-2 mx-1 bg-blue-500 text-white rounded disabled:bg-gray-300"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Previous
      </button>
      <span className="px-4 py-2 mx-1 bg-gray-200 rounded">
        {Array.from({ length: totalPages }, (_, i) => (
          <span
            key={i}
            className={`px-4 py-2 mx-1 rounded cursor-pointer ${
              currentPage === i + 1 ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
            onClick={() => handlePageChange(i + 1)}
          >
            {i + 1}
          </span>
        ))}
      </span>
      <span className="px-4 py-2 mx-1 bg-gray-200 rounded">
        {currentPage} / {totalPages}
      </span>
      <button
        className="px-4 py-2 mx-1 bg-blue-500 text-white rounded disabled:bg-gray-300"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
