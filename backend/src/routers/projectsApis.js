const express = require("express");
const projectRouter = express.Router();
const { handleTempUploads } = require("../middlewares/handleTempUploads");
const authValidation = require("../middlewares/authValidation");
const {
  getAllProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
} = require("../controllers/projectsController");
const { roleValidation } = require("../middlewares/roleValidation");

projectRouter.get("/projects", getAllProjects);

projectRouter.get("/projects/:projectId", getProjectById);

projectRouter.post(
  "/projects",
  authValidation,
  roleValidation,
  handleTempUploads,
  createProject
);

projectRouter.put(
  "/projects/:projectId",
  authValidation,
  roleValidation,
  handleTempUploads,
  updateProject
);

projectRouter.delete(
  "/projects/:projectId",
  authValidation,
  roleValidation,
  deleteProject
);

module.exports = projectRouter;
