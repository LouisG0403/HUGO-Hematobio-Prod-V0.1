import { Router } from "express";

import {
  login,
  getCurrentAdmin,
} from "../controllers/authController.js";

import { authMiddleware } from "../middleware/authMiddleware.js";

const router = Router();

router.post("/login", login);
router.get("/me", authMiddleware, getCurrentAdmin);

export default router;
