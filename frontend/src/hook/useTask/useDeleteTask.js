import { useState } from "react";
import { deleteTask } from "../../services/taskService.js";

const useDeleteTask = () => {
    const [isDeleting, setIsDeleting] = useState(false);

    const removeTask = async (id) => {
        try {
            setIsDeleting(true);

            const response = await deleteTask(id);

            return response;
        } finally {
            setIsDeleting(false);
        }
    };

    return {
        isDeleting,
        removeTask
    };
};

export default useDeleteTask;