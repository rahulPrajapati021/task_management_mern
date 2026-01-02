import { EllipsisVertical } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { priorityString } from "../utils/PriorityMapper";
import apiService from "../services/apiService";

export default function SingleTask({ task, refreshList }) {
  const navigator = useNavigate();
  const handleNavigator = () => {
    navigator(`task/${task._id}`);
  };
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div className="flex items-center justify-between gap-4 p-4 bg-gray-800 text-white border border-gray-200 rounded-lg shadow-2xl hover:shadow-md transition">
      {/* Left section: Title & due date */}
      <div className="flex flex-col cursor-pointer" onClick={handleNavigator}>
        <h2 className="text-lg font-semibold">{task.title}</h2>
        <p className="text-sm text-gray-500">
          Due: {new Date(task.dueDate).toLocaleDateString()}
        </p>
      </div>

      {/* Right section: Priority & Status */}
      <div className="flex items-center gap-3">
        {/* Priority */}
        <span
          className={`px-3 py-1 text-sm font-medium rounded-lg
            ${
              task.priority == 1
                ? "bg-red-700 text-red-300"
                : task.priority == 2
                ? "bg-yellow-300 text-yellow-700"
                : "bg-green-700 text-white"
            }`}
        >
          {priorityString(task.priority).toString()}
        </span>

        {/* Status */}
        <span
          className={`flex items-center justify-center px-3 py-1 rounded-lg text-white
            ${task.status ? "bg-green-500" : "bg-gray-400"}`}
        >
          {task.status ? "Done" : "Pending"}
        </span>

        <div className="relative">
          <div onClick={() => setShowMenu((prev) => !prev)}>
            <EllipsisVertical />
          </div>
          {showMenu ? <TaskMenu refreshList={refreshList} closeForm={() => setShowMenu(prev => !prev)} taskId={task._id} /> : ""}
        </div>
      </div>
    </div>
  );
}

function TaskMenu({ taskId,refreshList, closeForm }) {
  const navigate = useNavigate();
  const handleMarkComplete = () => {
    apiService
      .markComplete(taskId)
      .then((res) => {
        refreshList()
        closeForm();
      })
      .catch((err) => console.log(err));
  };
  const handleEdit = () => {
    navigate(`/editTask/${taskId}`);
  };
  const handleDelete = () => {
    apiService
      .deleteTask(taskId)
      .then((res) => {
        refreshList()
        closeForm();
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="absolute right-0 top-full mt-2 w-40 rounded-lg bg-white text-black p-1 shadow-lg z-50">
      <button
        onClick={handleMarkComplete}
        className="w-full rounded-md px-3 py-2 text-left text-sm hover:bg-slate-100"
      >
        Mark Complete
      </button>
      <button
        onClick={handleEdit}
        className="w-full rounded-md px-3 py-2 text-left text-sm hover:bg-slate-100"
      >
        Edit
      </button>
      <button
        onClick={handleDelete}
        className="w-full rounded-md px-3 py-2 text-left text-sm text-red-600 hover:bg-red-100"
      >
        Delete
      </button>
    </div>
  );
}
