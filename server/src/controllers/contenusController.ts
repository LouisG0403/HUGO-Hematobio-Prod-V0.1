import type { Request, Response } from "express";
import { pool } from "../db/connection.js";

export async function getContenus(_req: Request, res: Response) {
  try {
    const result = await pool.query(`
      SELECT
        id,
        category,
        title,
        description,
        authors,
        year,
        link,
        icon,
        published,
        created_at,
        updated_at
      FROM contenus
      WHERE published = TRUE
      ORDER BY created_at DESC;
    `);

    return res.json(result.rows);
  } catch (error) {
    console.error("Error fetching contenus:", error);
    return res.status(500).json({
      error: "Unable to fetch contenus",
    });
  }
}

export async function getAllContenus(_req: Request, res: Response) {
  try {
    const result = await pool.query(`
      SELECT
        id,
        category,
        title,
        description,
        authors,
        year,
        link,
        icon,
        published,
        created_at,
        updated_at
      FROM contenus
      ORDER BY created_at DESC;
    `);

    return res.json(result.rows);
  } catch (error) {
    console.error("Error fetching all contenus:", error);
    return res.status(500).json({
      error: "Unable to fetch contenus",
    });
  }
}

export async function getContenuById(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id)) {
      return res.status(400).json({
        error: "Invalid contenu id",
      });
    }

    const result = await pool.query(
      `
      SELECT
        id,
        category,
        title,
        description,
        authors,
        year,
        link,
        icon,
        published,
        created_at,
        updated_at
      FROM contenus
      WHERE id = $1;
      `,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        error: "Contenu not found",
      });
    }

    return res.json(result.rows[0]);
  } catch (error) {
    console.error("Error fetching contenu:", error);
    return res.status(500).json({
      error: "Unable to fetch contenu",
    });
  }
}

export async function createContenu(req: Request, res: Response) {
  try {
    const {
      category,
      title,
      description,
      authors,
      year,
      link,
      icon,
      published,
    } = req.body;

    if (!category || !title || !description || !icon) {
      return res.status(400).json({
        error: "Category, title, description and icon are required",
      });
    }

    const result = await pool.query(
      `
      INSERT INTO contenus (
        category,
        title,
        description,
        authors,
        year,
        link,
        icon,
        published
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING
        id,
        category,
        title,
        description,
        authors,
        year,
        link,
        icon,
        published,
        created_at,
        updated_at;
      `,
      [
        category,
        title,
        description,
        authors ?? null,
        year ?? null,
        link ?? null,
        icon,
        published ?? true,
      ]
    );

    return res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Error creating contenu:", error);
    return res.status(500).json({
      error: "Unable to create contenu",
    });
  }
}

export async function updateContenu(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id)) {
      return res.status(400).json({
        error: "Invalid contenu id",
      });
    }

    const {
      category,
      title,
      description,
      authors,
      year,
      link,
      icon,
      published,
    } = req.body;

    if (!category || !title || !description || !icon) {
      return res.status(400).json({
        error: "Category, title, description and icon are required",
      });
    }

    const result = await pool.query(
      `
      UPDATE contenus
      SET
        category = $1,
        title = $2,
        description = $3,
        authors = $4,
        year = $5,
        link = $6,
        icon = $7,
        published = $8,
        updated_at = CURRENT_TIMESTAMP
      WHERE id = $9
      RETURNING
        id,
        category,
        title,
        description,
        authors,
        year,
        link,
        icon,
        published,
        created_at,
        updated_at;
      `,
      [
        category,
        title,
        description,
        authors ?? null,
        year ?? null,
        link ?? null,
        icon,
        published ?? true,
        id,
      ]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        error: "Contenu not found",
      });
    }

    return res.json(result.rows[0]);
  } catch (error) {
    console.error("Error updating contenu:", error);
    return res.status(500).json({
      error: "Unable to update contenu",
    });
  }
}

export async function deleteContenu(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id)) {
      return res.status(400).json({
        error: "Invalid contenu id",
      });
    }

    const result = await pool.query(
      `
      DELETE FROM contenus
      WHERE id = $1
      RETURNING id;
      `,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        error: "Contenu not found",
      });
    }

    return res.json({
      message: "Contenu deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting contenu:", error);
    return res.status(500).json({
      error: "Unable to delete contenu",
    });
  }
}