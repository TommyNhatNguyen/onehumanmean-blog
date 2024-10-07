const express = require("express");
const blogRouter = express.Router();
const {
  getAllBlogs,
  getBlogById,
  createBlog,
  updateBlog,
  deleteBlog,
} = require("../controllers/blogsController");
const { handleTempUploads } = require("../middlewares/handleTempUploads");
const authValidation = require("../middlewares/authValidation");
const { roleValidation } = require("../middlewares/roleValidation");

blogRouter.get("/blogs", getAllBlogs);

blogRouter.get("/blogs/:blogId", getBlogById);

blogRouter.post(
  "/blogs",
  authValidation,
  roleValidation,
  handleTempUploads,
  createBlog
);

blogRouter.put(
  "/blogs/:blogId",
  authValidation,
  roleValidation,
  handleTempUploads,
  updateBlog
);

blogRouter.delete("/blogs/:blogId", authValidation, roleValidation, deleteBlog);

module.exports = blogRouter;
