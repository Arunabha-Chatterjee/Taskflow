import { FiEdit2, FiTrash2, FiPlus, FiLogOut } from "react-icons/fi";
import { useNavigate, useParams } from "react-router-dom";
import useLogout from "../../hook/useAuth/useLogout";

const TaskInfo = ({ task }) => {
    const navigate = useNavigate();
    const { taskId } = useParams();
    const { logout } = useLogout();

    return (
        <div className="bg-[#182235] border border-gray-700 rounded-lg text-white">

            {/* Header */}
            <header className="border-b border-gray-700 w-full">
                <div className="p-5 flex items-center justify-between gap-4">

                    <div className="min-w-0">
                        <h1 className="text-xl font-bold tracking-tight break-words">
                            {task.title}
                        </h1>

                        <p className="text-sm text-gray-400 mt-1">
                            Task Details
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={logout}
                        className="flex shrink-0 items-center gap-2 bg-[#232c3b] border border-gray-700 hover:bg-[#2d394b] px-3 py-2 rounded-md text-sm text-gray-200 transition"
                    >
                        <FiLogOut size={16} />
                        <span>Logout</span>
                    </button>

                </div>
            </header>

            {/* Task Details */}
            <div className="p-5">

                <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm">

                    <p>
                        <span className="text-gray-400">Status: </span>
                        <span className="text-gray-200">
                            {task.status?.replace("_", " ")}
                        </span>
                    </p>

                    <p>
                        <span className="text-gray-400">Priority: </span>
                        <span
                            className={
                                task.priority === "HIGH"
                                    ? "text-red-400"
                                    : task.priority === "MEDIUM"
                                        ? "text-yellow-400"
                                        : task.priority === "LOW"
                                            ? "text-green-400"
                                            : "text-gray-200"
                            }
                        >
                            {task.priority}
                        </span>
                    </p>

                    <p>
                        <span className="text-gray-400">Due date: </span>
                        <span className="text-gray-200">
                            {task.dueDate
                                ? new Date(task.dueDate).toLocaleDateString("en-IN", {
                                    day: "2-digit",
                                    month: "short",
                                    year: "numeric",
                                })
                                : "No due date"}
                        </span>
                    </p>

                </div>

                {task.description && (
                    <p className="text-sm text-gray-400 mt-3">
                        {task.description}
                    </p>
                )}

                {/* Task Actions */}
                <div className="flex flex-wrap gap-2 mt-5">

                    <button
                        type="button"
                        onClick={() => navigate(`/tasks/update/${taskId}`)}
                        className="flex items-center gap-2 px-3 py-2 text-sm bg-[#232c3b] border border-gray-700 rounded-md hover:bg-[#2d394b] transition"
                    >
                        <FiEdit2 size={14} />
                        Update
                    </button>

                    <button
                        type="button"
                        onClick={() => navigate(`/add-subtask/${taskId}`)}
                        className="flex items-center gap-2 px-3 py-2 text-sm bg-[#232c3b] border border-gray-700 rounded-md hover:bg-[#2d394b] transition"
                    >
                        <FiPlus size={15} />
                        Add Subtask
                    </button>

                    <button
                        type="button"
                        onClick={() => navigate(`/tasks/delete/${taskId}`)}
                        className="flex items-center gap-2 px-3 py-2 text-sm bg-[#232c3b] border border-gray-700 text-red-400 rounded-md hover:bg-red-500/10 hover:border-red-500/40 transition"
                    >
                        <FiTrash2 size={14} />
                        Delete
                    </button>

                </div>
            </div>
        </div>
    );
};

export default TaskInfo;
