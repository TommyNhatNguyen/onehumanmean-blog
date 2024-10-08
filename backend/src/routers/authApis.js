const express = require("express");
const {
  adminLogin,
  refreshToken,
  changePassword,
  getProfile,
} = require("../controllers/authController");
const authValidation = require("../middlewares/authValidation");
const { roleValidation } = require("../middlewares/roleValidation");
const authRouter = express.Router();

// Login
authRouter.post("/admin/login", adminLogin);
// Refresh token
authRouter.post("/admin/refresh-token", roleValidation, refreshToken);
// Change password
authRouter.post(
  "/admin/change-password",
  authValidation,
  roleValidation,
  changePassword
);
// Get user
authRouter.get("/admin/profile", authValidation, getProfile);

module.exports = authRouter;
