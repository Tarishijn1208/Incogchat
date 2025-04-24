const mongoose = require("mongoose");

const ConfessionSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true, trim: true, lowercase: true }, // ✅ Normalize userId
    confessionText: { type: String, required: true },
    likes: { type: Number, default: 0 },
    superLikes: { type: Number, default: 0 },
    likedBy: { type: [String], default: [] }, // ✅ Ensure userId is stored consistently
    superLikedBy: { type: [String], default: [] }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Confession", ConfessionSchema);
