const Certificate = require("../models/Certificate");

const listPublicCertificates = () =>
  Certificate.find({ visible: true })
    .select(
      "title issuer description image credentialUrl issueDate displayOrder createdAt updatedAt",
    )
    .sort({ displayOrder: 1, createdAt: 1 })
    .lean();

module.exports = {
  listPublicCertificates,
};
