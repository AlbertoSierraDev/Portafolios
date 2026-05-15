const jwt = require("jsonwebtoken");

const protectAdmin = (req, res, next) => {
  const token = req.cookies.admin_token;

  if (!token) {
    return res.status(401).json({ message: "No autorizado" });
  }

  if (!process.env.ADMIN_SECRET) {
    return res.status(500).json({
      message: "Error de configuración del servidor",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.ADMIN_SECRET);

    if (decoded.role !== "admin") {
      return res.status(403).json({ message: "Acceso denegado" });
    }

    req.user = decoded;
    return next();
  } catch (error) {
    return res.status(401).json({ message: "Token inválido o expirado" });
  }
};

module.exports = {
  protectAdmin,
};
