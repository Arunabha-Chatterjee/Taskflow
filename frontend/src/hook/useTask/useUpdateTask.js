import { useState } from "react";
import { updateTask } from "../../services/taskService.js";

const useUpdateTask = () => {
    const [isUpdating, setIsUpdating] = useState(false);

    const editTask = async (id, taskData) => {
        try {
            setIsUpdating(true);

            const response = await updateTask(id, taskData);

            return response;
        } finally {
            setIsUpdating(false);
        }
    };

    return {
        isUpdating,
        editTask
    };
};

export default useUpdateTask;