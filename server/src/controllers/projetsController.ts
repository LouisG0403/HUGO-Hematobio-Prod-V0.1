import type { Request, Response } from "express";
import { pool } from "../db/connection.js";

export async function getProjets(
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
        icon,
        published,
        created_at,
        updated_at
      FROM projets
      WHERE published = TRUE
      ORDER BY created_at DESC;
    `);

    return res.json(result.rows);
  } catch (error) {
    console.error("Error fetching projets:", error);

    return res.status(500).json({
      error: "Unable to fetch projets",
    });
  }
}

export async function getAllProjets(
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
        icon,
        published,
        created_at,
        updated_at
      FROM projets
      ORDER BY created_at DESC;
    `);

    return res.json(result.rows);
  } catch (error) {
    console.error("Error fetching all projets:", error);

    return res.status(500).json({
      error: "Unable to fetch projets",
    });
  }
}

export async function getProjetById(
  req: Request,
  res: Response
) {
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id)) {
      return res.status(400).json({
        error: "Invalid projet id",
      });
    }

    const result = await pool.query(
      `
        SELECT
          id,
          tag,
          title,
          description,
          icon,
          published,
          created_at,
          updated_at
        FROM projets
        WHERE id = $1;
      `,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        error: "Projet not found",
      });
    }

    return res.json(result.rows[0]);
  } catch (error) {
    console.error("Error fetching projet:", error);

    return res.status(500).json({
      error: "Unable to fetch projet",
    });
  }
}

export async function createProjet(
  req: Request,
  res: Response
) {
  try {
    const {
      tag,
      title,
      description,
      icon,
      published,
    } = req.body;

    if (!tag || !title || !description || !icon) {
      return res.status(400).json({
        error:
          "Tag, title, description and icon are required",
      });
    }

    const result = await pool.query(
      `
        INSERT INTO projets (
          tag,
          title,
          description,
          icon,
          published
        )
        VALUES ($1, $2, $3, $4, $5)
        RETURNING
          id,
          tag,
          title,
          description,
          icon,
          published,
          created_at,
          updated_at;
      `,
      [
        tag,
        title,
        description,
        icon,
        published ?? true,
      ]
    );

    return res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Error creating projet:", error);

    return res.status(500).json({
      error: "Unable to create projet",
    });
  }
}

export async function updateProjet(
  req: Request,
  res: Response
) {
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id)) {
      return res.status(400).json({
        error: "Invalid projet id",
      });
    }

    const {
      tag,
      title,
      description,
      icon,
      published,
    } = req.body;

    if (!tag || !title || !description || !icon) {
      return res.status(400).json({
        error:
          "Tag, title, description and icon are required",
      });
    }

    const result = await pool.query(
      `
        UPDATE projets
        SET
          tag = $1,
          title = $2,
          description = $3,
          icon = $4,
          published = $5,
          updated_at = CURRENT_TIMESTAMP
        WHERE id = $6
        RETURNING
          id,
          tag,
          title,
          description,
          icon,
          published,
          created_at,
          updated_at;
      `,
      [
        tag,
        title,
        description,
        icon,
        published ?? true,
        id,
      ]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        error: "Projet not found",
      });
    }

    return res.json(result.rows[0]);
  } catch (error) {
    console.error("Error updating projet:", error);

    return res.status(500).json({
      error: "Unable to update projet",
    });
  }
}

export async function deleteProjet(
  req: Request,
  res: Response
) {
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id)) {
      return res.status(400).json({
        error: "Invalid projet id",
      });
    }

    const result = await pool.query(
      `
        DELETE FROM projets
        WHERE id = $1
        RETURNING id;
      `,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        error: "Projet not found",
      });
    }

    return res.json({
      message: "Projet deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting projet:", error);

    return res.status(500).json({
      error: "Unable to delete projet",
    });
  }
}