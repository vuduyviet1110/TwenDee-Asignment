import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchUsers } from "./store/userSlice";
import UserTable from "./components/UserTable";
import Pagination from "./components/Pagination";
import { AppDispatch } from "./store";
const App = () => {
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUsers(1));
  }, [dispatch]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4 hover:tracking-widest transition-all ease-in-out duration-300">
        Random Users
      </h1>
      <UserTable />
      <Pagination />
    </div>
  );
};

export default App;
