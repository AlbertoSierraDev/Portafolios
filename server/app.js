const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const projectRoutes = require("./routes/projectRoutes");
const adminProjectRoutes = require("./routes/adminProjectRoutes");
const authRoutes = require("./routes/authRoutes");
const contactRoutes = require("./routes/contactRoutes");
const notFound = require("./middlewares/notFoundMiddleware");
const errorHandler = require("./middlewares/errorMiddleware");

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.json({ message: "API del portafolio funcionando" });
});

app.use("/api/projects", projectRoutes);
app.use("/api/admin/projects", adminProjectRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/contact", contactRoutes);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
