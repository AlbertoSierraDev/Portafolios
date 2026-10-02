const jwt = require("jsonwebtoken");

const ADMIN_COOKIE_NAME = "admin_token";
const TOKEN_EXPIRES_IN = "7d";
const COOKIE_MAX_AGE_SECONDS = 7 * 24 * 60 * 60;

function getRequiredAdminConfig() {
  const { ADMIN_USERNAME, ADMIN_PASSWORD, ADMIN_SECRET } = process.env;

  if (!ADMIN_USERNAME || !ADMIN_PASSWORD || !ADMIN_SECRET) {
    const error = new Error("Error de configuración del servidor");
    error.statusCode = 500;
    throw error;
  }

  return {
    username: ADMIN_USERNAME,
    password: ADMIN_PASSWORD,
    secret: ADMIN_SECRET,
  };
}

function getAdminUser() {
  const { username } = getRequiredAdminConfig();
  return {
    username,
    role: "admin",
  };
}

function validateAdminCredentials(username, password) {
  const config = getRequiredAdminConfig();
  return username === config.username && password === config.password;
}

function generateAdminToken() {
  const { secret } = getRequiredAdminConfig();
  return jwt.sign({ role: "admin" }, secret, {
    expiresIn: TOKEN_EXPIRES_IN,
  });
}

function verifyAdminToken(token) {
  if (!token) {
    const error = new Error("No autorizado");
    error.statusCode = 401;
    throw error;
  }

  const { secret } = getRequiredAdminConfig();

  try {
    const decoded = jwt.verify(token, secret);

    if (decoded.role !== "admin") {
      const error = new Error("Acceso denegado");
      error.statusCode = 403;
      throw error;
    }

    return decoded;
  } catch (error) {
    if (error.statusCode) throw error;

    const authError = new Error("Token inválido o expirado");
    authError.statusCode = 401;
    throw authError;
  }
}

function parseCookies(cookieHeader = "") {
  return cookieHeader.split(";").reduce((cookies, item) => {
    const separatorIndex = item.indexOf("=");
    if (separatorIndex === -1) return cookies;

    const name = item.slice(0, separatorIndex).trim();
    const value = item.slice(separatorIndex + 1).trim();
    if (name) cookies[name] = decodeURIComponent(value);

    return cookies;
  }, {});
}

function getAdminTokenFromRequest(request) {
  const cookieHeader = request.headers.get("cookie") || "";
  return parseCookies(cookieHeader)[ADMIN_COOKIE_NAME];
}

function isSecureCookieEnvironment() {
  return process.env.NODE_ENV === "production" || Boolean(process.env.WEBSITE_SITE_NAME);
}

function getAdminCookieAttributes() {
  const secure = isSecureCookieEnvironment();

  return {
    httpOnly: true,
    secure,
    sameSite: secure ? "None" : "Lax",
    path: "/",
  };
}

function serializeCookie(name, value, options = {}) {
  const parts = [`${name}=${encodeURIComponent(value)}`];

  if (options.maxAge !== undefined) parts.push(`Max-Age=${options.maxAge}`);
  if (options.expires) parts.push(`Expires=${options.expires.toUTCString()}`);
  if (options.path) parts.push(`Path=${options.path}`);
  if (options.httpOnly) parts.push("HttpOnly");
  if (options.secure) parts.push("Secure");
  if (options.sameSite) parts.push(`SameSite=${options.sameSite}`);

  return parts.join("; ");
}

function createAdminCookie(token) {
  return serializeCookie(ADMIN_COOKIE_NAME, token, {
    ...getAdminCookieAttributes(),
    maxAge: COOKIE_MAX_AGE_SECONDS,
  });
}

function clearAdminCookie() {
  return serializeCookie(ADMIN_COOKIE_NAME, "", {
    ...getAdminCookieAttributes(),
    expires: new Date(0),
    maxAge: 0,
  });
}

function requireAdmin(request) {
  const token = getAdminTokenFromRequest(request);
  return verifyAdminToken(token);
}

module.exports = {
  ADMIN_COOKIE_NAME,
  createAdminCookie,
  clearAdminCookie,
  generateAdminToken,
  getAdminUser,
  requireAdmin,
  validateAdminCredentials,
  verifyAdminToken,
};
