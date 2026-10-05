const mongoose = require("mongoose");

const ContactMessage = require("../models/ContactMessage");

const CONTACT_FIELDS = ["name", "email", "subject", "message"];
const ALLOWED_FIELDS = new Set([...CONTACT_FIELDS, "turnstileToken"]);
const MAX_LENGTHS = { name: 80, email: 120, subject: 120, message: 2000 };
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function contactError(message, statusCode = 400) {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
}

function prepareContactSubmission(body) {
  if (Object.keys(body).some((field) => !ALLOWED_FIELDS.has(field))) {
    throw contactError("Campo no permitido.");
  }
  if (typeof body.turnstileToken !== "string" || !body.turnstileToken.trim()) {
    throw contactError("Verificación anti-bots requerida.");
  }
  if (body.turnstileToken.length > 2048) {
    throw contactError("No se pudo verificar el captcha.", 403);
  }

  const data = {};
  for (const field of CONTACT_FIELDS) {
    if (typeof body[field] !== "string" || !body[field].trim()) {
      throw contactError("Todos los campos son obligatorios.");
    }
    data[field] = body[field].trim();
    if (data[field].length > MAX_LENGTHS[field]) {
      throw contactError("Uno o más campos superan la longitud permitida.");
    }
  }
  if (!EMAIL_REGEX.test(data.email)) {
    throw contactError("El email no tiene un formato válido.");
  }

  return { data, turnstileToken: body.turnstileToken };
}

async function verifyTurnstileToken(turnstileToken) {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) throw contactError("Error de configuración del servidor", 500);

  const formData = new FormData();
  formData.append("secret", secret);
  formData.append("response", turnstileToken);

  const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    body: formData,
    signal: AbortSignal.timeout(10000),
  });
  if (!response.ok || !(await response.json()).success) {
    throw contactError("No se pudo verificar el captcha.", 403);
  }
}

function requireContactMessageId(id) {
  if (!mongoose.isValidObjectId(id)) throw contactError("ID no válido");
  return id;
}

async function createContactMessage(data) {
  return ContactMessage.create(data);
}

async function listContactMessages() {
  return ContactMessage.find().sort({ createdAt: -1 });
}

async function markContactMessageRead(id) {
  const message = await ContactMessage.findByIdAndUpdate(
    id,
    { $set: { read: true } },
    { new: true },
  );
  if (!message) throw contactError("Mensaje no encontrado.", 404);
  return message;
}

async function deleteContactMessage(id) {
  const message = await ContactMessage.findByIdAndDelete(id);
  if (!message) throw contactError("Mensaje no encontrado.", 404);
  return { message: "Mensaje eliminado correctamente." };
}

module.exports = {
  createContactMessage,
  deleteContactMessage,
  listContactMessages,
  markContactMessageRead,
  prepareContactSubmission,
  requireContactMessageId,
  verifyTurnstileToken,
};
