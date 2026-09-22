import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import express from "express";

import { pool } from "./db/connection.js";
import centresRoutes from "./routes/centresRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import actualitesRoutes from "./routes/actualitesRoutes.js";
import projetsRoutes from "./routes/projetsRoutes.js";
import formationsRoutes from "./routes/formationsRoutes.js";
import contenusRoutes from "./routes/contenusRoutes.js";

dotenv.config();

const app = express();

const port = Number(process.env.PORT) || 3000;
const frontendUrl = process.env.FRONTEND_URL || "http://localhost:3005";

app.use(
  cors({
    origin: frontendUrl,
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

app.get("/api/health", async (_req, res) => {
  try {
    const result = await pool.query("SELECT NOW() AS now");

    res.json({
      status: "ok",
      database: "connected",
      time: result.rows[0].now,
    });
  } catch (error) {
    console.error("Database connection error:", error);

    res.status(500).json({
      status: "error",
      database: "disconnected",
    });
  }
});

app.use("/api/auth", authRoutes);
app.use("/api/centres", centresRoutes);
app.use("/api/actualites", actualitesRoutes);
app.use("/api/projets", projetsRoutes);
app.use("/api/formations", formationsRoutes);
app.use("/api/contenus", contenusRoutes);

app.listen(port, "0.0.0.0", () => {
  console.log(`API running on port ${port}`);
});