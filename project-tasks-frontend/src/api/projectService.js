import api from "./axiosConfig";

export const getProjects = () => api.get("/projects");

export const createProject = (project) =>
  api.post("/projects", project);

export const getProjectById = (id) =>
  api.get(`/projects/${id}`);

export const getProjectProgress = (id) =>
  api.get(`/projects/${id}/progress`);

export const deleteProject = (id) =>
  api.delete(`/projects/${id}`);
