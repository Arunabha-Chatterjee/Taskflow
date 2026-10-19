import { FiEdit2, FiTrash2 } from "react-icons/fi";
import { useNavigate, useParams } from "react-router-dom";

const SubtaskCard = ({ subtask }) => {
    const navigate = useNavigate();
    const { taskId } = useParams();

    return (
        <div
            className={
                "group relative bg-[#182235] border border-gray-700 " +
                "p-5 text-white " +
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
                    onClick={() =>
                        navigate(
                            `/tasks/${taskId}/subtasks/${subtask._id}/update`
                        )
                    }
                    className="w-7 h-7 flex items-center justify-center rounded bg-[#232c3b] border border-gray-700 hover:bg-[#2d394b] cursor-pointer"
                >
                    <FiEdit2 size={14} />
                </button>

                {/* Delete button */}
                <button
                    type="button"
                    title="Delete"
                    onClick={() =>
                        navigate(
                            `/tasks/${taskId}/subtasks/${subtask._id}/delete`
                        )
                    }
                    className="w-7 h-7 flex items-center justify-center rounded bg-[#232c3b] border border-gray-700 hover:bg-[#2d394b] cursor-pointer"
                >
                    <FiTrash2 size={14} />
                </button>
            </div>

            {/* Title */}
            <h2 className="text-lg font-bold">
                {subtask.title}
            </h2>

            {/* Description */}
            <p className="text-sm text-gray-400 mt-1 line-clamp-1">
                {subtask.description || "No description"}
            </p>

            {/* Status */}
            <div className="mt-2.5 text-sm">
                <p
                    className={
                        subtask.status === "TODO"
                            ? "text-red-600"
                            : subtask.status === "IN_PROGRESS"
                                ? "text-yellow-400"
                                : subtask.status === "COMPLETED"
                                    ? "text-green-400"
                                    : "text-gray-200"
                    }
                >
                    {subtask.status}
                </p>
            </div>
        </div>
    );
};

export default SubtaskCard;
