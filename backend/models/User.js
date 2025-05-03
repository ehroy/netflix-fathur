import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: String,
  password: String,
  role: { type: String, enum: ["admin", "user"], default: "user" },
  allowedEmails: [{ type: String }],
});

export default mongoose.model("User", userSchema);
