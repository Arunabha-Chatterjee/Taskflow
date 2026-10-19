import { FiEdit2, FiTrash2 } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const TaskCard = ({ task }) => {
    const navigate = useNavigate();

    // Open task details and subtasks
    const handleCardClick = () => {
        navigate(`/tasks/${task._id}`);
    };

    return (
        <div
            onClick={handleCardClick}
            className={
                "group relative bg-[#182235] border border-gray-700 " +
                "p-5 text-white cursor-pointer " +
                "hover:bg-[#1d293d] transition-colors"
            }
        >
            {/* Update & Delete Icons */}
            <div
                className="
                    hidden
                    absolute top-3 right-3
                    gap-1
                    group-hover:flex
                "
            >
                {/* Update button */}
                <button
                    type="button"
                    title="Update"
                    onClick={(event) => {
                        event.stopPropagation();
                        navigate(`/tasks/update/${task._id}`);
                    }}
                    className="w-7 h-7 flex items-center justify-center rounded bg-[#232c3b] border border-gray-700 hover:bg-[#2d394b] cursor-pointer"
                >
                    <FiEdit2 size={14} />
                </button>

                {/* Delete button */}
                <button
                    type="button"
                    title="Delete"
                    onClick={(event) => {
                        event.stopPropagation();
                        navigate(`/tasks/delete/${task._id}`);
                    }}
                    className="w-7 h-7 flex items-center justify-center rounded bg-[#232c3b] border border-gray-700 hover:bg-[#2d394b] cursor-pointer"
                >
                    <FiTrash2 size={14} />
                </button>
            </div>

            {/* Title */}
            <h2 className="text-lg font-bold">
                {task.title}
            </h2>

            {/* Description */}
            <p className="text-sm text-gray-400 mt-1 line-clamp-1">
                {task.description || "No description"}
            </p>

            {/* Task Details */}
            <div className="flex flex-wrap gap-4 mt-2.5 text-sm">

                {/* Status */}
                <p
                    className={
                        task.status === "TODO"
                            ? "text-red-600"
                            : task.status === "IN_PROGRESS"
                                ? "text-yellow-400"
                                : task.status === "COMPLETED"
                                    ? "text-green-400"
                                    : "text-gray-200"
                    }
                >
                    {task.status}
                </p>

                {/* Priority */}
                <p
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
                </p>

                {/* Due Date */}
                <p className="text-gray-200">
                    {task.dueDate
                        ? `${new Date(task.dueDate).toLocaleDateString(
                            "en-IN",
                            {
                                day: "2-digit",
                                month: "short",
                                year: "numeric",
                            }
                        )} - ${new Date(task.dueDate).toLocaleTimeString(
                            "en-IN",
                            {
                                hour: "2-digit",
                                minute: "2-digit",
                                hour12: true,
                            }
                        )}`
                        : "No due date"}
                </p>

            </div>
        </div>
    );
};

export default TaskCard;