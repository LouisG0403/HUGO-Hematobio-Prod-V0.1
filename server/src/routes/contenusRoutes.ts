import { Router } from "express";

import {
  getContenus,
  getAllContenus,
  getContenuById,
  createContenu,
  updateContenu,
  deleteContenu,
} from "../controllers/contenusController.js";

import { authMiddleware } from "../middleware/authMiddleware.js";

const router = Router();

router.get("/", getContenus);
router.get("/admin", authMiddleware, getAllContenus);

router.post("/", authMiddleware, createContenu);
router.put("/:id", authMiddleware, updateContenu);
router.delete("/:id", authMiddleware, deleteContenu);

router.get("/:id", getContenuById);

export default router;