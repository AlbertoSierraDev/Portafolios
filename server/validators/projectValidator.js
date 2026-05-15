function isValidUrl(value) {
  if (!value) return true;

  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

function isNonEmptyString(value) {
  return typeof value === "string" && value.trim().length > 0;
}

function isStringArray(value) {
  return (
    Array.isArray(value) &&
    value.every((item) => typeof item === "string" && item.trim().length > 0)
  );
}

function validateProjectPayload(payload) {
  const errors = {};

  if (!isNonEmptyString(payload.title)) {
    errors.title = "El título es obligatorio.";
  }

  if (!isNonEmptyString(payload.slug)) {
    errors.slug = "El slug es obligatorio.";
  } else if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(payload.slug)) {
    errors.slug =
      "El slug solo puede contener minúsculas, números y guiones entre palabras.";
  }

  if (!isNonEmptyString(payload.shortDescription)) {
    errors.shortDescription = "La descripción corta es obligatoria.";
  }

  if (!isNonEmptyString(payload.fullDescription)) {
    errors.fullDescription = "La descripción completa es obligatoria.";
  }

  if (!isNonEmptyString(payload.coverImage)) {
    errors.coverImage = "La imagen principal es obligatoria.";
  } else if (
    !isValidUrl(payload.coverImage) &&
    !payload.coverImage.startsWith("/")
  ) {
    errors.coverImage =
      "La imagen principal debe ser una URL válida o una ruta local.";
  }

  if (payload.githubUrl && !isValidUrl(payload.githubUrl)) {
    errors.githubUrl = "La URL de GitHub no es válida.";
  }

  if (payload.demoUrl && !isValidUrl(payload.demoUrl)) {
    errors.demoUrl = "La URL de demo no es válida.";
  }

  if (payload.gallery !== undefined && !isStringArray(payload.gallery)) {
    errors.gallery = "La galería debe ser una lista de textos no vacíos.";
  }

  if (
    payload.technologies !== undefined &&
    !isStringArray(payload.technologies)
  ) {
    errors.technologies =
      "Las tecnologías deben ser una lista de textos no vacíos.";
  }

  if (payload.challenges !== undefined && !isStringArray(payload.challenges)) {
    errors.challenges = "Los retos deben ser una lista de textos no vacíos.";
  }

  if (payload.solutions !== undefined && !isStringArray(payload.solutions)) {
    errors.solutions =
      "Las soluciones deben ser una lista de textos no vacíos.";
  }

  if (payload.featured !== undefined && typeof payload.featured !== "boolean") {
    errors.featured = "Featured debe ser verdadero o falso.";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

module.exports = {
  validateProjectPayload,
};
