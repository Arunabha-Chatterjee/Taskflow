import { useState } from "react";
import { createTask } from "../../services/taskService.js";

const useCreateTask = () => {
    const [isCreating, setIsCreating] = useState(false);

    const addTask = async (taskData) => {
        try {
            setIsCreating(true);

            const response = await createTask(taskData);

            return response;
        } finally {
            setIsCreating(false);
        }
    };

    return {
        isCreating,
        addTask
    };
};

export default useCreateTask;