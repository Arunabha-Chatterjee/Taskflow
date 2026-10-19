import { useState } from "react";
import { createSubtask } from "../../services/subtaskService"; 

const useAddSubtask = () => {
    const [isAdding, setIsAdding] = useState(false);
    const [error, setError] = useState(null);

    const addNewSubtask = async (taskId, data) => {
        setIsAdding(true);
        setError(null);

        try {
            const response = await createSubtask(taskId, data);

            return response;
        } catch (error) {
            setError(error);
            throw error;
        } finally {
            setIsAdding(false);
        }
    };

    return {
        isAdding,
        error,
        addNewSubtask
    };
};

export default useAddSubtask;