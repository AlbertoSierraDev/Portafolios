const ALLOWED_FIELDS = new Set([
  "title",
  "issuer",
  "description",
  "image",
  "credentialUrl",
  "issueDate",
  "displayOrder",
  "visible",
]);

function isNonEmptyString(value) {
  return typeof value === "string" && value.trim().length > 0;
}

function isValidUrl(value) {
  if (value === null || value === undefined || value === "") return true;

  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

function isValidImageUrl(value) {
  if (!isNonEmptyString(value)) return false;
  if (/^\/uploads\/certificates\/[0-9a-f-]+\.(jpg|png|webp)$/i.test(value)) {
    return true;
  }

  try {
    const url = new URL(value);
    return url.protocol === "https:";
  } catch {
    return false;
  }
}

function isValidDate(value) {
  return value === null || value === undefined || value instanceof Date;
}

function validateCertificatePayload(payload, { partial = false } = {}) {
  const errors = {};

  for (const field of Object.keys(payload)) {
    if (!ALLOWED_FIELDS.has(field)) {
      errors[field] = "Campo no permitido.";
    }
  }

  if (!partial || payload.title !== undefined) {
    if (!isNonEmptyString(payload.title)) {
      errors.title = "El título es obligatorio.";
    } else if (payload.title.trim().length > 160) {
      errors.title = "El título no puede superar los 160 caracteres.";
    }
  }

  if (!partial || payload.issuer !== undefined) {
    if (!isNonEmptyString(payload.issuer)) {
      errors.issuer = "La entidad emisora es obligatoria.";
    } else if (payload.issuer.trim().length > 160) {
      errors.issuer = "La entidad emisora no puede superar los 160 caracteres.";
    }
  }

  if (!partial || payload.description !== undefined) {
    if (!isNonEmptyString(payload.description)) {
      errors.description = "La descripción es obligatoria.";
    } else if (payload.description.trim().length > 2000) {
      errors.description = "La descripción no puede superar los 2000 caracteres.";
    }
  }

  if (!partial || payload.image !== undefined) {
    if (!isValidImageUrl(payload.image)) {
      errors.image =
        "La imagen debe ser una URL HTTPS válida o una ruta existente de certificados.";
    }
  }

  if (payload.credentialUrl !== undefined && !isValidUrl(payload.credentialUrl)) {
    errors.credentialUrl = "La URL de credencial debe usar http o https.";
  }

  if (payload.issueDate !== undefined && !isValidDate(payload.issueDate)) {
    errors.issueDate = "La fecha de emisión no es válida.";
  }

  if (
    payload.displayOrder !== undefined &&
    (!Number.isInteger(payload.displayOrder) || payload.displayOrder < 0)
  ) {
    errors.displayOrder = "El orden debe ser un entero mayor o igual que 0.";
  }

  if (payload.visible !== undefined && typeof payload.visible !== "boolean") {
    errors.visible = "Visible debe ser verdadero o falso.";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

module.exports = {
  ALLOWED_FIELDS,
  validateCertificatePayload,
};
