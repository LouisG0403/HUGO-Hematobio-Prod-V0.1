import readline from "node:readline";
import bcrypt from "bcryptjs";
import { pool } from "../db/connection.js";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function ask(question: string): Promise<string> {
  return new Promise((resolve) => {
    rl.question(question, resolve);
  });
}

async function createAdmin() {
  try {
    console.log("\nCréation du compte administrateur\n");

    const email = (await ask("Email : ")).trim();
    const password = await ask("Mot de passe : ");

    if (!email || !password) {
      throw new Error("L'email et le mot de passe sont obligatoires.");
    }

    const passwordHash = await bcrypt.hash(password, 12);

    await pool.query(
      `
        INSERT INTO admins (email, password_hash)
        VALUES ($1, $2);
      `,
      [email, passwordHash]
    );

    console.log("\nCompte administrateur créé avec succès.");
    console.log(`Email : ${email}\n`);
  } catch (error) {
    console.error("\nErreur lors de la création du compte :", error);
  } finally {
    await pool.end();
    rl.close();
  }
}

createAdmin();
