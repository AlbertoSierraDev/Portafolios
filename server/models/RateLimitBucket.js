const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    _id: String,
    count: { type: Number, required: true },
    expiresAt: { type: Date, required: true },
  },
  { versionKey: false, autoIndex: false, autoCreate: false, bufferCommands: false },
);

schema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

module.exports = mongoose.model("RateLimitBucket", schema);
