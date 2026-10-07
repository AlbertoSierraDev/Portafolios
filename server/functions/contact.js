const { app } = require("@azure/functions");

const connectDB = require("../config/db");
const {
  createContactMessage,
  deleteContactMessage,
  listContactMessages,
  markContactMessageRead,
  prepareContactSubmission,
  requireContactMessageId,
  verifyTurnstileToken,
} = require("../services/contactService");
const { requireAdmin } = require("../services/authService");
const { toJsonResponse } = require("./httpResponse");
const rateLimit = require("../services/rateLimitService");

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
    // Malformed JSON is handled below with the same response as other invalid bodies.
  }
  const error = new Error("El cuerpo debe ser un objeto JSON válido.");
  error.statusCode = 400;
  throw error;
}

function toContactErrorResponse(error) {
  if (error.statusCode && error.statusCode < 500) {
    return toJsonResponse({ message: error.message }, error.statusCode);
  }
  if (error.name === "ValidationError") {
    return toJsonResponse({ message: "Error de validación" }, 400);
  }
  if (error.name === "CastError") {
    return toJsonResponse({ message: "ID no válido" }, 400);
  }
  console.error("Error interno en contacto:", error.name);
  return toJsonResponse({ message: "Error interno del servidor" }, 500);
}

async function postContact(request) {
  try {
    const { data, turnstileToken } = prepareContactSubmission(await readJsonBody(request));
    await verifyTurnstileToken(turnstileToken);
    const limited = await rateLimit.enforceContactRateLimit(request);
    if (limited) return limited;
    let contactMessage;
    try {
      await connectDB({ exitOnFailure: false });
      contactMessage = await createContactMessage(data);
    } catch (error) {
      if (error.name === "ValidationError") throw error;
      console.error("Contact storage unavailable");
      return {
        status: 503,
        headers: { "Retry-After": "60" },
        jsonBody: { message: "Servicio temporalmente no disponible. Intentalo mas tarde." },
      };
    }
    return toJsonResponse({ message: "Mensaje enviado correctamente.", contactMessage }, 201);
  } catch (error) {
    return toContactErrorResponse(error);
  }
}

async function getManagementContact(request) {
  try {
    requireAdmin(request);
    await connectDB({ exitOnFailure: false });
    return toJsonResponse(await listContactMessages());
  } catch (error) {
    return toContactErrorResponse(error);
  }
}

async function patchManagementContactRead(request) {
  try {
    requireAdmin(request);
    const id = requireContactMessageId(request.params.id);
    await connectDB({ exitOnFailure: false });
    return toJsonResponse(await markContactMessageRead(id));
  } catch (error) {
    return toContactErrorResponse(error);
  }
}

async function deleteManagementContact(request) {
  try {
    requireAdmin(request);
    const id = requireContactMessageId(request.params.id);
    await connectDB({ exitOnFailure: false });
    return toJsonResponse(await deleteContactMessage(id));
  } catch (error) {
    return toContactErrorResponse(error);
  }
}

app.http("postContact", {
  methods: ["POST"], authLevel: "anonymous", route: "contact",
  handler: postContact,
});
app.http("getManagementContact", {
  methods: ["GET"], authLevel: "anonymous", route: "management/contact",
  handler: getManagementContact,
});
app.http("patchManagementContactRead", {
  methods: ["PATCH"], authLevel: "anonymous", route: "management/contact/{id}/read",
  handler: patchManagementContactRead,
});
app.http("deleteManagementContact", {
  methods: ["DELETE"], authLevel: "anonymous", route: "management/contact/{id}",
  handler: deleteManagementContact,
});

module.exports = {
  deleteManagementContact,
  getManagementContact,
  patchManagementContactRead,
  postContact,
};
