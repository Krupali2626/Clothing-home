const express = require("express");
const router = express.Router();
const inventory = require("../controller/inventory.controller");
const { protect, admin } = require("../middleware/auth.middleware");

router.use(protect, admin);
router.get("/summary", inventory.getSummary);
router.get("/products", inventory.getInventory);
router.post("/products/:id/adjust", inventory.adjustStock);
router.get("/products/:id/movements", inventory.getMovements);
module.exports = router;
