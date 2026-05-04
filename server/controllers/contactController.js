const ContactMessage = require("../models/ContactMessage");

async function createContactMessage(req, res) {
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
    return res.status(500).json({
      message: "Error al enviar el mensaje.",
    });
  }
}

async function getContactMessages(req, res) {
  try {
    const messages = await ContactMessage.find().sort({ createdAt: -1 });

    return res.json(messages);
  } catch (error) {
    return res.status(500).json({
      message: "Error al obtener los mensajes.",
    });
  }
}

async function markContactMessageAsRead(req, res) {
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
    return res.status(500).json({
      message: "Error al marcar el mensaje como leído.",
    });
  }
}

async function deleteContactMessage(req, res) {
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
    return res.status(500).json({
      message: "Error al eliminar el mensaje.",
    });
  }
}

module.exports = {
  createContactMessage,
  getContactMessages,
  markContactMessageAsRead,
  deleteContactMessage,
};
