const express = require("express");
const { getPublicCertificates } = require("../controllers/certificateController");

const router = express.Router();

router.get("/", getPublicCertificates);

module.exports = router;
