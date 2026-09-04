const mongoose = require("mongoose");

const certificateSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "El título es obligatorio"],
      trim: true,
      maxlength: 160,
    },

    issuer: {
      type: String,
      required: [true, "La entidad emisora es obligatoria"],
      trim: true,
      maxlength: 160,
    },

    description: {
      type: String,
      required: [true, "La descripción es obligatoria"],
      trim: true,
      maxlength: 2000,
    },

    image: {
      type: String,
      required: [true, "La imagen es obligatoria"],
      trim: true,
    },

    credentialUrl: {
      type: String,
      trim: true,
      default: null,
    },

    issueDate: {
      type: Date,
      default: null,
    },

    displayOrder: {
      type: Number,
      min: 0,
      validate: {
        validator: Number.isInteger,
        message: "El orden debe ser un número entero",
      },
      default: 0,
    },

    visible: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
);

certificateSchema.index({ visible: 1, displayOrder: 1 });

module.exports = mongoose.model("Certificate", certificateSchema);
