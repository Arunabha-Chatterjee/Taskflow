import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

import useAddSubtask from "../../hook/useSubtask/useAddSubtask";

const AddSubtaskForm = () => {
    const { taskId } = useParams();
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm({
        defaultValues: {
            title: "",
            description: "",
            status: "TODO"
        }
    });

    const { isAdding, addNewSubtask } = useAddSubtask();

    const onSubmit = async (data) => {
        try {
            const response = await addNewSubtask(taskId, data);

            reset();

            toast.success(
                response?.message || "Subtask added successfully"
            );

            navigate(`/tasks/${taskId}`);
        } catch (error) {
            toast.error(
                error.response?.data?.message ||
                "Error in adding subtask"
            );
        }
    };

    return (
        <div className="min-h-screen w-screen bg-[#101828] flex flex-col justify-center items-center text-white p-6">

            {/* Header */}
            <div className="w-full sm:w-xl mb-6">
                <h1 className="text-2xl font-bold tracking-tight">
                    Add New Subtask
                </h1>

                <p className="text-sm text-gray-400 mt-1">
                    Create a subtask for this task and manage it easily.
                </p>
            </div>

            <form
                className="w-full sm:w-xl flex flex-col gap-y-2"
                autoComplete="off"
                onSubmit={handleSubmit(onSubmit)}
            >

                {/* Title */}
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
                        placeholder="Enter subtask title"
                        className="w-full h-9 px-2 bg-[#232c3b] rounded-sm mt-1 border border-gray-700 focus:outline-none focus:border-blue-400"
                        {...register("title", {
                            required: "Title is required"
                        })}
                    />

                    <p className="text-red-400 text-xs min-h-4">
                        {errors.title?.message || ""}
                    </p>
                </div>

                {/* Description */}
                <div className="mt-2">
                    <label
                        htmlFor="description"
                        className="block mb-2 text-sm font-bold"
                    >
                        Description
                    </label>

                    <textarea
                        id="description"
                        rows="4"
                        placeholder="Enter subtask description (optional)"
                        className="w-full px-2 py-2 bg-[#232c3b] text-white rounded-sm border border-gray-700 focus:outline-none focus:border-blue-400 resize-none"
                        {...register("description")}
                    />

                    <p className="text-red-400 text-xs min-h-4">
                        {errors.description?.message || ""}
                    </p>
                </div>

                {/* Status */}
                <div className="mt-2">
                    <label
                        htmlFor="status"
                        className="block mb-2 text-sm font-bold"
                    >
                        Status
                    </label>

                    <select
                        id="status"
                        className="w-full h-9 px-2 bg-[#232c3b] text-white rounded-sm border border-gray-700 focus:outline-none focus:border-blue-400"
                        {...register("status")}
                    >
                        <option value="TODO">To Do</option>
                        <option value="COMPLETED">Completed</option>
                    </select>
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
                        disabled={isAdding}
                        className="px-4 py-2 rounded bg-[#232c3b] border border-gray-700 hover:bg-[#2d394b] cursor-pointer disabled:opacity-50"
                    >
                        {isAdding ? "Adding..." : "Add Subtask"}
                    </button>

                </div>

            </form>
        </div>
    );
};

export default AddSubtaskForm;