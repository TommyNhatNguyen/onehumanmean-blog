import { axiosInstance } from "../utils/axiosIntsance";

export const notificationServices = {
  getAllNotifications: (query = "") => {
    return axiosInstance.get(`admin/notifications${query}`);
  },
  getNotificationById: (query = "") => {
    return axiosInstance.get(`admin/notifications${query}`);
  },
  answer: (payload = {}) => {
    return axiosInstance.put(`admin/notifications`, payload);
  },
  deleteNotification: (questionId = "") => {
    return axiosInstance.delete(`admin/notifications${questionId}`);
  },
  askQuestion: (payload: {}) => {
    return axiosInstance.post(`admin/notifications`, payload);
  },
};
