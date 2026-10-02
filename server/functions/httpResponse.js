function toJsonResponse(body, status = 200) {
  return {
    status,
    jsonBody: body,
  };
}

function toErrorResponse(error) {
  console.error(error);

  let status = error.statusCode || error.status || 500;
  let message = error.message || "Error interno del servidor";

  if (error.name === "ValidationError") {
    status = 400;
    message = "Error de validación";
  }

  if (error.name === "CastError") {
    status = 400;
    message = "ID no válido";
  }

  if (error.code === 11000) {
    status = 409;
    const duplicatedField = Object.keys(error.keyValue || {})[0];
    message = duplicatedField
      ? `Ya existe un recurso con ese ${duplicatedField}`
      : "El recurso ya existe";
  }

  if (status === 500 && process.env.NODE_ENV === "production") {
    message = "Error interno del servidor";
  }

  return toJsonResponse(
    {
      message,
      stack: process.env.NODE_ENV === "development" ? error.stack : undefined,
    },
    status,
  );
}

module.exports = {
  toJsonResponse,
  toErrorResponse,
};
