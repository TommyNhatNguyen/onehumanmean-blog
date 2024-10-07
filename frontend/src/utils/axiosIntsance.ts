import axios from "axios";
import { ENV } from "../constant/environments";
import tokenMethod from "./tokenMethod";
import adminAuthServices from "../services/adminAuthServices";

export const axiosInstance = axios.create({
  baseURL: ENV.BASE_URL,
});

axiosInstance.interceptors.request.use(
  (config) => {
    config.headers.Authorization = `Bearer ${tokenMethod?.get()?.accessToken}`;
    return config;
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  },
);

axiosInstance.interceptors.response.use(
  async (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 403 && !!!originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const token = tokenMethod.get()?.refreshToken;
        if (token) {
          const res = await adminAuthServices.refreshToken({
            refreshToken: token,
          });
          const { refreshToken, accessToken } = res?.data?.data || {};
          tokenMethod.set({ accessToken, refreshToken });
          originalRequest.headers.Authorization = `Bearer ${accessToken}`;
          return axiosInstance(originalRequest);
        }
      } catch (error) {
        console.log(error);
      }
      return Promise.reject(error || "Something went wrong");
    } else {
      console.log(error);
      return Promise.reject(error);
    }
  },
);
