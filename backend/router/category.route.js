const express = require("express");
const router = express.Router();
const { category } = require("../controller");
const { protect, admin } = require("../middleware/auth.middleware");

// Public
router.get("/", category.getAllCategories);
router.get("/:id", category.getCategoryById);

// Admin
router.post("/", protect, admin, category.createCategory);
router.put("/:id", protect, admin, category.updateCategory);
router.delete("/:id", protect, admin, category.deleteCategory);

module.exports = router;
