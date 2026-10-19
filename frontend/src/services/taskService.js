import api from "./api.js";

export const createTask = async (taskData) => {
    const response = await api.post(
        "/task/add",
        taskData
    );

    return response.data;
};

export const getAllTasks = async () => {
    const response = await api.get(
        "/task/get"
    );

    return response.data;
};

export const getTaskById = async (id) => {
    const response = await api.get(
        `/task/get/${id}`
    );

    return response.data;
};

export const updateTask = async (id, taskData) => {
    const response = await api.put(
        `/task/update/${id}`,
        taskData
    );

    return response.data;
};

export const deleteTask = async (id) => {
    const response = await api.delete(
        `/task/delete/${id}`
    );

    return response.data;
};