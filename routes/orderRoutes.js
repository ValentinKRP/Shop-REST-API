const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");
const { verifyToken } = require("../middlewares/authMiddleware");

router.post("/create-order", verifyToken, orderController.createOrder);
router.get("/my-orders", verifyToken, orderController.getUserOrders);

module.exports = router;
