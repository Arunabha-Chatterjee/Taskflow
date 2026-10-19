import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

import useGetSubtaskById from "../../hook/useSubtask/useGetSubtaskById.js";
import useDeleteSubtask from "../../hook/useSubtask/useDeleteSubtask.js";

const DeleteSubtask = () => {
    const { taskId, subtaskId } = useParams();
    const navigate = useNavigate();

    const {
        isLoading,
        subtask,
        subtaskError
    } = useGetSubtaskById(taskId, subtaskId);

    const {
        isDeleting,
        remove
    } = useDeleteSubtask();

    const handleDelete = async () => {
        try {
            const response = await remove(
                taskId,
                subtaskId
            );

            toast.success(response.message);

            navigate(`/tasks/${taskId}`);
        } catch (error) {
            
            toast.error(
                error.response?.data?.message ||
                "Error in deleting subtask"
            );
        }
    };

    if (isLoading) {
        return (
            <div className="w-screen h-screen bg-[#101828] flex justify-center items-center text-white">
                Loading...
            </div>
        );
    }

    if (subtaskError || !subtask) {
        return (
            <div className="w-screen h-screen bg-[#101828] flex justify-center items-center text-white">
                <p>
                    {subtaskError || "Subtask not found"}
                </p>
            </div>
        );
    }

    return (
        <div
            className={
                "w-screen h-screen bg-[#101828] " +
                "flex flex-col justify-center items-center text-white"
            }
        >
            <div className="w-full sm:w-xl border border-gray-500 rounded-lg p-7">

                <h1 className="text-2xl font-bold tracking-tight">
                    Delete Subtask
                </h1>

                <div className="mt-5 bg-[#182235] rounded-md p-4">

                    <div className="text-sm text-gray-400">
                        Subtask ID
                    </div>

                    <div className="text-sm mt-1 text-gray-200 break-all">
                        {subtaskId}
                    </div>

                    <div className="text-sm text-gray-400 mt-4">
                        Subtask Title
                    </div>

                    <div className="text-lg font-medium mt-1 text-white">
                        {subtask.title}
                    </div>

                </div>

                <p className="text-sm text-gray-400 mt-5">
                    Are you sure you want to delete this subtask?
                </p>

                <div className="flex gap-3 mt-6">

                    <button
                        type="button"
                        onClick={() => navigate(-1)}
                        disabled={isDeleting}
                        className={
                            "bg-[#232c3b] cursor-pointer w-1/2 h-9.5 " +
                            "rounded-md border border-gray-700 " +
                            "hover:bg-[#2d394b] " +
                            "disabled:cursor-not-allowed"
                        }
                    >
                        Cancel
                    </button>

                    <button
                        type="button"
                        onClick={handleDelete}
                        disabled={isDeleting}
                        className={
                            "bg-red-600 cursor-pointer w-1/2 h-9.5 " +
                            "rounded-md hover:bg-red-700 " +
                            "font-medium " +
                            "disabled:bg-gray-600 disabled:cursor-not-allowed"
                        }
                    >
                        {isDeleting ? "Deleting..." : "Delete"}
                    </button>

                </div>
            </div>
        </div>
    );
};

export default DeleteSubtask;