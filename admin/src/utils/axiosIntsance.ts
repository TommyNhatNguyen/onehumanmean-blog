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
let _retry = false;
axiosInstance.interceptors.response.use(
  async function (response) {
    return response;
  },
  async function (error) {
    let originalRequest = error.config;
    if (
      error.response.status === 403 &&
      !_retry &&
      error.response.data.type !== "invalid_role"
    ) {
      _retry = true;
      try {
        const token = tokenMethod.get()?.refreshToken;
        const res = await adminAuthServices.refreshToken({
          refreshToken: token,
        });
        const { refreshToken, accessToken } = res?.data?.data || {};
        tokenMethod.set({ accessToken, refreshToken });
        originalRequest.header.Authorization = `Bearer ${accessToken}`;
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        console.log("refreshError", refreshError);
        tokenMethod.delete();
        return Promise.reject(refreshError);
      } finally {
        _retry = false;
      }
    }
    return Promise.reject(error);
  },
);
