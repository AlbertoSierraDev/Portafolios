const Project = require("../models/Project");
const { validateProjectPayload } = require("../validators/projectValidator");

const getProjects = async (req, res, next) => {
  try {
    const projects = await Project.find().sort({ featured: -1, createdAt: -1 });
    res.status(200).json(projects);
  } catch (error) {
    next(error);
  }
};

const getProjectBySlug = async (req, res, next) => {
  try {
    const project = await Project.findOne({ slug: req.params.slug });

    if (!project) {
      return res.status(404).json({ message: "Proyecto no encontrado" });
    }

    res.status(200).json(project);
  } catch (error) {
    next(error);
  }
};

const createProject = async (req, res, next) => {
  try {
    const validation = validateProjectPayload(req.body);

    if (!validation.isValid) {
      return res.status(400).json({
        message: "Datos de proyecto inválidos",
        errors: validation.errors,
      });
    }

    const { slug } = req.body;

    const existingProject = await Project.findOne({ slug });

    if (existingProject) {
      return res.status(409).json({ message: "Ese slug ya existe" });
    }

    const project = await Project.create(req.body);

    res.status(201).json(project);
  } catch (error) {
    next(error);
  }
};

const updateProject = async (req, res, next) => {
  try {
    const validation = validateProjectPayload(req.body);

    if (!validation.isValid) {
      return res.status(400).json({
        message: "Datos de proyecto inválidos",
        errors: validation.errors,
      });
    }

    const project = await Project.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!project) {
      return res.status(404).json({ message: "Proyecto no encontrado" });
    }

    res.status(200).json(project);
  } catch (error) {
    next(error);
  }
};

const deleteProject = async (req, res, next) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);

    if (!project) {
      return res.status(404).json({ message: "Proyecto no encontrado" });
    }

    res.status(200).json({ message: "Proyecto eliminado correctamente" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getProjects,
  getProjectBySlug,
  createProject,
  updateProject,
  deleteProject,
};
