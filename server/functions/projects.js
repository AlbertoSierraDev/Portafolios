const { app } = require("@azure/functions");

const connectDB = require("../config/db");
const {
  listProjects,
  findProjectBySlug,
} = require("../services/projectService");
const { toJsonResponse, toErrorResponse } = require("./httpResponse");

async function getProjects() {
  try {
    await connectDB({ exitOnFailure: false });
    const projects = await listProjects();
    return toJsonResponse(projects);
  } catch (error) {
    return toErrorResponse(error);
  }
}

async function getProjectBySlug(request) {
  try {
    await connectDB({ exitOnFailure: false });

    const project = await findProjectBySlug(request.params.slug);

    if (!project) {
      return toJsonResponse({ message: "Proyecto no encontrado" }, 404);
    }

    return toJsonResponse(project);
  } catch (error) {
    return toErrorResponse(error);
  }
}

app.http("getProjects", {
  methods: ["GET"],
  authLevel: "anonymous",
  route: "projects",
  handler: getProjects,
});

app.http("getProjectBySlug", {
  methods: ["GET"],
  authLevel: "anonymous",
  route: "projects/{slug}",
  handler: getProjectBySlug,
});

module.exports = {
  getProjects,
  getProjectBySlug,
};
