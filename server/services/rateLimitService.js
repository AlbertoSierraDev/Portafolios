const { createHmac } = require("node:crypto");
const { isIP } = require("node:net");
const connectDB = require("../config/db");
const RateLimitBucket = require("../models/RateLimitBucket");

const RETENTION_SECONDS = 3600;
let indexPromise;

function waitWithSignal(promise, signal) {
  signal.throwIfAborted();
  return new Promise((resolve, reject) => {
    const abort = () => {
      signal.removeEventListener("abort", abort);
      reject(signal.reason);
    };
    signal.addEventListener("abort", abort, { once: true });
    Promise.resolve(promise).then(
      (value) => { signal.removeEventListener("abort", abort); resolve(value); },
      (error) => { signal.removeEventListener("abort", abort); reject(error); },
    );
  });
}

async function consumeMongoBucket({ id, expiresAt, timeoutMS = 3000, signal }) {
  signal ||= AbortSignal.timeout(timeoutMS);
  await waitWithSignal(connectDB({ exitOnFailure: false }), signal);
  signal.throwIfAborted();
  if (!indexPromise) {
    indexPromise = RateLimitBucket.collection.createIndex(
      { expiresAt: 1 }, { expireAfterSeconds: 0, timeoutMS, maxTimeMS: timeoutMS },
    )
      .catch((error) => {
        indexPromise = undefined;
        throw error;
      });
  }
  await waitWithSignal(indexPromise, signal);
  signal.throwIfAborted();
  const options = { new: true, timeoutMS, maxTimeMS: timeoutMS, signal };
  let bucket;
  try {
    bucket = await waitWithSignal(RateLimitBucket.findOneAndUpdate(
      { _id: id },
      { $inc: { count: 1 }, $setOnInsert: { expiresAt } },
      { ...options, upsert: true, setDefaultsOnInsert: false },
    ).lean(), signal);
  } catch (error) {
    if (error.code !== 11000) throw error;
    signal.throwIfAborted();
    // Only retry the unique _id race, never an ambiguous timed-out write.
    bucket = await waitWithSignal(RateLimitBucket.findOneAndUpdate(
      { _id: id }, { $inc: { count: 1 } }, options,
    ).lean(), signal);
  }
  if (!bucket || !Number.isSafeInteger(bucket.count) || bucket.count < 1) {
    throw new Error("Rate limit bucket unavailable");
  }
  return bucket.count;
}

function positiveInteger(env, name, fallback, min = 1, max = 1000000) {
  if (env[name] === undefined || env[name] === "") return fallback;
  const value = Number(env[name]);
  if (!Number.isSafeInteger(value) || value < min || value > max) {
    throw new Error(`Invalid rate limit setting: ${name}`);
  }
  return value;
}

function clientIdentity(request, env) {
  const header = env.RATE_LIMIT_TRUSTED_IP_HEADER?.trim().toLowerCase();
  if (!header) return null;
  if (!/^[a-z0-9-]+$/.test(header) || header === "x-forwarded-for" || header === "forwarded") {
    throw new Error("A verified single-IP ingress header is required");
  }
  const value = request.headers?.get(header)?.trim();
  if (!value || !isIP(value)) throw new Error("Verified client IP is unavailable");
  const normalized = new URL(isIP(value) === 6 ? `http://[${value}]/` : `http://${value}/`).hostname;
  return `ip:${normalized.replace(/^\[|\]$/g, "")}`;
}

function createRateLimiter({ consume = consumeMongoBucket, now = Date.now, env = process.env } = {}) {
  function blocked(scope, end) {
    return {
      status: 429,
      headers: { "Retry-After": String(Math.max(1, Math.ceil((end - now()) / 1000))) },
      jsonBody: { message: scope.startsWith("login")
        ? "Demasiados intentos de login. Intentalo mas tarde."
        : "Demasiadas solicitudes de contacto. Intentalo mas tarde." },
    };
  }

  async function counter(scope, identifier, windowSeconds, context) {
    const secret = env.RATE_LIMIT_HASH_SECRET || env.ADMIN_SECRET;
    if (!secret) throw new Error("Rate limit hashing secret unavailable");
    // Recheck logical time after I/O; TTL is cleanup, not quota reset.
    for (let attempt = 0; attempt < 2; attempt++) {
      context.signal.throwIfAborted();
      const windowMs = windowSeconds * 1000;
      const start = Math.floor(now() / windowMs) * windowMs;
      const end = start + windowMs;
      const id = createHmac("sha256", secret)
        .update(JSON.stringify(["portfolio-rate-limit-v2", scope, identifier, start]))
        .digest("hex");
      const count = await consume({
        id, expiresAt: new Date(end + RETENTION_SECONDS * 1000), ...context,
      });
      context.signal.throwIfAborted();
      if (!Number.isSafeInteger(count) || count < 1) throw new Error("Invalid bucket count");
      if (now() < end) return { count, end };
    }
    throw new Error("Rate limit window changed during operation");
  }

  async function enforce(scope, identifier, max, window, context) {
    const bucket = await counter(scope, identifier, window, context);
    return bucket.count > max ? blocked(scope, bucket.end) : null;
  }

  async function run(action) {
    const controller = new AbortController();
    let timer;
    try {
      const timeoutMS = positiveInteger(env, "RATE_LIMIT_TIMEOUT_MS", 3000, 100, 10000);
      timer = setTimeout(() => controller.abort(new Error("Rate limit deadline exceeded")), timeoutMS);
      return await waitWithSignal(action({ timeoutMS, signal: controller.signal }), controller.signal);
    } catch {
      console.error("Rate limiter unavailable");
      return {
        status: 503,
        headers: { "Retry-After": "60" },
        jsonBody: { message: "Servicio temporalmente no disponible. Intentalo mas tarde." },
      };
    } finally {
      clearTimeout(timer);
    }
  }

  return {
    enforceLoginRateLimit(request, username) {
      return run(async (context) => {
        const client = clientIdentity(request, env);
        const window = positiveInteger(env, "RATE_LIMIT_LOGIN_WINDOW_SECONDS", 900, 60);
        const burst = positiveInteger(env, "RATE_LIMIT_LOGIN_BURST", 30, 10);
        // Emergency safeguard bounds new login buckets; not an individual quota.
        const emergency = await enforce("login-emergency", "all-login-requests",
          positiveInteger(env, "RATE_LIMIT_LOGIN_EMERGENCY_MAX", 10000, 1000), window, context);
        if (emergency) return emergency;
        if (client) {
          const limited = await enforce("login-client", client,
            positiveInteger(env, "RATE_LIMIT_LOGIN_IP_MAX", 120, 30), window, context);
          if (limited) return limited;
        }
        // All unknown names behave identically; no credential/existence lookup here.
        const user = typeof username === "string" ? username.trim().toLowerCase().slice(0, 256) : "";
        const identity = client ? [user, client] : user;
        const pressure = await counter(client ? "login-user-client" : "login-user", identity, window, context);
        if (pressure.count <= burst) return null;
        const stage = Math.min(3, Math.floor((pressure.count - 1) / burst));
        const interval = 2 ** stage;
        // Fixed slots admit one request without extending a sliding lock on rejection.
        return enforce("login-backoff", [identity, interval], 1, interval, context);
      });
    },
    enforceContactRateLimit(request) {
      return run((context) => {
        const client = clientIdentity(request, env);
        // The handler has already validated Turnstile. No invented client identity.
        if (!client) return null;
        return enforce("contact-client", client,
          positiveInteger(env, "RATE_LIMIT_CONTACT_MAX", 5),
          positiveInteger(env, "RATE_LIMIT_CONTACT_WINDOW_SECONDS", 3600), context);
      });
    },
  };
}

module.exports = { ...createRateLimiter(), createRateLimiter, consumeMongoBucket };
