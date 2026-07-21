const express = require("express");
const router = express.Router();
const { product } = require("../controller");
const { protect, admin } = require("../middleware/auth.middleware");

// Public
router.get("/", product.getAllProducts);
router.get("/:id", product.getProductById);

// Protected (review)
router.post("/:id/reviews", protect, product.addReview);

// Admin
router.post("/", protect, admin, product.createProduct);
router.put("/:id", protect, admin, product.updateProduct);
router.delete("/:id", protect, admin, product.deleteProduct);

module.exports = router;
