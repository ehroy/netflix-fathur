import express from "express";
import { getEmails } from "../controllers/emailController.js";
import { authenticate } from "../middleware/auth.js";
import { authorize } from "../middleware/role.js";
const router = express.Router();

router.post("/", authenticate, authorize(["admin", "user"]), getEmails);

export default router;
