import { Router } from "express";
import {
  getMe,
  updateProfile,
  changePassword
} from "../controllers/user.controller";
import { authenticateToken } from "../middlewares/auth.middleware";

const router = Router();

router.get("/me", authenticateToken, getMe);
router.put("/me", authenticateToken, updateProfile);
router.put("/change-password", authenticateToken, changePassword);

export default router;
