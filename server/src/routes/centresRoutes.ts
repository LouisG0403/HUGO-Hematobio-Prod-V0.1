import { Router } from "express";

import {
  getCentres,
  getCentreById,
} from "../controllers/centresController.js";

const router = Router();

router.get("/", getCentres);
router.get("/:id", getCentreById);

export default router;