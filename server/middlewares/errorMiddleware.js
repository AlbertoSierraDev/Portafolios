const errorHandler = (err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }

  console.error(err);

  let statusCode = err.statusCode || err.status || 500;
  let message = err.message || "Error interno del servidor";

  if (err.name === "ValidationError") {
    statusCode = 400;
    message = "Error de validación";
  }

  if (err.name === "CastError") {
    statusCode = 400;
    message = "ID no válido";
  }

  if (err.code === 11000) {
    statusCode = 409;
    const duplicatedField = Object.keys(err.keyValue || {})[0];
    message = duplicatedField
      ? `Ya existe un recurso con ese ${duplicatedField}`
      : "El recurso ya existe";
  }

  if (statusCode === 500 && process.env.NODE_ENV === "production") {
    message = "Error interno del servidor";
  }

  res.status(statusCode).json({
    message,
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
  });
};

module.exports = errorHandler;
