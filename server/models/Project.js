const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "El título es obligatorio"],
      trim: true,
    },

    slug: {
      type: String,
      required: [true, "El slug es obligatorio"],
      unique: true,
      trim: true,
      lowercase: true,
    },

    shortDescription: {
      type: String,
      required: [true, "La descripción corta es obligatoria"],
      trim: true,
    },

    fullDescription: {
      type: String,
      required: [true, "La descripción completa es obligatoria"],
      trim: true,
    },

    coverImage: {
      type: String,
      required: [true, "La imagen de portada es obligatoria"],
      trim: true,
    },

    gallery: [
      {
        type: String,
        trim: true,
      },
    ],

    technologies: [
      {
        type: String,
        trim: true,
      },
    ],

    githubUrl: {
      type: String,
      trim: true,
      default: "",
    },

    demoUrl: {
      type: String,
      trim: true,
      default: "",
    },

    challenges: [
      {
        type: String,
        trim: true,
      },
    ],

    solutions: [
      {
        type: String,
        trim: true,
      },
    ],

    featured: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Project", projectSchema);
