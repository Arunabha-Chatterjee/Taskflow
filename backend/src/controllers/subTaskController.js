import {
    createSubtask,
    getSubtasksByTaskId,
    updateSubtask,
    deleteSubtask,
    getSubtask
} from "../services/subTaskService.js";

export const createSubtaskController = async (req, res) => {
    try {
        const subtask = await createSubtask(
            req.userId,
            req.params.taskId,
            req.body
        );

        res.status(201).json({
            success: true,
            message: "Subtask created successfully",
            subtask
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export const getSubtaskController = async (req, res) => {
    try {
        const { taskId, subtaskId } = req.params;
        const userId = req.userId;
        

        const subtask = await getSubtask(
            userId,
            taskId,
            subtaskId
        );

        return res.status(200).json({
            success: true,
            message: "Subtask fetched successfully",
            subtask
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


export const getSubtasksController = async (req, res) => {
    try {
        const subtasks = await getSubtasksByTaskId(
            req.userId,
            req.params.taskId
        );

        res.status(200).json({
            success: true,
            subtasks
        });

    } catch (error) {
        res.status(404).json({
            success: false,
            message: error.message
        });
    }
};


export const updateSubtaskController = async (req, res) => {
    try {
        const subtask = await updateSubtask(
            req.userId,
            req.params.taskId,
            req.params.subtaskId,
            req.body
        );

        res.status(200).json({
            success: true,
            message: "Subtask updated successfully",
            subtask
        });

    } catch (error) {
        res.status(404).json({
            success: false,
            message: error.message
        });
    }
};


export const deleteSubtaskController = async (req, res) => {
    try {
        await deleteSubtask(
            req.userId,
            req.params.taskId,
            req.params.subtaskId
        );

        res.status(200).json({
            success: true,
            message: "Subtask deleted successfully"
        });

    } catch (error) {
        res.status(404).json({
            success: false,
            message: error.message
        });
    }
};