import { useState } from "react";
import { getAllTasks } from "../../services/taskService.js";

const useGetTasks = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [tasks, setTasks] = useState([]);
    const [error, setError] = useState(null);

    const fetchTasks = async () => {
        try {
            setIsLoading(true);
            setError(null);

            const response = await getAllTasks();

            setTasks(response.data);
            console.log(response.data)

            return response;

        } catch (error) {
            setError(
                error.response?.data?.message ||
                "Error in fetching tasks"
            );
        } finally {
            setIsLoading(false);
        }
    };

    return {
        isLoading,
        tasks,
        error,
        fetchTasks
    };
};

export default useGetTasks;