const rateLimit = require("express-rate-limit");

const contactRateLimit = rateLimit({
  windowMs: 24 * 60 * 60 * 1000,
  limit: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    message:
      "Has enviado demasiados mensajes. Inténtalo de nuevo dentro de unos minutos.",
  },
});

module.exports = contactRateLimit;
