import api from "./api.js";

export const createSubtask = async (taskId, subtaskData) => {
    const response = await api.post(
        `/subtask/add/${taskId}`,
        subtaskData
    );

    return response.data;
};

export const getSubtasks = async (taskId) => {
    const response = await api.get(
        `/subtask/get/${taskId}`
    );

    return response.data;
};

export const getSubtaskById = async (taskId, subtaskId) => {

    const response = await api.get(
        `/subtask/get/${taskId}/${subtaskId}`
    );

    return response.data;
};

export const updateSubtask = async (
    taskId,
    subtaskId,
    subtaskData
) => {
    const response = await api.put(
        `/subtask/update/${taskId}/${subtaskId}`,
        subtaskData
    );

    return response.data;
};

export const deleteSubtask = async (taskId, subtaskId) => {
    const response = await api.delete(
        `/subtask/delete/${taskId}/${subtaskId}`
    );

    return response.data;
};