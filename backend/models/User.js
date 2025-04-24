const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  userId: { type: String, unique: true },
  gender: { type: String, enum: ["Male", "Female"], required: true }  // ✅ Add Gender Field
}, { timestamps: true });

module.exports = mongoose.model("User", UserSchema);
