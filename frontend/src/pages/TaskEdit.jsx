import { useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import apiService from "../services/apiService";

export default function TaskEdit() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    dueDate: "",
    priority: "2",
    description: "",
  });

  useEffect(() => {
    apiService
      .getTask(id)
      .then((res) =>
        setFormData({
          title: res.data.task.title,
          dueDate: res.data.task.dueDate,
          priority: res.data.task.priority,
          description: res.data.task.description,
        })
      )
      .catch((err) => alert(err.message));
  }, []);

  const handleChange = (e) => {
    let { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDiscard = () => {
    navigate("/");
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      await apiService.updateTask(id, formData);
      navigate("/");
    } catch (err) {
      alert("Failed to update task");
    }
  };

  return (
    <div className="min-h-screen bg-slate-800 text-white">
      <Navbar />

      <div className="max-w-4xl mx-auto px-4 py-10">
        <div className="bg-slate-900 rounded-2xl shadow-lg p-6 space-y-6">
          <h1 className="text-2xl font-semibold">Edit Task</h1>

          <form onSubmit={handleSave} className="space-y-5">
            {/* Title */}
            <div className="space-y-1">
              <label htmlFor="title" className="text-sm text-gray-300">
                Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full rounded-lg bg-slate-800 border border-slate-700 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Task title"
                required
              />
            </div>

            {/* Due Date */}
            <div className="space-y-1">
              <label htmlFor="dueDate" className="text-sm text-gray-300">
                Due Date
              </label>
              <input
                type="date"
                id="dueDate"
                name="dueDate"
                value={formData.dueDate.substring(0, 10)}
                onChange={handleChange}
                className="w-full rounded-lg bg-slate-800 border border-slate-700 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Priority */}
            <div className="space-y-1">
              <label htmlFor="priority" className="text-sm text-gray-300">
                Priority
              </label>
              <select
                id="priority"
                name="priority"
                value={formData.priority}
                onChange={handleChange}
                className="w-full rounded-lg bg-slate-800 border border-slate-700 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="3">Low</option>
                <option value="2">Medium</option>
                <option value="1">High</option>
              </select>
            </div>

            {/* Description */}
            <div className="space-y-1">
              <label htmlFor="description" className="text-sm text-gray-300">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={4}
                className="w-full resize-none rounded-lg bg-slate-800 border border-slate-700 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Task description..."
              />
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-3 pt-4 border-t border-slate-700">
              <button
                type="button"
                onClick={handleDiscard}
                className="px-4 py-2 rounded-lg bg-gray-600 hover:bg-gray-700 transition"
              >
                Discard
              </button>

              <button
                type="submit"
                className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 transition"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
