const errorHandler = (err, req, res, next) => {
  console.error(err);

  let statusCode = err.statusCode || err.status || 500;
  let message = err.message || "Error interno del servidor";

  // Error de validación de Mongoose
  if (err.name === "ValidationError") {
    statusCode = 400;
    message = Object.values(err.errors)
      .map((error) => error.message)
      .join(", ");
  }

  // ID de Mongo inválido
  if (err.name === "CastError") {
    statusCode = 400;
    message = "ID no válido";
  }

  // Error de clave duplicada de Mongo/Mongoose
  if (err.code === 11000) {
    statusCode = 409;
    const duplicatedField = Object.keys(err.keyValue || {})[0];
    message = duplicatedField
      ? `El valor de "${duplicatedField}" ya existe`
      : "Ya existe un valor duplicado";
  }

  res.status(statusCode).json({
    message,
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
  });
};

module.exports = errorHandler;
