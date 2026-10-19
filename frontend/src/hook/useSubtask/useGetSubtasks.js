import { useState } from "react";
import { getSubtasks } from "../../services/subtaskService.js";

const useGetSubtasks = () => {
    const [subtasks, setSubtasks] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const fetchSubtasks = async (taskId) => {
        try {
            setIsLoading(true);

            const response = await getSubtasks(taskId);

            setSubtasks(response.subtasks);

            return response.subtasks;
        } finally {
            setIsLoading(false);
        }
    };

    

    return {
        subtasks,
        isLoading,
        fetchSubtasks
    };
};

export default useGetSubtasks;