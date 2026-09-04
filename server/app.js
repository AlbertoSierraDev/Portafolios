const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");
const path = require("path");

const projectRoutes = require("./routes/projectRoutes");
const adminProjectRoutes = require("./routes/adminProjectRoutes");
const certificateRoutes = require("./routes/certificateRoutes");
const adminCertificateRoutes = require("./routes/adminCertificateRoutes");
const authRoutes = require("./routes/authRoutes");
const contactRoutes = require("./routes/contactRoutes");
const notFound = require("./middlewares/notFoundMiddleware");
const errorHandler = require("./middlewares/errorMiddleware");

const app = express();

app.set("trust proxy", 1);

app.use(
  helmet({
    crossOriginResourcePolicy: false,
  }),
);

const allowedOrigins = [
  "http://localhost:5173",
  process.env.CORS_ORIGIN,
].filter(Boolean);

app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      const corsError = new Error("Origen no permitido por CORS");
      corsError.statusCode = 403;
      return callback(corsError);
    },
    credentials: true,
  }),
);

app.use(express.json({ limit: "100kb" }));
app.use(cookieParser());

app.use(
  "/uploads/certificates",
  express.static(path.resolve(__dirname, "uploads", "certificates"), {
    fallthrough: false,
    index: false,
  }),
);

app.get("/", (req, res) => {
  res.json({ message: "API del portafolio funcionando" });
});

app.use("/api/projects", projectRoutes);
app.use("/api/admin/projects", adminProjectRoutes);
app.use("/api/certificates", certificateRoutes);
app.use("/api/admin/certificates", adminCertificateRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/contact", contactRoutes);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
