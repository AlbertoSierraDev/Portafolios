const { app } = require("@azure/functions");

const connectDB = require("../config/db");
const {
  createAdminCertificate,
  deleteAdminCertificate,
  listAdminCertificates,
  prepareCertificatePayload,
  prepareOrder,
  prepareVisibility,
  requireCertificateId,
  setCertificateVisibility,
  updateAdminCertificate,
  updateCertificateOrder,
} = require("../services/adminCertificateService");
const { requireAdmin } = require("../services/authService");
const { toJsonResponse } = require("./httpResponse");

async function readJsonBody(request) {
  const contentType = request.headers.get("content-type") || "";
  if (!/^application\/json(?:\s*;|\s*$)/i.test(contentType)) {
    const error = new Error("Content-Type debe ser application/json.");
    error.statusCode = 415;
    throw error;
  }

  try {
    const body = await request.json();
    if (body && typeof body === "object" && !Array.isArray(body)) return body;
  } catch {
    // Invalid JSON is reported below with the same response as other invalid bodies.
  }
  const error = new Error("El cuerpo debe ser un objeto JSON válido.");
  error.statusCode = 400;
  throw error;
}

function toCertificateErrorResponse(error) {
  if (error.statusCode && error.statusCode < 500) {
    return toJsonResponse(error.body || { message: error.message }, error.statusCode);
  }
  if (error.name === "ValidationError") {
    return toJsonResponse({ message: "Error de validación" }, 400);
  }
  if (error.name === "CastError") {
    return toJsonResponse({ message: "ID no válido" }, 400);
  }
  console.error(error);
  return toJsonResponse({ message: "Error interno del servidor" }, 500);
}

async function getAdminCertificates(request) {
  try {
    requireAdmin(request);
    await connectDB({ exitOnFailure: false });
    return toJsonResponse(await listAdminCertificates());
  } catch (error) {
    return toCertificateErrorResponse(error);
  }
}

async function postAdminCertificate(request) {
  try {
    requireAdmin(request);
    const payload = prepareCertificatePayload(await readJsonBody(request));
    await connectDB({ exitOnFailure: false });
    return toJsonResponse(await createAdminCertificate(payload), 201);
  } catch (error) {
    return toCertificateErrorResponse(error);
  }
}

async function putAdminCertificate(request) {
  try {
    requireAdmin(request);
    const id = requireCertificateId(request.params.id);
    const payload = prepareCertificatePayload(await readJsonBody(request), { partial: true });
    await connectDB({ exitOnFailure: false });
    return toJsonResponse(await updateAdminCertificate(id, payload));
  } catch (error) {
    return toCertificateErrorResponse(error);
  }
}

async function patchAdminCertificateVisibility(request) {
  try {
    requireAdmin(request);
    const id = requireCertificateId(request.params.id);
    const visible = prepareVisibility(await readJsonBody(request));
    await connectDB({ exitOnFailure: false });
    return toJsonResponse(await setCertificateVisibility(id, visible));
  } catch (error) {
    return toCertificateErrorResponse(error);
  }
}

async function patchAdminCertificateOrder(request) {
  try {
    requireAdmin(request);
    const items = prepareOrder(await readJsonBody(request));
    await connectDB({ exitOnFailure: false });
    return toJsonResponse(await updateCertificateOrder(items));
  } catch (error) {
    return toCertificateErrorResponse(error);
  }
}

async function deleteAdminCertificateFunction(request) {
  try {
    requireAdmin(request);
    const id = requireCertificateId(request.params.id);
    await connectDB({ exitOnFailure: false });
    return toJsonResponse(await deleteAdminCertificate(id));
  } catch (error) {
    return toCertificateErrorResponse(error);
  }
}

app.http("getAdminCertificates", {
  methods: ["GET"], authLevel: "anonymous", route: "management/certificates",
  handler: getAdminCertificates,
});
app.http("postAdminCertificate", {
  methods: ["POST"], authLevel: "anonymous", route: "management/certificates",
  handler: postAdminCertificate,
});
app.http("putAdminCertificate", {
  methods: ["PUT"], authLevel: "anonymous", route: "management/certificates/{id}",
  handler: putAdminCertificate,
});
app.http("patchAdminCertificateVisibility", {
  methods: ["PATCH"], authLevel: "anonymous", route: "management/certificates/{id}/visibility",
  handler: patchAdminCertificateVisibility,
});
app.http("patchAdminCertificateOrder", {
  methods: ["PATCH"], authLevel: "anonymous", route: "management/certificates/order",
  handler: patchAdminCertificateOrder,
});
app.http("deleteAdminCertificate", {
  methods: ["DELETE"], authLevel: "anonymous", route: "management/certificates/{id}",
  handler: deleteAdminCertificateFunction,
});

module.exports = {
  deleteAdminCertificateFunction,
  getAdminCertificates,
  patchAdminCertificateOrder,
  patchAdminCertificateVisibility,
  postAdminCertificate,
  putAdminCertificate,
};
