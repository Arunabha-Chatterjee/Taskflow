import { useState } from "react";
import { getSubtaskById } from "../../services/subtaskService.js";
import { useEffect } from "react";

const useGetSubtaskById = (taskId, subtaskId) => {
    const [subtask, setSubtask] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const fetchSubtask = async (taskId, subtaskId) => {
        try {
            setIsLoading(true);

            const response = await getSubtaskById(taskId, subtaskId);
            
            setSubtask(response.subtask);

            return response.subtask;

        } catch (error) {
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchSubtask(taskId, subtaskId);
    }, [taskId, subtaskId]);


    return {
        subtask,
        isLoading,
        fetchSubtask
    };
};

export default useGetSubtaskById;