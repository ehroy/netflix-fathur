import mongoose from "mongoose";

const emailAccountSchema = new mongoose.Schema({
  email: String,
  imapHost: String,
  imapPort: Number,
  username: String,
  password: String,
  ssl: Boolean,
});

export default mongoose.model("EmailAccount", emailAccountSchema);
