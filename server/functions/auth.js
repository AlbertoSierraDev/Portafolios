const { app } = require("@azure/functions");

const {
  clearAdminCookie,
  createAdminCookie,
  generateAdminToken,
  getAdminUser,
  requireAdmin,
  validateAdminCredentials,
} = require("../services/authService");
const { toJsonResponse, toErrorResponse } = require("./httpResponse");

async function readJsonBody(request) {
  try {
    return await request.json();
  } catch {
    return {};
  }
}

async function loginAdmin(request) {
  try {
    const { username, password } = await readJsonBody(request);

    if (!validateAdminCredentials(username, password)) {
      return toJsonResponse({ message: "Credenciales incorrectas" }, 401);
    }

    const token = generateAdminToken();
    const response = toJsonResponse({
      message: "Login correcto",
      user: getAdminUser(),
    });

    response.headers = {
      "Set-Cookie": createAdminCookie(token),
    };

    return response;
  } catch (error) {
    return toErrorResponse(error);
  }
}

async function getMeAdmin(request) {
  try {
    requireAdmin(request);

    return toJsonResponse({
      user: getAdminUser(),
    });
  } catch (error) {
    return toErrorResponse(error);
  }
}

async function logoutAdmin() {
  const response = toJsonResponse({ message: "Logout correcto" });

  response.headers = {
    "Set-Cookie": clearAdminCookie(),
  };

  return response;
}

app.http("loginAdmin", {
  methods: ["POST"],
  authLevel: "anonymous",
  route: "auth/login",
  handler: loginAdmin,
});

app.http("getMeAdmin", {
  methods: ["GET"],
  authLevel: "anonymous",
  route: "auth/me",
  handler: getMeAdmin,
});

app.http("logoutAdmin", {
  methods: ["POST"],
  authLevel: "anonymous",
  route: "auth/logout",
  handler: logoutAdmin,
});

module.exports = {
  getMeAdmin,
  loginAdmin,
  logoutAdmin,
};
