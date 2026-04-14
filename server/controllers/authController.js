const jwt = require("jsonwebtoken");

const generateToken = () => {
  return jwt.sign({ role: "admin" }, process.env.ADMIN_SECRET, {
    expiresIn: "7d",
  });
};

const loginAdmin = async (req, res) => {
  const { username, password } = req.body;

  if (
    username !== process.env.ADMIN_USERNAME ||
    password !== process.env.ADMIN_PASSWORD
  ) {
    return res.status(401).json({ message: "Credenciales incorrectas" });
  }

  const token = generateToken();

  res.cookie("admin_token", token, {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  res.status(200).json({
    message: "Login correcto",
    user: {
      username: process.env.ADMIN_USERNAME,
      role: "admin",
    },
  });
};

const logoutAdmin = async (req, res) => {
  res.cookie("admin_token", "", {
    httpOnly: true,
    expires: new Date(0),
  });

  res.status(200).json({ message: "Logout correcto" });
};

const getMeAdmin = async (req, res) => {
  res.status(200).json({
    user: {
      username: process.env.ADMIN_USERNAME,
      role: "admin",
    },
  });
};

module.exports = {
  loginAdmin,
  logoutAdmin,
  getMeAdmin,
};
