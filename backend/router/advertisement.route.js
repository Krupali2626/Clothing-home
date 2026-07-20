const express = require("express");
const router = express.Router();
const { advertisement } = require("../controller");
const { protect, admin } = require("../middleware/auth.middleware");

// Public - active ads (optionally by position/type)
router.get("/", advertisement.getAdvertisements);

// Admin
router.get("/all", protect, admin, advertisement.getAllAdvertisements);
router.get("/:id", protect, admin, advertisement.getAdvertisementById);
router.post("/", protect, admin, advertisement.createAdvertisement);
router.put("/:id", protect, admin, advertisement.updateAdvertisement);
router.delete("/:id", protect, admin, advertisement.deleteAdvertisement);

module.exports = router;
