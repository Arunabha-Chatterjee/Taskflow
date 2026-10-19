import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import useCreateTask from "../../hook/useTask/useCreateTask.js";
import { useNavigate } from "react-router-dom";

const TaskForm = () => {
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm();

    const { isCreating, addTask } = useCreateTask();

    const onSubmit = async (data) => {
        try {

            if (!data.dueDate) {
                delete data.dueDate;
            }
            const response = await addTask(data);
            reset();

            toast.success(
                response.message || "Task created successfully"
            );

            navigate("/");
        } catch (error) {
            toast.error(
                error.response?.data?.message ||
                "Error in creating task"
            );
            console.log(error.response?.data);
        }
    };

    return (
        <div className="min-h-screen w-screen bg-[#101828] flex flex-col justify-center items-center text-white p-6">

            {/* Header */}
            <div className="w-full sm:w-xl mb-6">
                <h1 className="text-2xl font-bold tracking-tight">
                    Add New Task
                </h1>

                <p className="text-sm text-gray-400 mt-1">
                    Create a new task and manage it easily.
                </p>
            </div>

            <form
                className="w-full sm:w-xl flex flex-col gap-y-2"
                autoComplete="off"
                onSubmit={handleSubmit(onSubmit)}
            >

                {/* Title - Mandatory */}
                <div>
                    <label
                        htmlFor="title"
                        className="text-sm font-bold tracking-wider"
                    >
                        Title *
                    </label>

                    <input
                        id="title"
                        type="text"
                        placeholder="Enter task title"
                        className="w-full h-9 px-2 bg-[#232c3b] rounded-sm mt-1 border border-gray-700 focus:outline-none focus:border-blue-400"
                        {...register("title", {
                            required: "Title is required"
                        })}
                    />

                    <p className="text-red-400 text-xs min-h-4">
                        {errors.title?.message || ""}
                    </p>
                </div>

                {/* Description - Optional */}
                <div className="mt-2">
                    <label
                        htmlFor="description"
                        className="text-sm font-bold"
                    >
                        Description
                    </label>

                    <textarea
                        id="description"
                        rows={4}
                        placeholder="Enter task description"
                        className="w-full px-2 py-2 mt-1 bg-[#232c3b] text-white rounded-sm border border-gray-700 placeholder:text-gray-500 resize-none focus:outline-none focus:border-blue-400"
                        {...register("description")}
                    />
                </div>

                {/* Priority and Status */}
                <div className="grid grid-cols-2 gap-4 mt-2">

                    {/* Priority */}
                    <div>
                        <label
                            htmlFor="priority"
                            className="block mb-2 text-sm font-bold"
                        >
                            Priority
                        </label>

                        <select
                            id="priority"
                            defaultValue="LOW"
                            className="w-full h-9 px-2 bg-[#232c3b] text-white rounded-sm border border-gray-700 focus:outline-none focus:border-blue-400"
                            {...register("priority")}
                        >
                            <option value="LOW">Low</option>
                            <option value="MEDIUM">Medium</option>
                            <option value="HIGH">High</option>
                        </select>
                    </div>

                    {/* Status */}
                    <div>
                        <label
                            htmlFor="status"
                            className="block mb-2 text-sm font-bold"
                        >
                            Status
                        </label>

                        <select
                            id="status"
                            defaultValue="TODO"
                            className="w-full h-9 px-2 bg-[#232c3b] text-white rounded-sm border border-gray-700 focus:outline-none focus:border-blue-400"
                            {...register("status")}
                        >
                            <option value="TODO">To Do</option>
                            <option value="IN_PROGRESS">
                                In Progress
                            </option>
                            <option value="COMPLETED">
                                Completed
                            </option>
                        </select>
                    </div>

                </div>

                {/* Due Date - Optional */}
                <div className="mt-2">
                    <label
                        htmlFor="dueDate"
                        className="text-sm font-bold"
                    >
                        Due Date and Time
                    </label>

                    <input
                        id="dueDate"
                        type="datetime-local"
                        className="w-full h-9 px-2 mt-1 bg-[#232c3b] text-white rounded-sm border border-gray-700 focus:outline-none focus:border-blue-400"
                        {...register("dueDate")}
                    />
                </div>

                {/* Buttons */}
                <div className="flex gap-3 mt-3">

                    <button
                        type="button"
                        onClick={() => navigate(-1)}
                        className="px-4 py-2 rounded bg-[#232c3b] border border-gray-700 hover:bg-[#2d394b] cursor-pointer"
                    >
                        Cancel
                    </button>

                    <button
                        type="submit"
                        disabled={isCreating}
                        className="px-4 py-2 rounded bg-[#232c3b] border border-gray-700 hover:bg-[#2d394b] cursor-pointer disabled:opacity-50"
                    >
                        {isCreating ? "Creating..." : "Add Task"}
                    </button>

                </div>

            </form>
        </div>
    );
};

export default TaskForm;
