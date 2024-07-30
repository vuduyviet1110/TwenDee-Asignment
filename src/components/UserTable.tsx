import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { sortUsers } from "../store/userSlice";
import LoadingPage from "./Loading";
import { TiArrowSortedDown, TiArrowSortedUp } from "react-icons/ti";
import { RootState, AppDispatch } from "../store"; // Import RootState and AppDispatch

const UserTable: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const [isSortedFullName, setisSortedFullName] = useState(false);
  const [isSortedUserName, setisSortedUserName] = useState(false);
  const { users, loading, error } = useSelector(
    (state: RootState) => state.users
  );
  const currentPage = useSelector(
    (state: RootState) => state.users.currentPage
  );

  const handleSort = (field: "username" | "fullName") => {
    if (field === "username") {
      setisSortedUserName(true);
      setisSortedFullName(false);
    } else if (field === "fullName") {
      setisSortedFullName(true);
      setisSortedUserName(false);
    }
    dispatch(sortUsers(field));
  };

  if (loading) return <LoadingPage />;
  if (error) return <div>Error: {error}</div>;

  return (
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-50">
        <tr>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer">
            No
          </th>
          <th
            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
            onClick={() => handleSort("fullName")}
          >
            <div className="flex">
              <div>Full Name</div>
              {!isSortedFullName && (
                <span className="ml-2">
                  <TiArrowSortedUp />
                </span>
              )}
              {isSortedFullName && (
                <span className="ml-2">
                  <TiArrowSortedDown />
                </span>
              )}
            </div>
          </th>
          <th
            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
            onClick={() => handleSort("username")}
          >
            <div className="flex">
              <div>User Name</div>
              {!isSortedUserName && (
                <span className="ml-2">
                  <TiArrowSortedUp />
                </span>
              )}
              {isSortedUserName && (
                <span className="ml-2">
                  <TiArrowSortedDown />
                </span>
              )}
            </div>
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Thumbnail
          </th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {users.map((user, index) => (
          <tr key={index}>
            <td className="px-6 py-4 whitespace-nowrap">
              {currentPage * 10 + index + 1 - 10}
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              {`${user.name.title} ${user.name.first} ${user.name.last}`}
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              {user.login.username}
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <img
                src={user.picture.thumbnail}
                alt="User thumbnail"
                className="h-10 w-10 rounded-full"
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default UserTable;
