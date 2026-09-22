import { Router } from "express";

import {
  getFormations,
  getAllFormations,
  getFormationById,
  createFormation,
  updateFormation,
  deleteFormation,
} from "../controllers/formationsController.js";

import { authMiddleware } from "../middleware/authMiddleware.js";

const router = Router();

// Routes publiques
router.get("/", getFormations);

// Routes administration
router.get("/admin", authMiddleware, getAllFormations);

router.post("/", authMiddleware, createFormation);
router.put("/:id", authMiddleware, updateFormation);
router.delete("/:id", authMiddleware, deleteFormation);

// Route publique par ID
router.get("/:id", getFormationById);

export default router;