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
router.put("/changepassword", protect, user.changePassword);

// Addresses
router.post("/addresses", protect, user.addAddress);
router.put("/addresses/:addressId", protect, user.updateAddress);
router.delete("/addresses/:addressId", protect, user.deleteAddress);
router.put("/addresses/:addressId/default", protect, user.setDefaultAddress);

// Payment Methods
router.post("/payment-methods", protect, user.addPaymentMethod);
router.delete("/payment-methods/:paymentId", protect, user.deletePaymentMethod);

// Wishlist
router.get("/wishlist", protect, user.getWishlist);
router.post("/wishlist/:productId", protect, user.addToWishlist);
router.delete("/wishlist/:productId", protect, user.removeFromWishlist);
router.delete("/wishlist", protect, user.clearWishlist);

// Admin
router.get("/", protect, admin, user.getAllUsers);
router.post("/", protect, admin, user.createUser);
router.get("/:id", protect, admin, user.getUserById);
router.put("/:id", protect, admin, user.updateUser);
router.delete("/:id", protect, admin, user.deleteUser);

module.exports = router;
