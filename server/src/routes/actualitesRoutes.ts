import { Router } from "express";

import {
  getActualites,
  getAllActualites,
  getActualiteById,
  createActualite,
  updateActualite,
  deleteActualite,
} from "../controllers/actualitesController.js";

import { authMiddleware } from "../middleware/authMiddleware.js";

const router = Router();

// Routes publiques
router.get("/", getActualites);

// Routes administration
router.get("/admin", authMiddleware, getAllActualites);

router.post("/", authMiddleware, createActualite);
router.put("/:id", authMiddleware, updateActualite);
router.delete("/:id", authMiddleware, deleteActualite);

// Route publique par ID
router.get("/:id", getActualiteById);

export default router;