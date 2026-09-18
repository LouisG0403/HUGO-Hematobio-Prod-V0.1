import type { Request, Response } from "express";
import { pool } from "../db/connection.js";

export async function getCentres(_req: Request, res: Response) {
  try {
    const result = await pool.query(`
      SELECT
        id,
        name,
        city,
        structure,
        longitude,
        latitude,
        description
      FROM centres
      ORDER BY id;
    `);

    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching centres:", error);

    res.status(500).json({
      error: "Unable to fetch centres",
    });
  }
}

export async function getCentreById(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id)) {
      return res.status(400).json({
        error: "Invalid centre id",
      });
    }

    const result = await pool.query(
      `
        SELECT
          id,
          name,
          city,
          structure,
          longitude,
          latitude,
          description
        FROM centres
        WHERE id = $1;
      `,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        error: "Centre not found",
      });
    }

    return res.json(result.rows[0]);
  } catch (error) {
    console.error("Error fetching centre:", error);

    return res.status(500).json({
      error: "Unable to fetch centre",
    });
  }
}