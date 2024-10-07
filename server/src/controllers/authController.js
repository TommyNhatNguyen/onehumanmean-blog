const { Auth } = require("../models/authModel");
const jwt = require("jsonwebtoken");
require("dotenv").config();
// Login controller
async function adminLogin(req, res) {
  const { username, password } = req.body;
  try {
    const user = await Auth.getUserName(username);
    if (!user) {
      res
        .status(404)
        .send({ message: "User not found", success: false, data: user });
    }
    if (user.username !== username || user.password_hash !== password) {
      res.status(404).send({
        message: "Wrong email or password",
        success: false,
        data: null,
      });
    } else {
      // JWT creating
      const payload = {
        username: user.username,
      };
      const accessToken = jwt.sign(
        payload,
        process.env.ACCESS_JWT_PRIVATE_KEY,
        {
          algorithm: "HS256",
          expiresIn: process.env.ACCESS_JWT_EXPIRE_TIME,
        }
      );
      const refreshToken = jwt.sign(
        payload,
        process.env.REFRESH_JWT_PRIVATE_KEY,
        {
          algorithm: "HS256",
          expiresIn: process.env.REFRESH_JWT_EXPIRE_TIME,
        }
      );
      Auth.saveRefreshToken(refreshToken, username, password);

      res.status(200).send({
        message: "Login success",
        success: true,
        data: {
          user: user.username,
          accessToken: accessToken,
          refreshToken: refreshToken,
        },
      });
    }
  } catch (error) {
    console.log(error);
  }
}
// Refresh token
async function refreshToken(req, res) {
  const { refreshToken } = req.body;
  try {
    const userRefreshToken = await Auth.getRefreshToken(refreshToken);
    if (!userRefreshToken) {
      res.status(403).send({ message: "Unauthorize", success: false });
    } else {
      try {
        const verifyJwt = jwt.verify(
          refreshToken,
          process.env.REFRESH_JWT_PRIVATE_KEY
        );
        // Signup new jwt
        const newAccessToken = jwt.sign(
          { username: verifyJwt.username },
          process.env.ACCESS_JWT_PRIVATE_KEY,
          {
            algorithm: "HS256",
            expiresIn: process.env.ACCESS_JWT_EXPIRE_TIME,
          }
        );
        const newRefreshToken = jwt.sign(
          { username: verifyJwt.username },
          process.env.REFRESH_JWT_PRIVATE_KEY,
          {
            algorithm: "HS256",
            expiresIn: process.env.REFRESH_JWT_EXPIRE_TIME,
          }
        );
        Auth.updateRefreshToken(newRefreshToken, refreshToken);
        res.status(200).send({
          accessToken: newAccessToken,
          newRefreshToken: newRefreshToken,
        });
      } catch (error) {
        console.log(error);
        res.status(403).send({ message: error, success: false });
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Server Error", success: false });
  }
}
// Change password
async function changePassword(req, res) {
  const { username, oldPassword, newPassword } = req.body;
  try {
    if (oldPassword === newPassword) {
      res.status(404).send({
        message: "New password can't be the same with old password",
        success: false,
      });
    } else {
      const user = await Auth.getUserName(username);
      if (user?.password_hash !== oldPassword) {
        res.status(404).send({
          message: "Old password not correct",
          success: false,
        });
      } else {
        await Auth.changePassword(username, oldPassword, newPassword);
        res
          .status(200)
          .send({ message: "Changed password successful", success: true });
      }
    }
  } catch (error) {
    console.log(error);
    res.status(404).send({ message: error, success: false });
  }
}
// Get profile
async function getProfile(req, res) {
  const verifyJwt = res.locals.verifyJwt;
  const { username } = verifyJwt;
  console.log(username);
  try {
    const data = await Auth.getUserName(username);
    const _data = {
      id: data?.id,
      username: data?.username,
    };
    res.status(200).send({
      message: "Get user info successful",
      success: true,
      data: _data,
    });
  } catch (error) {
    console.log(error);
    res.status(404).send({ message: error, success: false, data: null });
  }
}
module.exports = { adminLogin, refreshToken, changePassword, getProfile };
