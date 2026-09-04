const crypto = require("crypto");
const fs = require("fs");
const path = require("path");
const multer = require("multer");

const CERTIFICATES_UPLOAD_DIR = path.resolve(
  __dirname,
  "..",
  "uploads",
  "certificates",
);

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ALLOWED_MIME_TYPES = new Set(["image/jpeg", "image/png", "image/webp"]);
const EXTENSIONS_BY_MIME = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
};

fs.mkdirSync(CERTIFICATES_UPLOAD_DIR, { recursive: true });

const storage = multer.diskStorage({
  destination: (_req, _file, callback) => {
    callback(null, CERTIFICATES_UPLOAD_DIR);
  },
  filename: (_req, _file, callback) => {
    callback(null, `${crypto.randomUUID()}.upload`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: MAX_FILE_SIZE, files: 1 },
  fileFilter: (_req, file, callback) => {
    if (!ALLOWED_MIME_TYPES.has(file.mimetype)) {
      return callback(new Error("Solo se permiten imágenes JPEG, PNG o WebP."));
    }

    return callback(null, true);
  },
});

function removeUploadedFile(filePath) {
  return fs.promises.unlink(filePath).catch((error) => {
    if (error.code !== "ENOENT") throw error;
  });
}

async function validateUploadedFile(req, _res, next) {
  if (!req.file) return next();

  try {
    const { fileTypeFromFile } = await import("file-type");
    const detectedType = await fileTypeFromFile(req.file.path);
    const detectedMime = detectedType?.mime;
    const expectedExtension = EXTENSIONS_BY_MIME[detectedMime];

    if (!expectedExtension) {
      await removeUploadedFile(req.file.path);
      const error = new Error("El archivo no es una imagen JPEG, PNG o WebP válida.");
      error.statusCode = 415;
      return next(error);
    }

    const safeFilename = `${crypto.randomUUID()}.${expectedExtension}`;
    const safePath = path.resolve(CERTIFICATES_UPLOAD_DIR, safeFilename);

    if (!safePath.startsWith(`${CERTIFICATES_UPLOAD_DIR}${path.sep}`)) {
      await removeUploadedFile(req.file.path);
      return next(new Error("Ruta de archivo no válida."));
    }

    await fs.promises.rename(req.file.path, safePath);
    req.file.filename = safeFilename;
    req.file.path = safePath;
    req.file.detectedMime = detectedMime;
    return next();
  } catch (error) {
    if (req.file?.path) {
      await removeUploadedFile(req.file.path).catch(() => undefined);
    }

    if (error?.name === "EndOfStreamError" || error?.name === "UnknownFileTypeError") {
      error.statusCode = 415;
      error.message = "El archivo no es una imagen JPEG, PNG o WebP válida.";
    }

    return next(error);
  }
}

function certificateUpload(req, res, next) {
  upload.single("image")(req, res, (error) => {
    if (error) {
      if (error instanceof multer.MulterError && error.code === "LIMIT_FILE_SIZE") {
        error.statusCode = 413;
        error.message = "La imagen no puede superar los 5 MB.";
      } else if (error instanceof multer.MulterError && error.code === "LIMIT_UNEXPECTED_FILE") {
        error.statusCode = 400;
        error.message = "Solo se permite un archivo en el campo image.";
      } else {
        error.statusCode = 415;
      }

      return next(error);
    }

    return validateUploadedFile(req, res, next);
  });
}

module.exports = {
  CERTIFICATES_UPLOAD_DIR,
  certificateUpload,
  removeUploadedFile,
};
