import { useState, useCallback } from "react";
import { getTaskById } from "../../services/taskService.js";

const useGetTask = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [task, setTask] = useState(null);

    const fetchTask = useCallback(async (id) => {
        try {
            setIsLoading(true);

            const response = await getTaskById(id);
            setTask(response.task);

            return response.task;
        } finally {
            setIsLoading(false);
        }
    }, []);

    return {
        isLoading,
        task,
        fetchTask
    };
};

export default useGetTask;