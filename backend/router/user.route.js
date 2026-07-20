const express = require("express");
const router = express.Router();
const { user } = require("../controller");
const { protect, admin } = require("../middleware/auth.middleware");

// Public
router.post("/register", user.register);
router.post("/login", user.login);

// Protected
router.get("/profile", protect, user.getProfile);
router.put("/profile", protect, user.updateProfile);

// Admin
router.get("/", protect, admin, user.getAllUsers);
router.get("/:id", protect, admin, user.getUserById);
router.put("/:id", protect, admin, user.updateUser);
router.delete("/:id", protect, admin, user.deleteUser);

module.exports = router;
