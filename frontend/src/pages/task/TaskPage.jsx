import { useEffect } from "react";
import TaskCard from "../../component/task/TaskCard";
import useGetTasks from "../../hook/useTask/useGetTasks.js";
import { IoMdAdd } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import useLogout from "../../hook/useAuth/useLogout.js";
import { FiLogOut } from "react-icons/fi";

const TaskPage = () => {
    const navigate = useNavigate();
    const { logout } = useLogout();

    const {
        isLoading,
        tasks,
        error,
        fetchTasks
    } = useGetTasks();

    useEffect(() => {
        fetchTasks();
    }, []);

    return (
        <div className="h-screen w-screen bg-[#101828] text-white">

            <header className="border-b border-gray-700 w-full">
                <div className="px-6 md:px-10 py-5 flex items-center justify-between gap-4">

                    <div>
                        <h1 className="text-2xl font-bold tracking-tight text-white">
                            My Tasks
                        </h1>

                        <p className="text-sm text-gray-400 mt-1">
                            Manage your tasks and stay organized
                        </p>
                    </div>

                    <div className="flex items-center gap-3">

                        {/* Add Task */}
                        <button
                            type="button"
                            title="Add Task"
                            onClick={() => navigate("/tasks/add")}
                            className="bg-[#232c3b] border border-gray-700 hover:bg-[#2d394b] cursor-pointer p-2 rounded-md text-xl text-white transition"
                        >
                            <IoMdAdd />
                        </button>

                        {/* Logout */}
                        <button
                            type="button"
                            onClick={logout}
                            className="flex items-center gap-2 bg-[#232c3b] border border-gray-700 hover:bg-[#2d394b] cursor-pointer px-3 py-2 rounded-md text-sm text-gray-200 transition"
                        >
                            <FiLogOut size={16} />
                            <span>Logout</span>
                        </button>

                    </div>
                </div>
            </header>

            <main className="w-full px-5 py-5">

                <div className="mb-5">
                    <p className="text-sm text-gray-400">
                        {tasks.length} Tasks
                    </p>
                </div>

                {isLoading && (
                    <p className="text-sm text-gray-400">
                        Loading tasks...
                    </p>
                )}

                {error && (
                    <p className="text-sm text-red-400">
                        {error}
                    </p>
                )}

                {!isLoading && !error && (
                    <div className="grid  lg:grid-cols-2 xl:grid-cols-3 gap-5">
                        {tasks.map((task) => (
                            <TaskCard
                                key={task._id}
                                task={task}
                            />
                        ))}
                    </div>
                )}

            </main>
        </div>
    );
};

export default TaskPage;