import type { Request, Response } from "express";
import { pool } from "../db/connection.js";

export async function getFormations(
  _req: Request,
  res: Response
) {
  try {
    const result = await pool.query(`
      SELECT
        id,
        category,
        title,
        description,
        link,
        icon,
        published,
        created_at,
        updated_at
      FROM formations
      WHERE published = TRUE
      ORDER BY created_at DESC;
    `);

    return res.json(result.rows);
  } catch (error) {
    console.error("Error fetching formations:", error);

    return res.status(500).json({
      error: "Unable to fetch formations",
    });
  }
}

export async function getAllFormations(
  _req: Request,
  res: Response
) {
  try {
    const result = await pool.query(`
      SELECT
        id,
        category,
        title,
        description,
        link,
        icon,
        published,
        created_at,
        updated_at
      FROM formations
      ORDER BY created_at DESC;
    `);

    return res.json(result.rows);
  } catch (error) {
    console.error("Error fetching all formations:", error);

    return res.status(500).json({
      error: "Unable to fetch formations",
    });
  }
}

export async function getFormationById(
  req: Request,
  res: Response
) {
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id)) {
      return res.status(400).json({
        error: "Invalid formation id",
      });
    }

    const result = await pool.query(
      `
        SELECT
          id,
          category,
          title,
          description,
          link,
          icon,
          published,
          created_at,
          updated_at
        FROM formations
        WHERE id = $1;
      `,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        error: "Formation not found",
      });
    }

    return res.json(result.rows[0]);
  } catch (error) {
    console.error("Error fetching formation:", error);

    return res.status(500).json({
      error: "Unable to fetch formation",
    });
  }
}

export async function createFormation(
  req: Request,
  res: Response
) {
  try {
    const {
      category,
      title,
      description,
      link,
      icon,
      published,
    } = req.body;

    if (!category || !title || !description || !icon) {
      return res.status(400).json({
        error:
          "Category, title, description and icon are required",
      });
    }

    const result = await pool.query(
      `
        INSERT INTO formations (
          category,
          title,
          description,
          link,
          icon,
          published
        )
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING
          id,
          category,
          title,
          description,
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
        link ?? null,
        icon,
        published ?? true,
      ]
    );

    return res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Error creating formation:", error);

    return res.status(500).json({
      error: "Unable to create formation",
    });
  }
}

export async function updateFormation(
  req: Request,
  res: Response
) {
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id)) {
      return res.status(400).json({
        error: "Invalid formation id",
      });
    }

    const {
      category,
      title,
      description,
      link,
      icon,
      published,
    } = req.body;

    if (!category || !title || !description || !icon) {
      return res.status(400).json({
        error:
          "Category, title, description and icon are required",
      });
    }

    const result = await pool.query(
      `
        UPDATE formations
        SET
          category = $1,
          title = $2,
          description = $3,
          link = $4,
          icon = $5,
          published = $6,
          updated_at = CURRENT_TIMESTAMP
        WHERE id = $7
        RETURNING
          id,
          category,
          title,
          description,
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
        link ?? null,
        icon,
        published ?? true,
        id,
      ]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        error: "Formation not found",
      });
    }

    return res.json(result.rows[0]);
  } catch (error) {
    console.error("Error updating formation:", error);

    return res.status(500).json({
      error: "Unable to update formation",
    });
  }
}

export async function deleteFormation(
  req: Request,
  res: Response
) {
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id)) {
      return res.status(400).json({
        error: "Invalid formation id",
      });
    }

    const result = await pool.query(
      `
        DELETE FROM formations
        WHERE id = $1
        RETURNING id;
      `,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        error: "Formation not found",
      });
    }

    return res.json({
      message: "Formation deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting formation:", error);

    return res.status(500).json({
      error: "Unable to delete formation",
    });
  }
}