const assert = require("node:assert/strict");
const { test } = require("node:test");

const ContactMessage = require("../models/ContactMessage");
const { postContact } = require("../functions/contact");
const {
  deleteContactMessage,
  markContactMessageRead,
  prepareContactSubmission,
  requireContactMessageId,
} = require("../services/contactService");

const validBody = {
  name: " Ada ",
  email: "ada@example.com",
  subject: "Consulta",
  message: "Hola",
  turnstileToken: "test-token",
};

test("contact payload includes only validated message fields", () => {
  const { data, turnstileToken } = prepareContactSubmission(validBody);
  assert.deepEqual(data, {
    name: "Ada",
    email: "ada@example.com",
    subject: "Consulta",
    message: "Hola",
  });
  assert.equal(turnstileToken, "test-token");
});

test("contact validation rejects extra fields, invalid email and overlong text", () => {
  for (const body of [
    { ...validBody, read: true },
    { ...validBody, email: "invalid" },
    { ...validBody, name: "a".repeat(81) },
    { ...validBody, message: "a".repeat(2001) },
  ]) {
    assert.throws(() => prepareContactSubmission(body), { statusCode: 400 });
  }
});

test("missing Turnstile token returns 400", async () => {
  const response = await postContact({
    headers: new Headers({ "content-type": "application/json" }),
    json: async () => ({ ...validBody, turnstileToken: "" }),
  });
  assert.equal(response.status, 400);
  assert.deepEqual(response.jsonBody, { message: "Verificación anti-bots requerida." });
});

test("failed Turnstile verification returns 403 without saving", async () => {
  const originalFetch = global.fetch;
  const originalCreate = ContactMessage.create;
  const previousSecret = process.env.TURNSTILE_SECRET_KEY;
  let saveAttempted = false;
  process.env.TURNSTILE_SECRET_KEY = "local-test-secret";
  global.fetch = async (_url, options) => {
    assert.equal(options.body.get("response"), validBody.turnstileToken);
    assert.equal(options.body.get("secret"), "local-test-secret");
    assert.equal(options.body.has("remoteip"), false);
    return { ok: true, json: async () => ({ success: false }) };
  };
  ContactMessage.create = async () => {
    saveAttempted = true;
    throw new Error("A rejected submission must not be saved");
  };

  try {
    const response = await postContact({
      headers: new Headers({ "content-type": "application/json" }),
      json: async () => validBody,
    });
    assert.equal(response.status, 403);
    assert.deepEqual(response.jsonBody, { message: "No se pudo verificar el captcha." });
    assert.equal(saveAttempted, false);
  } finally {
    global.fetch = originalFetch;
    ContactMessage.create = originalCreate;
    if (previousSecret === undefined) delete process.env.TURNSTILE_SECRET_KEY;
    else process.env.TURNSTILE_SECRET_KEY = previousSecret;
  }
});

test("management actions validate IDs and modify only the requested message", async () => {
  assert.throws(() => requireContactMessageId("invalid"), { statusCode: 400 });
  const id = "000000000000000000000001";
  const originalUpdate = ContactMessage.findByIdAndUpdate;
  const originalDelete = ContactMessage.findByIdAndDelete;
  const updated = { _id: id, read: true };
  ContactMessage.findByIdAndUpdate = async (targetId, changes, options) => {
    assert.equal(targetId, id);
    assert.deepEqual(changes, { $set: { read: true } });
    assert.deepEqual(options, { new: true });
    return updated;
  };
  ContactMessage.findByIdAndDelete = async (targetId) => {
    assert.equal(targetId, id);
    return { _id: id };
  };

  try {
    assert.equal(await markContactMessageRead(id), updated);
    assert.deepEqual(await deleteContactMessage(id), {
      message: "Mensaje eliminado correctamente.",
    });
    ContactMessage.findByIdAndUpdate = async () => null;
    ContactMessage.findByIdAndDelete = async () => null;
    await assert.rejects(markContactMessageRead(id), { statusCode: 404 });
    await assert.rejects(deleteContactMessage(id), { statusCode: 404 });
  } finally {
    ContactMessage.findByIdAndUpdate = originalUpdate;
    ContactMessage.findByIdAndDelete = originalDelete;
  }
});
