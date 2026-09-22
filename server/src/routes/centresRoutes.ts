import { Router } from "express";

import {
  getCentres,
  getAllCentres,
  getCentreById,
  createCentre,
  updateCentre,
  deleteCentre,
} from "../controllers/centresController.js";

import { authMiddleware } from "../middleware/authMiddleware.js";

const router = Router();

router.get("/", getCentres);
router.get("/admin", authMiddleware, getAllCentres);

router.post("/", authMiddleware, createCentre);
router.put("/:id", authMiddleware, updateCentre);
router.delete("/:id", authMiddleware, deleteCentre);

router.get("/:id", getCentreById);

export default router;