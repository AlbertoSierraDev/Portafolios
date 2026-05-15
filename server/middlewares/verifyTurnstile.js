async function verifyTurnstile(req, res, next) {
  try {
    const { turnstileToken } = req.body;

    if (!turnstileToken) {
      return res.status(400).json({
        message: "Verificación anti-bots requerida.",
      });
    }

    const formData = new FormData();

    formData.append("secret", process.env.TURNSTILE_SECRET_KEY);
    formData.append("response", turnstileToken);

    if (req.ip) {
      formData.append("remoteip", req.ip);
    }

    const response = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        body: formData,
      },
    );

    const result = await response.json();

    if (!result.success) {
      return res.status(403).json({
        message: "No se pudo verificar el captcha.",
      });
    }

    return next();
  } catch (error) {
    return next(error);
  }
}

module.exports = verifyTurnstile;
