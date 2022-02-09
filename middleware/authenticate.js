var jwt = require("jsonwebtoken");
const key = "glitch";

const authenticate = (req, res, next) => {
  //get a user from jwt token and id to req object
  const token = req.header("authtoken");
  if (!token) {
    return res.status(401).send({
      error: "Unauthorized!!!. Please authenticate your credentials first",
    });
  }
  try {
    const payload = jwt.verify(token, key);
    req.user = payload.user;
    next();
  } catch (error) {
    return res.status(401).send({
      error: "Unauthorized!!!. Please authenticate your credentials first",
    });
  }
};
module.exports = authenticate;
