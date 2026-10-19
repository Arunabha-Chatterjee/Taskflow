
import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import useGetSubtaskById from "../../hook/useSubtask/useGetSubtaskById.js";
import useUpdateSubtask from "../../hook/useSubtask/useUpdateSubtask.js";

const UpdateSubtaskForm = () => {
    const { taskId, subtaskId } = useParams();
    const navigate = useNavigate();

    const {
        subtask,
        isLoading,
        subtaskError
    } = useGetSubtaskById(taskId, subtaskId);

    const { isUpdating, update } = useUpdateSubtask();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm();

    // Populate the form when subtask data is available
    useEffect(() => {
        if (subtask) {
            reset({
                title: subtask.title || "",
                description: subtask.description || "",
                status: subtask.status || "TODO"
            });
        }
    }, [subtask, reset]);

    const onSubmit = async (data) => {
        try {
            const response = await update(
                taskId,
                subtaskId,
                data
            );

            toast.success(
                response.message || "Subtask updated successfully"
            );

            navigate(`/tasks/${taskId}`);
        } catch (error) {
            toast.error(
                error.response?.data?.message ||
                "Error updating subtask"
            );
        }
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-[#101828] text-white p-6">
                <p>Loading subtask...</p>
            </div>
        );
    }

    if (subtaskError || !subtask) {
        return (
            <div className="min-h-screen bg-[#101828] text-white p-6">
                <p className="text-red-400">
                    {subtaskError || "Subtask not found"}
                </p>

                <button
                    type="button"
                    onClick={() => navigate(`/tasks/${taskId}`)}
                    className="mt-4 px-4 py-2 rounded bg-[#232c3b] border border-gray-700"
                >
                    Back to Task
                </button>
            </div>
        );
    }

    return (
        <div className="min-h-screen w-screen bg-[#101828] text-white p-6 flex justify-center items-center">
            <div className="w-full max-w-xl mx-auto">
                <div className="mb-6">
                    <h1 className="text-2xl font-bold tracking-tight">
                        Update Subtask
                    </h1>

                    <p className="text-sm text-gray-400 mt-1">
                        Update subtask with id {subtaskId}
                    </p>
                </div>

                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-4"
                >
                    <div>
                        <label className="block mb-2 text-sm text-gray-300">
                            Subtask Title *
                        </label>

                        <input
                            type="text"
                            {...register("title", {
                                required: "Title is required"
                            })}
                            placeholder="Enter subtask title"
                            className="w-full p-3 rounded bg-[#232c3b] border border-gray-700 outline-none focus:border-indigo-500"
                        />

                        <div className="min-h-[20px]">
                            {errors.title && (
                                <p className="text-red-400 text-sm mt-1">
                                    {errors.title.message}
                                </p>
                            )}
                        </div>
                    </div>

                    <div>
                        <label className="block mb-2 text-sm text-gray-300">
                            Description
                        </label>

                        <textarea
                            rows={4}
                            {...register("description")}
                            placeholder="Enter subtask description"
                            className="w-full p-3 rounded bg-[#232c3b] border border-gray-700 outline-none focus:border-indigo-500 resize-y"
                        />
                    </div>

                    <div>
                        <label className="block mb-2 text-sm text-gray-300">
                            Status
                        </label>

                        <select
                            {...register("status")}
                            className="w-full p-3 rounded bg-[#232c3b] border border-gray-700 outline-none focus:border-indigo-500"
                        >
                            <option value="TODO">To Do</option>
                            <option value="COMPLETED">Completed</option>
                        </select>
                    </div>

                    <div className="flex gap-3 pt-2">
                        <button
                            type="button"
                            onClick={() => navigate(-1)}
                            className="px-4 py-2 rounded bg-[#232c3b] border border-gray-700 hover:bg-[#2d394b] cursor-pointer"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            disabled={isUpdating}
                            className="px-4 py-2 rounded bg-[#232c3b] border border-gray-700 hover:bg-[#2d394b] disabled:opacity-50 cursor-pointer"
                        >
                            {isUpdating ? "Updating..." : "Update Subtask"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateSubtaskForm;
