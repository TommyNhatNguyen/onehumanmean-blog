import { axiosInstance } from "../utils/axiosIntsance";

export const blogServices = {
  getBlogs(query = "") {
    return axiosInstance.get(`blogs${query}`);
  },
  getBlogsById(blogId = "") {
    return axiosInstance.get(`blogs/${blogId}`);
  },
  createBlog(payload = {}) {
    return axiosInstance.post(`blogs`, payload);
  },
  updateBlogById(blogId = "", payload = {}) {
    return axiosInstance.put(`blogs/${blogId}`, payload);
  },
  deleteBlogById(blogId = "") {
    return axiosInstance.delete(`blogs/${blogId}`);
  },
};
