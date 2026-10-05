const mongoose = require("mongoose");

const Certificate = require("../models/Certificate");
const {
  ALLOWED_FIELDS,
  validateCertificatePayload,
} = require("../validators/certificateValidator");

function clientError(message, statusCode = 400, errors) {
  const error = new Error(message);
  error.statusCode = statusCode;
  if (errors) error.body = { message, errors };
  return error;
}

function requireCertificateId(id) {
  if (!mongoose.isValidObjectId(id)) throw clientError("ID no válido");
  return id;
}

function parseOptionalBoolean(value) {
  if (typeof value === "boolean") return value;
  if (value === "true") return true;
  if (value === "false") return false;
  throw clientError("Visible debe ser verdadero o falso.");
}

function parseDisplayOrder(value) {
  if (typeof value === "number" && Number.isInteger(value) && value >= 0) return value;
  if (typeof value === "string" && /^\d+$/.test(value) && Number.isSafeInteger(Number(value))) {
    return Number(value);
  }
  throw clientError("El orden debe ser un entero mayor o igual que 0.");
}

function parseIssueDate(value) {
  if (value === null || value === "") return null;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) throw clientError("La fecha de emisión no es válida.");
  return date;
}

function prepareCertificatePayload(body, { partial = false } = {}) {
  const unknownField = Object.keys(body).find((field) => !ALLOWED_FIELDS.has(field));
  if (unknownField) {
    throw clientError("Datos de certificado inválidos", 400, {
      [unknownField]: "Campo no permitido.",
    });
  }

  const payload = {};
  for (const field of ["title", "issuer", "description", "image"]) {
    if (body[field] !== undefined) payload[field] = body[field];
  }
  if (body.credentialUrl !== undefined) {
    payload.credentialUrl = body.credentialUrl === "" ? null : body.credentialUrl;
  }
  if (body.issueDate !== undefined) payload.issueDate = parseIssueDate(body.issueDate);
  if (body.displayOrder !== undefined) payload.displayOrder = parseDisplayOrder(body.displayOrder);
  if (body.visible !== undefined) payload.visible = parseOptionalBoolean(body.visible);

  const validation = validateCertificatePayload(payload, { partial });
  if (!validation.isValid) {
    throw clientError("Datos de certificado inválidos", 400, validation.errors);
  }
  return payload;
}

function prepareVisibility(body) {
  if (Object.keys(body).length !== 1 || !Object.hasOwn(body, "visible")) {
    throw clientError("Solo se permite modificar visible.");
  }
  return parseOptionalBoolean(body.visible);
}

function prepareOrder(body) {
  const { items } = body;
  if (!Array.isArray(items) || items.length === 0) {
    throw clientError("items debe ser una lista no vacía.");
  }

  const seenIds = new Set();
  const seenOrders = new Set();
  return items.map((item) => {
    if (!item || typeof item !== "object" || Array.isArray(item)) {
      throw clientError("Cada elemento debe contener id y displayOrder.");
    }
    if (Object.keys(item).some((key) => key !== "id" && key !== "displayOrder")) {
      throw clientError("Cada elemento contiene campos no permitidos.");
    }
    const id = requireCertificateId(item.id);
    const idKey = String(id).toLowerCase();
    if (seenIds.has(idKey)) throw clientError("No se permiten IDs repetidos.");
    seenIds.add(idKey);
    if (item.displayOrder === undefined) throw clientError("El orden es obligatorio.");
    const displayOrder = parseDisplayOrder(item.displayOrder);
    if (seenOrders.has(displayOrder)) throw clientError("No se permiten órdenes repetidos.");
    seenOrders.add(displayOrder);
    return { id, displayOrder };
  });
}

async function listAdminCertificates() {
  return Certificate.find().sort({ displayOrder: 1, createdAt: 1 }).lean();
}

async function createAdminCertificate(payload) {
  return Certificate.create(payload);
}

async function updateAdminCertificate(id, payload) {
  const certificate = await Certificate.findById(id);
  if (!certificate) throw clientError("Certificado no encontrado", 404);
  Object.assign(certificate, payload);
  return certificate.save();
}

async function setCertificateVisibility(id, visible) {
  const certificate = await Certificate.findByIdAndUpdate(
    id,
    { $set: { visible } },
    { new: true, runValidators: true },
  );
  if (!certificate) throw clientError("Certificado no encontrado", 404);
  return certificate;
}

async function updateCertificateOrder(items) {
  const ids = items.map(({ id }) => id);
  const existingCount = await Certificate.countDocuments({ _id: { $in: ids } });
  if (existingCount !== items.length) {
    throw clientError("Uno o más certificados no existen.", 404);
  }

  const updates = items.map(({ id, displayOrder }) => ({
    updateOne: { filter: { _id: id }, update: { $set: { displayOrder } } },
  }));
  const result = await Certificate.bulkWrite(updates);
  if (result.matchedCount !== items.length) {
    throw clientError("Uno o más certificados no existen.", 404);
  }
  return { message: "Orden actualizado correctamente" };
}

async function deleteAdminCertificate(id) {
  const certificate = await Certificate.findByIdAndDelete(id);
  if (!certificate) throw clientError("Certificado no encontrado", 404);
  return { message: "Certificado eliminado correctamente" };
}

module.exports = {
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
};
