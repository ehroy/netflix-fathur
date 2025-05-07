import express from "express";
import {
  listUsers,
  assignEmailToUser,
  deleteUser,
  deleteAllowEmail,
} from "../controllers/userController.js";
import { authenticate } from "../middleware/auth.js";
import { authorize } from "../middleware/role.js";

const router = express.Router();

router.get("/", authenticate, authorize(["admin"]), listUsers);
router.post(
  "/allowlist",
  authenticate,
  authorize(["admin"]),
  assignEmailToUser
);
router.post(
  "/allowlist/delete",
  authenticate,
  authorize(["admin"]),
  deleteAllowEmail
);
router.post("/delete", authenticate, authorize(["admin"]), deleteUser);
export default router;
