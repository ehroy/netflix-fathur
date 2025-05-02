import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: String,
  password: String,
  role: { type: String, enum: ["admin", "user"], default: "user" },
  allowedEmails: [
    { type: mongoose.Schema.Types.ObjectId, ref: "EmailAccount" },
  ],
});

export default mongoose.model("User", userSchema);
