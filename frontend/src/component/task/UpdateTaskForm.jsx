import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import useGetTask from "../../hook/useTask/useGetTask.js";
import useUpdateTask from "../../hook/useTask/useUpdateTask.js";

const UpdateTaskForm = () => {
    const { taskId } = useParams();
    const navigate = useNavigate();

    const { isLoading, task, fetchTask } = useGetTask();
    const { isUpdating, editTask } = useUpdateTask();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm();

    useEffect(() => {
        const loadTask = async () => {
            try {
                const taskData = await fetchTask(taskId);

                if (!taskData) {
                    toast.error("Task not found");
                    return;
                }

                reset({
                    title: taskData.title || "",
                    description: taskData.description || "",
                    priority: taskData.priority || "LOW",
                    status: taskData.status || "TODO",
                    dueDate: taskData.dueDate
                        ? new Date(taskData.dueDate)
                            .toISOString()
                            .slice(0, 16)
                        : ""
                });
            } catch (error) {
                toast.error(
                    error.response?.data?.message || "Error fetching task"
                );
            }
        };

        loadTask();
    }, [taskId, fetchTask, reset]);

    const onSubmit = async (data) => {
        if (!data.dueDate) {
            delete data.dueDate;
        }
        try {

            const response = await editTask(taskId, data);

            toast.success(response.message || "Task updated successfully");
            navigate(`/tasks/${taskId}`);
        } catch (error) {
            console.error("Error updating task:", error.response.data.message);

            toast.error(
                error.response?.data?.message || "Error updating task"
            );
        }

    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-[#101828] text-white p-6">
                <p>Loading task...</p>
            </div>
        );
    }

    if (!task) {
        return (
            <div className="min-h-screen bg-[#101828] text-white p-6">
                <p>Task not found.</p>

                <button
                    type="button"
                    onClick={() => navigate("/")}
                    className="mt-4 px-4 py-2 rounded bg-[#232c3b] border border-gray-700"
                >
                    Back to Tasks
                </button>
            </div>
        );
    }

    return (
        <div className="min-h-screen w-screen bg-[#101828] text-white p-6 flex jusitfy-center items-center">
            <div className="min-w-xl mx-auto">
                <div className="w-full sm:w-xl mb-6">
                    <h1 className="text-2xl font-bold tracking-tight">
                        Add Task
                    </h1>

                    <p className="text-sm text-gray-400 mt-1">
                        Update task with id ${taskId}
                    </p>
                </div>

                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-4"
                >
                    {/* Title - Mandatory */}
                    <div>
                        <label className="block mb-2 text-sm text-gray-300">
                            Task Title *
                        </label>

                        <input
                            type="text"
                            {...register("title", {
                                required: "Title is required"
                            })}
                            placeholder="Enter task title"
                            className="w-full p-3 rounded bg-[#232c3b] border border-gray-700 outline-none focus:border-indigo-500"
                        />

                        {errors.title && (
                            <p className="text-red-400 text-sm mt-1">
                                {errors.title.message}
                            </p>
                        )}
                    </div>

                    {/* Description - Optional */}
                    <div>
                        <label className="block mb-2 text-sm text-gray-300">
                            Description
                        </label>

                        <textarea
                            rows={4}
                            {...register("description")}
                            placeholder="Enter task description"
                            className="w-full p-3 rounded bg-[#232c3b] border border-gray-700 outline-none focus:border-indigo-500 resize-y"
                        />
                    </div>

                    {/* Priority and Status - Side by Side */}
                    <div className="grid grid-cols-2 gap-4">

                        {/* Priority */}
                        <div>
                            <label className="block mb-2 text-sm text-gray-300">
                                Priority
                            </label>

                            <select
                                {...register("priority")}
                                className="w-full p-3 rounded bg-[#232c3b] border border-gray-700 outline-none focus:border-indigo-500"
                            >
                                <option value="LOW">Low</option>
                                <option value="MEDIUM">Medium</option>
                                <option value="HIGH">High</option>
                            </select>
                        </div>

                        {/* Status */}
                        <div>
                            <label className="block mb-2 text-sm text-gray-300">
                                Status
                            </label>

                            <select
                                {...register("status")}
                                className="w-full p-3 rounded bg-[#232c3b] border border-gray-700 outline-none focus:border-indigo-500"
                            >
                                <option value="TODO">To Do</option>
                                <option value="IN_PROGRESS">In Progress</option>
                                <option value="COMPLETED">Completed</option>
                            </select>
                        </div>

                    </div>

                    {/* Due Date - Optional */}
                    <div>
                        <label className="block mb-2 text-sm text-gray-300">
                            Due Date and Time
                        </label>

                        <input
                            type="datetime-local"
                            {...register("dueDate")}
                            className="w-full p-3 rounded bg-[#232c3b] border border-gray-700 outline-none focus:border-indigo-500"
                        />
                    </div>

                    {/* Buttons */}
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
                            className="px-4 py-2 rounded bg-[#232c3b] border border-gray-700 hover:bg-[#2d394b] cursor-pointer"                        >
                            {isUpdating ? "Updating..." : "Update Task"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );

};

export default UpdateTaskForm;