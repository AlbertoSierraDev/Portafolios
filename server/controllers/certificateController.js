const fs = require("fs");
const path = require("path");
const mongoose = require("mongoose");
const Certificate = require("../models/Certificate");
const {
  ALLOWED_FIELDS,
  validateCertificatePayload,
} = require("../validators/certificateValidator");
const {
  CERTIFICATES_UPLOAD_DIR,
  removeUploadedFile,
} = require("../middlewares/certificateUploadMiddleware");

const CERTIFICATE_IMAGE_PREFIX = "/uploads/certificates/";

function getCertificateImagePath(image) {
  if (typeof image !== "string" || !image.startsWith(CERTIFICATE_IMAGE_PREFIX)) {
    return null;
  }

  const filename = image.slice(CERTIFICATE_IMAGE_PREFIX.length);
  if (!/^[0-9a-f-]+\.(jpg|png|webp)$/i.test(filename)) return null;

  const resolvedPath = path.resolve(CERTIFICATES_UPLOAD_DIR, filename);
  if (!resolvedPath.startsWith(`${CERTIFICATES_UPLOAD_DIR}${path.sep}`)) {
    return null;
  }

  return resolvedPath;
}

async function removeCertificateImage(image) {
  const imagePath = getCertificateImagePath(image);
  if (!imagePath) return;
  await removeUploadedFile(imagePath);
}

function getPublicImageUrl(file) {
  return `${CERTIFICATE_IMAGE_PREFIX}${file.filename}`;
}

function parseOptionalBoolean(value, field) {
  if (value === undefined) return undefined;
  if (typeof value === "boolean") return value;
  if (value === "true") return true;
  if (value === "false") return false;
  throw new Error(`${field} debe ser verdadero o falso.`);
}

function parseOptionalInteger(value, field) {
  if (value === undefined) return undefined;
  if (typeof value === "number" && Number.isInteger(value)) return value;
  if (typeof value === "string" && /^\d+$/.test(value)) return Number(value);
  throw new Error(`${field} debe ser un entero mayor o igual que 0.`);
}

function parseStrictOrder(value) {
  if (
    typeof value !== "number" ||
    !Number.isFinite(value) ||
    !Number.isInteger(value) ||
    value < 0
  ) {
    throw new Error("El orden debe ser un entero mayor o igual que 0.");
  }

  return value;
}

function parseOptionalDate(value) {
  if (value === undefined) return undefined;
  if (value === null || value === "") return null;

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    throw new Error("La fecha de emisión no es válida.");
  }

  return date;
}

function buildCertificatePayload(body, { partial = false } = {}) {
  const bodyKeys = Object.keys(body || {});
  const unknownField = bodyKeys.find((field) => !ALLOWED_FIELDS.has(field));
  if (unknownField) {
    return {
      payload: {},
      validation: {
        isValid: false,
        errors: { [unknownField]: "Campo no permitido." },
      },
    };
  }

  let payload;
  try {
    payload = {};

    if (body.title !== undefined) payload.title = body.title;
    if (body.issuer !== undefined) payload.issuer = body.issuer;
    if (body.description !== undefined) payload.description = body.description;
    if (body.credentialUrl !== undefined) {
      payload.credentialUrl = body.credentialUrl === "" ? null : body.credentialUrl;
    }
    if (body.issueDate !== undefined) payload.issueDate = parseOptionalDate(body.issueDate);
    if (body.displayOrder !== undefined) {
      payload.displayOrder = parseOptionalInteger(body.displayOrder, "El orden");
    }
    if (body.visible !== undefined) {
      payload.visible = parseOptionalBoolean(body.visible, "Visible");
    }
  } catch (error) {
    return {
      payload: {},
      validation: {
        isValid: false,
        errors: { payload: error.message },
      },
    };
  }

  return {
    payload,
    validation: validateCertificatePayload(payload, { partial }),
  };
}

function sendValidationError(res, validation) {
  return res.status(400).json({
    message: "Datos de certificado inválidos",
    errors: validation.errors,
  });
}

async function getPublicCertificates(_req, res, next) {
  try {
    const certificates = await Certificate.find({ visible: true })
      .select("title issuer description image credentialUrl issueDate displayOrder createdAt updatedAt")
      .sort({ displayOrder: 1, createdAt: 1 })
      .lean();

    return res.status(200).json(certificates);
  } catch (error) {
    return next(error);
  }
}

async function getAdminCertificates(_req, res, next) {
  try {
    const certificates = await Certificate.find()
      .sort({ displayOrder: 1, createdAt: 1 })
      .lean();

    return res.status(200).json(certificates);
  } catch (error) {
    return next(error);
  }
}

async function createCertificate(req, res, next) {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "La imagen es obligatoria." });
    }

    const { payload, validation } = buildCertificatePayload(req.body);
    if (!validation.isValid) {
      await removeUploadedFile(req.file.path).catch(() => undefined);
      return sendValidationError(res, validation);
    }

    const certificate = await Certificate.create({
      ...payload,
      image: getPublicImageUrl(req.file),
    });

    return res.status(201).json(certificate);
  } catch (error) {
    if (req.file?.path) await removeUploadedFile(req.file.path).catch(() => undefined);
    return next(error);
  }
}

async function updateCertificate(req, res, next) {
  let newImagePath;

  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: "ID no válido" });
    }

    const { payload, validation } = buildCertificatePayload(req.body, { partial: true });
    if (!validation.isValid) {
      if (req.file?.path) await removeUploadedFile(req.file.path).catch(() => undefined);
      return sendValidationError(res, validation);
    }

    const certificate = await Certificate.findById(req.params.id);
    if (!certificate) {
      if (req.file?.path) await removeUploadedFile(req.file.path).catch(() => undefined);
      return res.status(404).json({ message: "Certificado no encontrado" });
    }

    const oldImage = certificate.image;
    if (req.file) {
      newImagePath = req.file.path;
      payload.image = getPublicImageUrl(req.file);
    }

    Object.assign(certificate, payload);
    await certificate.save();

    if (req.file) {
      await removeCertificateImage(oldImage).catch((error) => {
        console.error("No se pudo eliminar la imagen anterior del certificado:", error.message);
      });
    }

    return res.status(200).json(certificate);
  } catch (error) {
    if (newImagePath) await removeUploadedFile(newImagePath).catch(() => undefined);
    return next(error);
  }
}

async function updateCertificateVisibility(req, res, next) {
  try {
    const bodyKeys = Object.keys(req.body || {});
    if (bodyKeys.length !== 1 || bodyKeys[0] !== "visible") {
      return res.status(400).json({ message: "Solo se permite modificar visible." });
    }

    const visible = parseOptionalBoolean(req.body.visible, "Visible");
    if (visible === undefined) {
      return res.status(400).json({ message: "Visible es obligatorio." });
    }

    const certificate = await Certificate.findByIdAndUpdate(
      req.params.id,
      { $set: { visible } },
      { new: true, runValidators: true },
    );

    if (!certificate) return res.status(404).json({ message: "Certificado no encontrado" });
    return res.status(200).json(certificate);
  } catch (error) {
    if (error.message === "Visible debe ser verdadero o falso.") {
      return res.status(400).json({ message: error.message });
    }

    return next(error);
  }
}

async function updateCertificateOrder(req, res, next) {
  try {
    const { items } = req.body || {};
    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: "items debe ser una lista no vacía." });
    }

    const seenIds = new Set();
    const seenOrders = new Set();
    const updates = items.map((item) => {
      if (!item || typeof item !== "object" || Array.isArray(item)) {
        throw new Error("Cada elemento debe contener id y displayOrder.");
      }

      const itemKeys = Object.keys(item);
      if (itemKeys.some((key) => key !== "id" && key !== "displayOrder")) {
        throw new Error("Cada elemento contiene campos no permitidos.");
      }

      if (!mongoose.isValidObjectId(item.id)) throw new Error("ID no válido");
      if (seenIds.has(String(item.id))) throw new Error("No se permiten IDs repetidos.");
      seenIds.add(String(item.id));

      if (item.displayOrder === undefined) throw new Error("El orden es obligatorio.");
      const displayOrder = parseStrictOrder(item.displayOrder);
      if (seenOrders.has(displayOrder)) throw new Error("No se permiten órdenes repetidos.");
      seenOrders.add(displayOrder);

      return {
        updateOne: {
          filter: { _id: item.id },
          update: { $set: { displayOrder } },
        },
      };
    });

    const result = await Certificate.bulkWrite(updates);
    if (result.matchedCount !== items.length) {
      return res.status(404).json({ message: "Uno o más certificados no existen." });
    }

    return res.status(200).json({ message: "Orden actualizado correctamente" });
  } catch (error) {
    if (error.message === "ID no válido") return res.status(400).json({ message: error.message });
    return res.status(400).json({ message: error.message || "Orden inválido" });
  }
}

async function deleteCertificate(req, res, next) {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: "ID no válido" });
    }

    const certificate = await Certificate.findByIdAndDelete(req.params.id);
    if (!certificate) return res.status(404).json({ message: "Certificado no encontrado" });

    await removeCertificateImage(certificate.image).catch((error) => {
      console.error("No se pudo eliminar la imagen del certificado:", error.message);
    });

    return res.status(200).json({ message: "Certificado eliminado correctamente" });
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  getPublicCertificates,
  getAdminCertificates,
  createCertificate,
  updateCertificate,
  updateCertificateVisibility,
  updateCertificateOrder,
  deleteCertificate,
};
