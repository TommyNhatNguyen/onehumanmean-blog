import { axiosInstance } from "../utils/axiosIntsance";

export const projectServices = {
  getProjects(query = "") {
    return axiosInstance.get(`projects${query}`);
  },
  getProjectsById(projectId = "") {
    return axiosInstance.get(`projects/${projectId}`);
  },
  createProject(payload = {}) {
    return axiosInstance.post(`projects`, payload);
  },
  updateProjectById(projectId = "", payload = {}) {
    return axiosInstance.put(`projects/${projectId}`, payload);
  },
  deleteProjectById(projectId = "") {
    return axiosInstance.delete(`projects/${projectId}`);
  },
};
