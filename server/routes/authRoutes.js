const express = require("express");
const {
  loginAdmin,
  logoutAdmin,
  getMeAdmin,
} = require("../controllers/authController");
const { protectAdmin } = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/login", loginAdmin);
router.post("/logout", logoutAdmin);
router.get("/me", protectAdmin, getMeAdmin);

module.exports = router;
