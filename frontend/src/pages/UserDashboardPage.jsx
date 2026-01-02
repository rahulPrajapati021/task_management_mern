import { useEffect, useState } from "react";
import apiService from "../services/apiService";
import SingleTask from "../components/SingleTask";
import AddTaskForm from "../components/AddTaskForm";
import Navbar from "../components/Navbar";
import PageChange from "../components/PageChange";

export default function UserDashboardPage() {
  const [showForm, setShowForm] = useState(false);
  const [taskList, setTaskList] = useState([]);
  const [totalTask, setTotalTask] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);
  const [limit, setLimit] = useState(5);
  const fetchData = async () => {
      const res = await apiService.listTask(pageNumber, limit);
      setTaskList(res.data.taskList);
      setTotalTask(res.data.totalCount);
    };
  useEffect(() => {
    fetchData();
  }, [pageNumber, showForm]);
  return (
    <div className="h-screen bg-slate-700 flex flex-col justify-between">
      <Navbar showAddTaskForm={() => setShowForm(true)} />
      <div className="w-3xl mx-auto space-y-4 flex-1 py-2">
        {totalTask==0?<h1 className="text-red-400 text-center">"Click on Add Task button to create a task"</h1>: ""}
        {showForm ? <FormWrapper setShowForm={setShowForm} /> : ""}
        {taskList
          ? taskList.map((task) => <SingleTask refreshList={fetchData} key={task._id} task={task} />)
          : "Loading..."}
      </div>
      <PageChange totalCount={totalTask} currentPage={pageNumber} changePage={setPageNumber} />
    </div>
  );
}

function FormWrapper({ setShowForm }) {
  return (
    <div className="h-screen w-screen absolute top-0 left-0 bg-slate-700 z-10 flex justify-center items-center">
      <AddTaskForm closeForm={() => setShowForm(false)} />
    </div>
  );
}
