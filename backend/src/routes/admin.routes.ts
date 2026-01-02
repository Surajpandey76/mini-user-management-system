import { Router } from "express";
import { authenticateToken } from "../middlewares/auth.middleware";
import { requireAdmin } from "../middlewares/role.middleware";
import { getAllUsers, updateUserStatus } from "../controllers/admin.controller";

const router = Router();

router.get(
  "/users",
  authenticateToken,
  requireAdmin,
  getAllUsers
);

router.put(
  "/users/:id/status",
  authenticateToken,
  requireAdmin,
  updateUserStatus
);

export default router;
