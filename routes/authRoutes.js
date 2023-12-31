const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middlewares/authMiddleware");
const authController = require("../controllers/authController");

router.post("/register", authController.register);
router.post("/login", authController.login);
router.get("/protected", verifyToken, authController.protected);

module.exports = router;
