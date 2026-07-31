const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const coupon = require("../controller/coupon.controller");
const { protect, admin } = require("../middleware/auth.middleware");

// ── Soft-auth middleware for /validate ───────────────────────────────────────
// Attaches req.user if a valid token is present, but never blocks the request.
const softAuth = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return next();
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded?.id) {
      const { User } = require("../model");
      req.user = await User.findById(decoded.id).select("-password").catch(() => null);
    }
  } catch (_) {
    // invalid/expired token — just continue as guest
  }
  next();
};

// ── Public ───────────────────────────────────────────────────────────────────
router.post("/validate", softAuth, coupon.validateCoupon);
router.get("/public", coupon.getPublicCoupons);

// ── Admin — literal routes MUST come before /:id ─────────────────────────────
router.get("/", protect, admin, coupon.getAllCoupons);
router.post("/", protect, admin, coupon.createCoupon);

// ── Admin — parameterised routes ─────────────────────────────────────────────
router.put("/:id/toggle", protect, admin, coupon.toggleCoupon);
router.get("/:id", protect, admin, coupon.getCouponById);
router.put("/:id", protect, admin, coupon.updateCoupon);
router.delete("/:id", protect, admin, coupon.deleteCoupon);

module.exports = router;
