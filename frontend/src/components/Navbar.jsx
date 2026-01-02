import { User } from "lucide-react";
import useAuth from "../context/AuthContext";
import { useState } from "react";

export default function Navbar({ showAddTaskForm }) {
  const [showDropdown, setShowDropdown] = useState(false);
  const { logout } = useAuth();
  const handleLogout = (e) => {
    logout();
  };
  const handleShowDropdown = (e) => {
    setShowDropdown(prev => !prev)
  };
  return (
    <div className="bg-gray-800 text-white sticky top-0 flex justify-around px-10 py-2 items-center">
      <h1>Task Manager</h1>
      <div className="flex">
        <button className="mx-4 border rounded-md px-2 cursor-pointer" onClick={showAddTaskForm}>Add Task</button>

        <div id="userProfile" className="">
          <div
            className="w-10 h-10 rounded-full border-2 flex justify-center items-center cursor-pointer"
            onClick={() => handleShowDropdown()}
          >
            <User />
          </div>
          {showDropdown?
          <div className="absolute bg-slate-800 border my-2 rounded-md">
            <button className="cursor-pointer text-white px-4 py-2" onClick={handleLogout}>
              Logout
            </button>
          </div>
          :""}
        </div>
      </div>
    </div>
  );
}
