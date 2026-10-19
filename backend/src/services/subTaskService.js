import Subtask from "../models/subtaskModel.js";
import Task from "../models/taskModel.js";

// Check if the task exists and belongs to the user
const getTaskByIdAndUserId = async (taskId, userId) => {
    try {
        const task = await Task.findOne({
            _id: taskId,
            userId: userId
        });

        if (!task) {
            throw new Error("Task not found or access denied");
        }

        return task;

    } catch (error) {
        throw new Error(error.message);
    }
};

export const createSubtask = async (userId, taskId, subtaskData) => {
    try {
        const { title, status, description } = subtaskData;

        // Check if the task exists and belongs to the user
        await getTaskByIdAndUserId(taskId, userId);

        const subtask = await Subtask.create({
            taskId: taskId,
            title: title,
            status: status,
            description: description
        });

        return subtask;

    } catch (error) {
        throw new Error(error.message);
    }
};


export const getSubtasksByTaskId = async (userId, taskId) => {
    try {

        // Check if the task exists and belongs to the user
        await getTaskByIdAndUserId(taskId, userId);

        const subtasks = await Subtask.find({ taskId: taskId });

        return subtasks;

    } catch (error) {
        throw new Error(error.message);
    }
};

export const getSubtask = async (userId, taskId, subtaskId) => {
    try {

        // Check if the task exists and belongs to the user
        await getTaskByIdAndUserId(taskId, userId);

        // Find the subtask belonging to the task
        const subtask = await Subtask.findOne({
            _id: subtaskId,
            taskId: taskId
        });

        return subtask;

    } catch (error) {
        throw new Error(error.message);
    }
};

export const updateSubtask = async (userId, taskId, subtaskId, subtaskData) => {
    try {
        // Check if the task exists and belongs to the user
        await getTaskByIdAndUserId(taskId, userId);

        const subtask = await Subtask.findOneAndUpdate(
            {
                _id: subtaskId,
                taskId: taskId
            },
            subtaskData,
            {
                returnDocument: "after",
                runValidators: true
            }
        );

        if (!subtask) {
            throw new Error("Subtask not found or access denied");
        }

        return subtask;

    } catch (error) {
        throw new Error(error.message);
    }
};

export const deleteSubtask = async (userId, taskId, subtaskId) => {
    try {

        // Check if the task exists and belongs to the user
        await getTaskByIdAndUserId(taskId, userId);
        const subtask = await Subtask.findOneAndDelete({
            _id: subtaskId,
            taskId: taskId
        });

        if (!subtask) {
            throw new Error("Subtask not found or access denied");
        }

        return subtask;

    } catch (error) {
        throw new Error(error.message);
    }
};
