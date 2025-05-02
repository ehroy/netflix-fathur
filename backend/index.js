import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/user.js";
import emailRoutes from "./routes/email.js";
import { log } from "./utils/utils.js";
import cors from "cors";
dotenv.config();
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true, // penting jika pakai cookie atau header auth
  })
);
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/emails", emailRoutes);

mongoose
  .connect(process.env.MONGO_URI, { family: 4 })
  .then(() => {
    log(`mongo db connected`, "success");
    app.listen(process.env.PORT || 5000, () =>
      log(`Server running on port ${process.env.PORT}`, "warning")
    );
  })
  .catch((err) => log(err, "error"));
