const ContactMessage = require("../models/ContactMessage");

async function createContactMessage(req, res, next) {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        message: "Todos los campos son obligatorios.",
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return res.status(400).json({
        message: "El email no tiene un formato válido.",
      });
    }

    const contactMessage = await ContactMessage.create({
      name,
      email,
      subject,
      message,
    });

    return res.status(201).json({
      message: "Mensaje enviado correctamente.",
      contactMessage,
    });
  } catch (error) {
    next(error);
  }
}

async function getContactMessages(req, res, next) {
  try {
    const messages = await ContactMessage.find().sort({ createdAt: -1 });

    return res.json(messages);
  } catch (error) {
    next(error);
  }
}

async function markContactMessageAsRead(req, res, next) {
  try {
    const { id } = req.params;

    const message = await ContactMessage.findByIdAndUpdate(
      id,
      { read: true },
      { new: true },
    );

    if (!message) {
      return res.status(404).json({
        message: "Mensaje no encontrado.",
      });
    }

    return res.json(message);
  } catch (error) {
    next(error);
  }
}

async function deleteContactMessage(req, res, next) {
  try {
    const { id } = req.params;

    const message = await ContactMessage.findByIdAndDelete(id);

    if (!message) {
      return res.status(404).json({
        message: "Mensaje no encontrado.",
      });
    }

    return res.json({
      message: "Mensaje eliminado correctamente.",
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  createContactMessage,
  getContactMessages,
  markContactMessageAsRead,
  deleteContactMessage,
};
