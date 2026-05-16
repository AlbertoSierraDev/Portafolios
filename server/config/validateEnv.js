const requiredEnvVars = [
  "MONGODB_URI",
  "ADMIN_USERNAME",
  "ADMIN_PASSWORD",
  "ADMIN_SECRET",
  "TURNSTILE_SECRET_KEY",
];

function validateEnv() {
  const missingVars = requiredEnvVars.filter((envVar) => !process.env[envVar]);

  if (missingVars.length > 0) {
    console.error(
      `Faltan variables de entorno obligatorias: ${missingVars.join(", ")}`,
    );

    process.exit(1);
  }
}

module.exports = validateEnv;
