const { app } = require("@azure/functions");

const connectDB = require("../config/db");
const { listPublicCertificates } = require("../services/certificateService");
const { toJsonResponse, toErrorResponse } = require("./httpResponse");

async function getCertificates() {
  try {
    await connectDB({ exitOnFailure: false });
    const certificates = await listPublicCertificates();
    return toJsonResponse(certificates);
  } catch (error) {
    return toErrorResponse(error);
  }
}

app.http("getCertificates", {
  methods: ["GET"],
  authLevel: "anonymous",
  route: "certificates",
  handler: getCertificates,
});

module.exports = {
  getCertificates,
};
