require("dotenv").config();
const mongoose = require("mongoose");

let connectionPromise = null;

const connectDB = async ({ exitOnFailure = true } = {}) => {
  if (mongoose.connection.readyState === 1) {
    return mongoose.connection;
  }

  if (connectionPromise) {
    return connectionPromise;
  }

  try {
    if (!process.env.MONGODB_URI) {
      throw new Error("MONGODB_URI no está configurada");
    }

    connectionPromise = mongoose
      .connect(process.env.MONGODB_URI)
      .then((conn) => conn.connection);

    const connection = await connectionPromise;
    console.log("MongoDB conectada");
    return connection;
  } catch (error) {
    connectionPromise = null;
    console.error("Error conectando con MongoDB:", error.message);

    if (exitOnFailure) {
      process.exit(1);
    }

    throw error;
  }
};

module.exports = connectDB;
