import { axiosInstance } from "../utils/axiosIntsance";

const adminAuthServices = {
  login: (payload = {}) => {
    return axiosInstance.post("admin/login", payload);
  },
  refreshToken: (payload = {}) => {
    return axiosInstance.post("admin/refresh-token", payload);
  },
  getProfile: (query = "") => {
    return axiosInstance.get(`admin/profile${query}`);
  },
  changePassword: (payload = {}) => {
    return axiosInstance.post(`admin/change-password`, payload);
  },
};
export default adminAuthServices;
