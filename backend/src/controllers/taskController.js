import {
    createTask,
    getAllTasks,
    getTaskById,
    updateTask,
    deleteTask
} from "../services/taskService.js";

export const createTaskController = async (req, res) => {
    try {
        const task = await createTask(
            req.userId,
            req.body
        );

        res.status(201).json({
            success: true,
            message: "Task created successfully",
            task
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export const getAllTasksController = async (req, res) => {
    try {
        const tasks = await getAllTasks(req.userId);

        res.status(200).json({
            success: true,
            data:tasks
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export const getTaskByIdController = async (req, res) => {
    try {
        const task = await getTaskById(
            req.userId,
            req.params.id
        );

        res.status(200).json({
            success: true,
            task
        });

    } catch (error) {
        res.status(404).json({
            success: false,
            message: error.message
        });
    }
};

export const updateTaskController = async (req, res) => {
    try {
        const task = await updateTask(
            req.userId,
            req.params.id,
            req.body
        );

        res.status(200).json({
            success: true,
            message: "Task updated successfully",
            task
        });

    } catch (error) {
        res.status(404).json({
            success: false,
            message: error.message
        });
    }
};

export const deleteTaskController = async (req, res) => {
    try {
        await deleteTask(
            req.userId,
            req.params.id
        );

        res.status(200).json({
            success: true,
            message: "Task deleted successfully"
        });

    } catch (error) {
        res.status(404).json({
            success: false,
            message: error.message
        });
    }
};