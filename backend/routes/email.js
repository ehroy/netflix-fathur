import express from "express";
import { getEmails } from "../controllers/emailController.js";
import { authenticate } from "../middleware/auth.js";

const router = express.Router();

router.get("/:id", authenticate, getEmails);

export default router;
