const express = require("express");
const router = express.Router();
const contact = require("../controller/contact.controller");
const { protect, admin } = require("../middleware/auth.middleware");

// Public — anyone can submit the contact form
router.post("/", contact.submitContact);

// Admin only
router.get("/unread-count", protect, admin, contact.getUnreadCount);
router.get("/", protect, admin, contact.getAllContacts);
router.get("/:id", protect, admin, contact.getContactById);
router.put("/:id", protect, admin, contact.updateContact);
router.delete("/:id", protect, admin, contact.deleteContact);

module.exports = router;
