const express = require("express");
const rateLimit = require("express-rate-limit");
const {
  loginAdmin,
  logoutAdmin,
  getMeAdmin,
} = require("../controllers/authController");
const { protectAdmin } = require("../middlewares/authMiddleware");

const router = express.Router();

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    message: "Demasiados intentos de login. Inténtalo más tarde.",
  },
});

router.post("/login", loginLimiter, loginAdmin);
router.post("/logout", logoutAdmin);
router.get("/me", protectAdmin, getMeAdmin);

module.exports = router;
