const mongoose = require("mongoose");

const Project = require("../models/Project");
const { validateProjectPayload } = require("../validators/projectValidator");

const PROJECT_FIELDS = [
  "title",
  "slug",
  "shortDescription",
  "fullDescription",
  "coverImage",
  "gallery",
  "technologies",
  "githubUrl",
  "demoUrl",
  "challenges",
  "solutions",
  "featured",
];

function pickProjectPayload(body = {}) {
  return PROJECT_FIELDS.reduce((payload, field) => {
    if (body[field] !== undefined) {
      payload[field] = body[field];
    }

    return payload;
  }, {});
}

function createValidationError(validation) {
  const error = new Error("Datos de proyecto inválidos");
  error.statusCode = 400;
  error.body = {
    message: "Datos de proyecto inválidos",
    errors: validation.errors,
  };
  return error;
}

function validateProjectData(payload) {
  const validation = validateProjectPayload(payload);

  if (!validation.isValid) {
    throw createValidationError(validation);
  }
}

async function listAdminProjects() {
  return Project.find().sort({ featured: -1, createdAt: -1 });
}

async function createAdminProject(body) {
  const payload = pickProjectPayload(body);
  validateProjectData(payload);

  const existingProject = await Project.findOne({ slug: payload.slug });

  if (existingProject) {
    const error = new Error("Ese slug ya existe");
    error.statusCode = 409;
    throw error;
  }

  return Project.create(payload);
}

async function updateAdminProject(id, body) {
  if (!mongoose.isValidObjectId(id)) {
    const error = new Error("ID no válido");
    error.statusCode = 400;
    throw error;
  }

  const payload = pickProjectPayload(body);
  validateProjectData(payload);

  const project = await Project.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });

  if (!project) {
    const error = new Error("Proyecto no encontrado");
    error.statusCode = 404;
    throw error;
  }

  return project;
}

async function deleteAdminProject(id) {
  if (!mongoose.isValidObjectId(id)) {
    const error = new Error("ID no válido");
    error.statusCode = 400;
    throw error;
  }

  const project = await Project.findByIdAndDelete(id);

  if (!project) {
    const error = new Error("Proyecto no encontrado");
    error.statusCode = 404;
    throw error;
  }

  return { message: "Proyecto eliminado correctamente" };
}

module.exports = {
  createAdminProject,
  deleteAdminProject,
  listAdminProjects,
  updateAdminProject,
};
