import Task from "../models/taskModel.js";

export const createTask = async (userId, taskData) => {
    try {
        const { title, description, priority, status, dueDate } = taskData;

        if (!title) {
            throw new Error("Title is required");
        }

        const task = await Task.create({
            userId,
            title,
            description,
            priority,
            status,
            dueDate
        });

        return task;

    } catch (error) {
        throw new Error(error.message);
    }
};

export const getAllTasks = async (userId) => {
    try {
        const tasks = await Task.find({ userId })
            .sort({ createdAt: -1 });

        return tasks;

    } catch (error) {
        throw new Error(error.message);
    }
};

export const getTaskById = async (userId, taskId) => {
    try {
        const task = await Task.findOne({
            _id: taskId,
            userId
        });

        if (!task) {
            throw new Error("Task not found");
        }

        return task;

    } catch (error) {
        throw new Error(error.message);
    }
};

export const updateTask = async (userId, taskId, taskData) => {
    try {
        const task = await Task.findOneAndUpdate(
            {
                _id: taskId,
                userId
            },
            taskData,
            {
                returnDocument: "after",
                runValidators: true
            }
        );

        if (!task) {
            throw new Error("Task not found");
        }

        return task;

    } catch (error) {
        throw new Error(error.message);
    }
};

export const deleteTask = async (userId, taskId) => {
    try {
        const task = await Task.findOneAndDelete({
            _id: taskId,
            userId
        });

        if (!task) {
            throw new Error("Task not found");
        }

        return task;

    } catch (error) {
        throw new Error(error.message);
    }
};