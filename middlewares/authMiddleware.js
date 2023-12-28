const jwt = require("jsonwebtoken");

exports.verifyToken = (req, res, next) => {
  const token = req.headers["authorization"];

  if (!token) {
    return res
      .status(403)
      .send({ message: "A token is required for authentication" });
  }

  try {
    const bearerToken = token.split(" ")[1];
    const decoded = jwt.verify(bearerToken, "your_jwt_secret");

    req.user = { id: decoded.id };
  } catch (err) {
    return res.status(401).send({ message: "Invalid Token" });
  }

  return next();
};
