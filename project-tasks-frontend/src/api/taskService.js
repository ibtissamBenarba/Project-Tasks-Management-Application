import api from "./axiosConfig";

export const getTasks = (projectId) =>
  api.get(`/projects/${projectId}/tasks`);

export const getTaskById = (projectId, taskId) =>
  api.get(`/projects/${projectId}/tasks/${taskId}`);

export const createTask = (projectId, task) =>
  api.post(`/projects/${projectId}/tasks`, task);

export const completeTask = (projectId, taskId) =>
  api.patch(`/projects/${projectId}/tasks/${taskId}/complete`);

export const deleteTask = (projectId, taskId) =>
  api.delete(`/projects/${projectId}/tasks/${taskId}`);
