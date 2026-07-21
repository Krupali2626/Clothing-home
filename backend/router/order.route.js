const express = require("express");
const router = express.Router();
const { order } = require("../controller");
const { protect, admin } = require("../middleware/auth.middleware");

// Protected
router.post("/", protect, order.createOrder);
router.get("/myorders", protect, order.getMyOrders);

// Admin
router.get("/", protect, admin, order.getAllOrders);
router.put("/:id", protect, admin, order.updateOrder);
router.delete("/:id", protect, admin, order.deleteOrder);

// Public / shared single
router.get("/:id", protect, order.getOrderById);

module.exports = router;
