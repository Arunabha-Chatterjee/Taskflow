import { useState } from "react";
import { deleteSubtask } from "../../services/subtaskService.js";

const useDeleteSubtask = () => {
    const [isDeleting, setIsDeleting] = useState(false);

    const remove = async (taskId, subtaskId) => {
        try {
            setIsDeleting(true);

            const response = await deleteSubtask(taskId, subtaskId);

            return response;

        } catch (error) {
            throw error;
        } finally {
            setIsDeleting(false);
        }
    };

    return {
        isDeleting,
        remove
    };
};

export default useDeleteSubtask;