const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

router.post("/register", authController.register);
router.post("/login", authController.login);
router.get("/protected", verifyToken, authController.protected);

function verifyToken(req, res, next) {
  const token = req.headers["authorization"];

  if (!token) {
    return res.status(403).send({ message: "A token is required" });
  }

  try {
    const decoded = jwt.verify(token, "your_jwt_secret");
    req.user = decoded;
  } catch (error) {
    return res.status(401).send({ message: "Invalid Token" });
  }

  return next();
}

module.exports = router;
