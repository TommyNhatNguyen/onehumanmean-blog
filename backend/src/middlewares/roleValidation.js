const { Auth } = require("../models/authModel");

async function roleValidation(req, res, next) {
  const username = res.locals?.verifyJwt?.username;
  try {
    const user = await Auth.getUserName(username);
    if (user?.role === "admin") {
      next();
    } else {
      res.status(403).send({
        message: "Unauthorized! This feature is for admin only",
        success: false,
        type: "invalid_role",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(404).send({ message: error, success: false });
  }
}

module.exports = { roleValidation };
