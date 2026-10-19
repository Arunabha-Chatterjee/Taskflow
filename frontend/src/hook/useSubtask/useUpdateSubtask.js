import { useState } from "react";
import { updateSubtask } from "../../services/subtaskService.js";

const useUpdateSubtask = () => {
    const [isUpdating, setIsUpdating] = useState(false);

    const update = async (taskId, subtaskId, data) => {
        try {
            setIsUpdating(true);

            const response = await updateSubtask(
                taskId,
                subtaskId,
                data
            );

            return response;

        } catch (error) {
            throw error;
        } finally {
            setIsUpdating(false);
        }
    };

    return {
        isUpdating,
        update
    };
};

export default useUpdateSubtask;