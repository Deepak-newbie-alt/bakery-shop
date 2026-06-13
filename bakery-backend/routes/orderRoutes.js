const express = require("express");
const router = express.Router();

const {
  createOrder,
  getMyOrders,
  getAllOrders,
  updateOrderStatus
} = require("../controllers/orderController");

const { protect,admin} = require("../middleware/authMiddleware");

// Protected routes
router.post("/", protect, createOrder);
router.get("/", protect, admin, getAllOrders);
router.get("/my", protect, getMyOrders);
router.put("/:id", protect, admin, updateOrderStatus);

module.exports = router;