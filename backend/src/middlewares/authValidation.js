const jwt = require("jsonwebtoken");
// Authentication validation
const authValidation = (req, res, next) => {
  const userAccessToken = req.headers.authorization?.split(" ")?.[1];
  if (!userAccessToken) {
    res.status(401).send({ message: "Unauthorized", success: false });
  } else {
    try {
      const verifyJwt = jwt.verify(
        userAccessToken,
        process.env.ACCESS_JWT_PRIVATE_KEY
      );
      if (verifyJwt) {
        res.locals.verifyJwt = verifyJwt;
        next();
      }
    } catch (error) {
      res.status(403).send({ message: error, success: false });
    }
  }
};
module.exports = authValidation;
