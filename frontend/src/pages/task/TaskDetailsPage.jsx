import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

import useGetTask from "../../hook/useTask/useGetTask.js";
import useGetSubtasks from "../../hook/useSubtask/useGetSubtasks.js";

import TaskInfo from "../../component/task/TaskInfo.jsx";
import SubtaskCard from "../../component/subTask/SubtaskCard.jsx";

const TaskDetailsPage = () => {
    const { taskId } = useParams();
    const navigate = useNavigate();

    const {
        task,
        isLoading: isTaskLoading,
        fetchTask
    } = useGetTask();

    const {
        subtasks,
        isLoading: isSubtaskLoading,
        fetchSubtasks
    } = useGetSubtasks();

    useEffect(() => {
        if (!taskId) return;

        const loadTaskDetails = async () => {
            try {
                await fetchTask(taskId),
                await fetchSubtasks(taskId)
            } catch (error) {
                toast.error(
                    error.response?.data?.message ||
                    "Error loading task details"
                );
            }
        };

        loadTaskDetails();
    }, [taskId]);

    if (isTaskLoading || isSubtaskLoading) {
        return (
            <div className="min-h-screen bg-[#101828] text-white flex justify-center items-center">
                Loading task details...
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
                    className="text-blue-400 mt-4"
                >
                    Back to Tasks
                </button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#101828] text-white p-6 md:p-10">
            <div className="max-w-6xl mx-auto">

                {/* Back Button */}
                <button
                    type="button"
                    onClick={() => navigate("/")}
                    className="text-blue-400 hover:text-blue-300 mb-6"
                >
                    ← Back to Tasks
                </button>

                {/* Main Task Information */}
                <TaskInfo
                    task={task}
                    onUpdate={() =>
                        navigate(`/tasks/${taskId}/update`)
                    }
                    onAddSubtask={() =>
                        navigate(`/tasks/${taskId}/subtasks/add`)
                    }
                />

                {/* Subtask List */}
                <h2 className="text-xl font-bold mt-8 mb-5">
                    Subtasks ({subtasks.length})
                </h2>

                {subtasks.length === 0 ? (
                    <div className="bg-[#182235] border border-gray-700 rounded-xl p-8 text-center">
                        <p className="text-gray-400">
                            No subtasks yet.
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                        {subtasks.map((subtask) => (
                            <SubtaskCard
                                key={subtask._id}
                                subtask={subtask}
                            />
                        ))}
                    </div>
                )}

            </div>
        </div>
    );
};

export default TaskDetailsPage;