import { randomBytes } from "node:crypto";
import type { Pool } from "pg";

/** How long a session lasts after sign-in. */
export const SESSION_TTL_MS = 7 * 24 * 60 * 60 * 1000;

export interface Session {
  id: string;
  authorId: number;
  expiresAt: Date;
}

export async function createSession(db: Pool, authorId: number, now = new Date()): Promise<Session> {
  const id = randomBytes(32).toString("base64url");
  const expiresAt = new Date(now.getTime() + SESSION_TTL_MS);
  await db.query(
    "INSERT INTO sessions (id, author_id, expires_at) VALUES ($1, $2, $3)",
    [id, authorId, expiresAt],
  );
  return { id, authorId, expiresAt };
}

/** The session for an id, if it exists and has not expired. */
export async function findSession(db: Pool, id: string, now = new Date()): Promise<Session | null> {
  const { rows } = await db.query(
    "SELECT id, author_id, expires_at FROM sessions WHERE id = $1 AND expires_at > $2",
    [id, now],
  );
  const row = rows[0];
  return row ? { id: row.id, authorId: row.author_id, expiresAt: row.expires_at } : null;
}

export async function endSession(db: Pool, id: string): Promise<void> {
  await db.query("DELETE FROM sessions WHERE id = $1", [id]);
}
