const { app } = require("@azure/functions");

const connectDB = require("../config/db");
const {
  createAdminProject,
  deleteAdminProject,
  listAdminProjects,
  updateAdminProject,
} = require("../services/adminProjectService");
const { requireAdmin } = require("../services/authService");
const { toJsonResponse, toErrorResponse } = require("./httpResponse");

async function readJsonBody(request) {
  try {
    return await request.json();
  } catch {
    return {};
  }
}

function toFunctionErrorResponse(error) {
  if (error.body) {
    return toJsonResponse(error.body, error.statusCode || 500);
  }

  return toErrorResponse(error);
}

async function getAdminProjects(request) {
  try {
    requireAdmin(request);
    await connectDB({ exitOnFailure: false });

    const projects = await listAdminProjects();
    return toJsonResponse(projects);
  } catch (error) {
    return toFunctionErrorResponse(error);
  }
}

async function postAdminProject(request) {
  try {
    requireAdmin(request);
    await connectDB({ exitOnFailure: false });

    const body = await readJsonBody(request);
    const project = await createAdminProject(body);
    return toJsonResponse(project, 201);
  } catch (error) {
    return toFunctionErrorResponse(error);
  }
}

async function putAdminProject(request) {
  try {
    requireAdmin(request);
    await connectDB({ exitOnFailure: false });

    const body = await readJsonBody(request);
    const project = await updateAdminProject(request.params.id, body);
    return toJsonResponse(project);
  } catch (error) {
    return toFunctionErrorResponse(error);
  }
}

async function deleteAdminProjectFunction(request) {
  try {
    requireAdmin(request);
    await connectDB({ exitOnFailure: false });

    const result = await deleteAdminProject(request.params.id);
    return toJsonResponse(result);
  } catch (error) {
    return toFunctionErrorResponse(error);
  }
}

app.http("getAdminProjects", {
  methods: ["GET"],
  authLevel: "anonymous",
  route: "management/projects",
  handler: getAdminProjects,
});

app.http("postAdminProject", {
  methods: ["POST"],
  authLevel: "anonymous",
  route: "management/projects",
  handler: postAdminProject,
});

app.http("putAdminProject", {
  methods: ["PUT"],
  authLevel: "anonymous",
  route: "management/projects/{id}",
  handler: putAdminProject,
});

app.http("deleteAdminProject", {
  methods: ["DELETE"],
  authLevel: "anonymous",
  route: "management/projects/{id}",
  handler: deleteAdminProjectFunction,
});

module.exports = {
  deleteAdminProjectFunction,
  getAdminProjects,
  postAdminProject,
  putAdminProject,
};
