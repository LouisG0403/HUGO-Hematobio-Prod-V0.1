import cors from "cors";
import dotenv from "dotenv";
import express from "express";

import { pool } from "./db/connection.js";
import centresRoutes from "./routes/centresRoutes.js";

dotenv.config();

const app = express();
const port = Number(process.env.PORT) || 3000;

app.use(cors());
app.use(express.json());

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

app.use("/api/centres", centresRoutes);

app.listen(port, () => {
  console.log(`API running on http://localhost:${port}`);
});