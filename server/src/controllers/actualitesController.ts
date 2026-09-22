import type { Request, Response } from "express";
import { pool } from "../db/connection.js";

export async function getActualites(_req: Request, res: Response) {
  try {
    const result = await pool.query(`
      SELECT
        id,
        tag,
        title,
        description,
        info,
        accent,
        icon,
        published,
        created_at,
        updated_at
      FROM actualites
      WHERE published = TRUE
      ORDER BY created_at DESC;
    `);

    return res.json(result.rows);
  } catch (error) {
    console.error("Error fetching actualites:", error);

    return res.status(500).json({
      error: "Unable to fetch actualites",
    });
  }
}
export async function getAllActualites(
  _req: Request,
  res: Response
) {
  try {
    const result = await pool.query(`
      SELECT
        id,
        tag,
        title,
        description,
        info,
        accent,
        icon,
        published,
        created_at,
        updated_at
      FROM actualites
      ORDER BY created_at DESC;
    `);

    return res.json(result.rows);
  } catch (error) {
    console.error("Error fetching all actualites:", error);

    return res.status(500).json({
      error: "Unable to fetch actualites",
    });
  }
}

export async function getActualiteById(
  req: Request,
  res: Response
) {
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id)) {
      return res.status(400).json({
        error: "Invalid actualite id",
      });
    }

    const result = await pool.query(
      `
        SELECT
          id,
          tag,
          title,
          description,
          info,
          accent,
          icon,
          published,
          created_at,
          updated_at
        FROM actualites
        WHERE id = $1;
      `,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        error: "Actualite not found",
      });
    }

    return res.json(result.rows[0]);
  } catch (error) {
    console.error("Error fetching actualite:", error);

    return res.status(500).json({
      error: "Unable to fetch actualite",
    });
  }
}

export async function createActualite(
  req: Request,
  res: Response
) {
  try {
    const {
      tag,
      title,
      description,
      info,
      accent,
      icon,
      published,
    } = req.body;

    if (!tag || !title || !description) {
      return res.status(400).json({
        error: "Tag, title and description are required",
      });
    }

    const result = await pool.query(
      `
        INSERT INTO actualites (
          tag,
          title,
          description,
          info,
          accent,
          icon,
          published
        )
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING
          id,
          tag,
          title,
          description,
          info,
          accent,
          icon,
          published,
          created_at,
          updated_at;
      `,
      [
        tag,
        title,
        description,
        info ?? null,
        accent ?? null,
        icon ?? null,
        published ?? true,
      ]
    );

    return res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Error creating actualite:", error);

    return res.status(500).json({
      error: "Unable to create actualite",
    });
  }
}

export async function updateActualite(
  req: Request,
  res: Response
) {
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id)) {
      return res.status(400).json({
        error: "Invalid actualite id",
      });
    }

    const {
      tag,
      title,
      description,
      info,
      accent,
      icon,
      published,
    } = req.body;

    if (!tag || !title || !description) {
      return res.status(400).json({
        error: "Tag, title and description are required",
      });
    }

    const result = await pool.query(
      `
        UPDATE actualites
        SET
          tag = $1,
          title = $2,
          description = $3,
          info = $4,
          accent = $5,
          icon = $6,
          published = $7,
          updated_at = CURRENT_TIMESTAMP
        WHERE id = $8
        RETURNING
          id,
          tag,
          title,
          description,
          info,
          accent,
          icon,
          published,
          created_at,
          updated_at;
      `,
      [
        tag,
        title,
        description,
        info ?? null,
        accent ?? null,
        icon ?? null,
        published ?? true,
        id,
      ]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        error: "Actualite not found",
      });
    }

    return res.json(result.rows[0]);
  } catch (error) {
    console.error("Error updating actualite:", error);

    return res.status(500).json({
      error: "Unable to update actualite",
    });
  }
}

export async function deleteActualite(
  req: Request,
  res: Response
) {
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id)) {
      return res.status(400).json({
        error: "Invalid actualite id",
      });
    }

    const result = await pool.query(
      `
        DELETE FROM actualites
        WHERE id = $1
        RETURNING id;
      `,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        error: "Actualite not found",
      });
    }

    return res.json({
      message: "Actualite deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting actualite:", error);

    return res.status(500).json({
      error: "Unable to delete actualite",
    });
  }
}