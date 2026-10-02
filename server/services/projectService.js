const Project = require("../models/Project");

const listProjects = () => Project.find().sort({ featured: -1, createdAt: -1 });

const findProjectBySlug = (slug) => Project.findOne({ slug });

module.exports = {
  listProjects,
  findProjectBySlug,
};
