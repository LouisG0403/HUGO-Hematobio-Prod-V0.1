import { Router } from "express";

import {
  getProjets,
  getAllProjets,
  getProjetById,
  createProjet,
  updateProjet,
  deleteProjet,
} from "../controllers/projetsController.js";

import { authMiddleware } from "../middleware/authMiddleware.js";

const router = Router();

// Routes publiques
router.get("/", getProjets);

// Routes administration
router.get("/admin", authMiddleware, getAllProjets);

router.post("/", authMiddleware, createProjet);
router.put("/:id", authMiddleware, updateProjet);
router.delete("/:id", authMiddleware, deleteProjet);

// Route publique par ID
router.get("/:id", getProjetById);

export default router;