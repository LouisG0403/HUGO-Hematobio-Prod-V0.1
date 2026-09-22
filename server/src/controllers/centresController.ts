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
        description,
        published,
        created_at,
        updated_at
      FROM centres
      WHERE published = TRUE
      ORDER BY id;
    `);

    return res.json(result.rows);
  } catch (error) {
    console.error("Error fetching centres:", error);

    return res.status(500).json({
      error: "Unable to fetch centres",
    });
  }
}

export async function getAllCentres(_req: Request, res: Response) {
  try {
    const result = await pool.query(`
      SELECT
        id,
        name,
        city,
        structure,
        longitude,
        latitude,
        description,
        published,
        created_at,
        updated_at
      FROM centres
      ORDER BY id;
    `);

    return res.json(result.rows);
  } catch (error) {
    console.error("Error fetching all centres:", error);

    return res.status(500).json({
      error: "Unable to fetch centres",
    });
  }
}

export async function getCentreById(
  req: Request,
  res: Response
) {
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
        description,
        published,
        created_at,
        updated_at
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

export async function createCentre(
  req: Request,
  res: Response
) {
  try {
    const {
      name,
      city,
      structure,
      longitude,
      latitude,
      description,
      published,
    } = req.body;

    if (
      !name ||
      !city ||
      longitude === undefined ||
      latitude === undefined
    ) {
      return res.status(400).json({
        error:
          "Name, city, longitude and latitude are required",
      });
    }

    const result = await pool.query(
      `
      INSERT INTO centres (
        name,
        city,
        structure,
        longitude,
        latitude,
        description,
        published
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING
        id,
        name,
        city,
        structure,
        longitude,
        latitude,
        description,
        published,
        created_at,
        updated_at;
      `,
      [
        name,
        city,
        structure ?? null,
        longitude,
        latitude,
        description ?? null,
        published ?? true,
      ]
    );

    return res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Error creating centre:", error);

    return res.status(500).json({
      error: "Unable to create centre",
    });
  }
}

export async function updateCentre(
  req: Request,
  res: Response
) {
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id)) {
      return res.status(400).json({
        error: "Invalid centre id",
      });
    }

    const {
      name,
      city,
      structure,
      longitude,
      latitude,
      description,
      published,
    } = req.body;

    if (
      !name ||
      !city ||
      longitude === undefined ||
      latitude === undefined
    ) {
      return res.status(400).json({
        error:
          "Name, city, longitude and latitude are required",
      });
    }

    const result = await pool.query(
      `
      UPDATE centres
      SET
        name = $1,
        city = $2,
        structure = $3,
        longitude = $4,
        latitude = $5,
        description = $6,
        published = $7,
        updated_at = CURRENT_TIMESTAMP
      WHERE id = $8
      RETURNING
        id,
        name,
        city,
        structure,
        longitude,
        latitude,
        description,
        published,
        created_at,
        updated_at;
      `,
      [
        name,
        city,
        structure ?? null,
        longitude,
        latitude,
        description ?? null,
        published ?? true,
        id,
      ]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        error: "Centre not found",
      });
    }

    return res.json(result.rows[0]);
  } catch (error) {
    console.error("Error updating centre:", error);

    return res.status(500).json({
      error: "Unable to update centre",
    });
  }
}

export async function deleteCentre(
  req: Request,
  res: Response
) {
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id)) {
      return res.status(400).json({
        error: "Invalid centre id",
      });
    }

    const result = await pool.query(
      `
      DELETE FROM centres
      WHERE id = $1
      RETURNING id;
      `,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        error: "Centre not found",
      });
    }

    return res.json({
      message: "Centre deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting centre:", error);

    return res.status(500).json({
      error: "Unable to delete centre",
    });
  }
}