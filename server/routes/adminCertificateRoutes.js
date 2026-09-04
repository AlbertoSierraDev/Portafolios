const express = require("express");
const {
  getAdminCertificates,
  createCertificate,
  updateCertificate,
  updateCertificateVisibility,
  updateCertificateOrder,
  deleteCertificate,
} = require("../controllers/certificateController");
const { protectAdmin } = require("../middlewares/authMiddleware");
const { certificateUpload } = require("../middlewares/certificateUploadMiddleware");

const router = express.Router();

router.use(protectAdmin);

router.get("/", getAdminCertificates);
router.post("/", certificateUpload, createCertificate);
router.patch("/order", updateCertificateOrder);
router.put("/:id", certificateUpload, updateCertificate);
router.patch("/:id/visibility", updateCertificateVisibility);
router.delete("/:id", deleteCertificate);

module.exports = router;
