const express = require("express");
const {
  createContactMessage,
  getContactMessages,
  markContactMessageAsRead,
  deleteContactMessage,
} = require("../controllers/contactController");
const { protectAdmin } = require("../middlewares/authMiddleware");
const contactRateLimit = require("../middlewares/contactRateLimit");
const verifyTurnstile = require("../middlewares/verifyTurnstile");

const router = express.Router();

router.post("/", contactRateLimit, verifyTurnstile, createContactMessage);

router.get("/", protectAdmin, getContactMessages);
router.patch("/:id/read", protectAdmin, markContactMessageAsRead);
router.delete("/:id", protectAdmin, deleteContactMessage);

module.exports = router;
