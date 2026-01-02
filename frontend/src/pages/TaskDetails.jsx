import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import apiService from "../services/apiService";
import Navbar from "../components/Navbar";
import { Undo2 } from "lucide-react";
import { priorityString } from "../utils/PriorityMapper";

export default function TaskDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [error, setError] = useState(null);
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    apiService
      .getTask(id)
      .then((res) => setTask(res.data.task))
      .catch(() => setError("Task not found"))
      .finally(() => setLoading(false));
  }, [id]);

  return (
    <div className="min-h-screen bg-slate-700 text-white">
      <Navbar />

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div
          className="px-4 py-2 bg-gray-800 rounded-lg inline-block cursor-pointer"
          onClick={() => navigate("/")}
        >
          <Undo2 />
        </div>
        {loading && <p className="text-center">Loading...</p>}
        {!loading && task && (
          <Task
            task={task}
            onDelete={() => navigate("/")}
            onUpdate={(updatedTask) => setTask(updatedTask)}
            onEdit={() => navigate(`/editTask/${task._id}`)}
          />
        )}
        {!loading && !task && <Error msg={error} />}
      </div>
    </div>
  );
}

function Error({ msg }) {
  return <h1 className="text-center text-red-400 text-xl">{msg}</h1>;
}

function Task({ task, onDelete, onUpdate, onEdit }) {
  const handleMarkComplete = async () => {
    try {
      const res = await apiService.markComplete(task._id);
      onUpdate(res.data.task);
    } catch (err) {
      alert("Failed to update task");
    }
  };

  const handleEditTask = async () => {
    onEdit();
  };

  const handleDelete = async () => {
    const confirm = window.confirm(
      "Are you sure you want to delete this task?"
    );
    if (!confirm) return;

    try {
      await apiService.deleteTask(task._id);
      onDelete();
    } catch (err) {
      alert("Failed to delete task");
    }
  };

  return (
    <div className="bg-gray-800 rounded-2xl shadow-lg p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl font-semibold">{task.title}</h1>

        <div className="flex items-center gap-3">
          {/* Priority */}
          <span
            className={`px-3 py-1 text-sm font-medium rounded-lg
              ${
                priorityString(task.priority) === "HIGH"
                  ? "bg-red-500/20 text-red-400"
                  : priorityString(task.priority) === "MEDIUM"
                  ? "bg-yellow-500/20 text-yellow-400"
                  : "bg-green-500/20 text-green-400"
              }`}
          >
            {priorityString(task.priority)}
          </span>

          {/* Status */}
          <span
            className={`px-3 py-1 text-sm rounded-lg
              ${task.status ? "bg-green-600" : "bg-gray-500"}`}
          >
            {task.status ? "Completed" : "Pending"}
          </span>

          {!task.status && (
            <button
              onClick={handleMarkComplete}
              className="px-4 py-2 cursor-pointer rounded-lg bg-green-600 hover:bg-green-700 transition"
            >
              Mark Complete
            </button>
          )}
        </div>
      </div>

      {/* Meta */}
      <div className="text-sm text-gray-400">
        Due Date:{" "}
        <span className="text-gray-200">
          {new Date(task.dueDate).toLocaleDateString()}
        </span>
      </div>

      {/* Description */}
      <div className="bg-slate-700 rounded-lg p-4 text-gray-200 leading-relaxed">
        {task.description || "No description provided."}
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-3 pt-4 border-t border-slate-700">
        <button
          onClick={handleEditTask}
          className="px-4 py-2 cursor-pointer rounded-lg bg-blue-600 hover:bg-blue-700 transition"
        >
          Edit
        </button>

        <button
          onClick={handleDelete}
          className="px-4 py-2 cursor-pointer rounded-lg bg-red-400 hover:bg-red-500 transition"
        >
          Delete Task
        </button>
      </div>
    </div>
  );
}
