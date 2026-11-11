import { createHash, randomBytes } from "node:crypto";
import type { Pool } from "pg";

/**
 * A long-lived token an author gives a script, such as one that publishes
 * from their editor. Only its hash is stored: the token itself is shown once.
 */
export async function issueToken(db: Pool, authorId: number, label: string): Promise<string> {
  const token = `blog_${randomBytes(24).toString("base64url")}`;
  await db.query(
    "INSERT INTO api_tokens (hash, author_id, label) VALUES ($1, $2, $3)",
    [hash(token), authorId, label],
  );
  return token;
}

/** The author a token speaks for, or null when it was never issued or was revoked. */
export async function authorForToken(db: Pool, token: string): Promise<number | null> {
  const { rows } = await db.query(
    "SELECT author_id FROM api_tokens WHERE hash = $1 AND revoked_at IS NULL",
    [hash(token)],
  );
  return rows[0]?.author_id ?? null;
}

export async function revokeToken(db: Pool, authorId: number, label: string): Promise<void> {
  await db.query(
    "UPDATE api_tokens SET revoked_at = now() WHERE author_id = $1 AND label = $2",
    [authorId, label],
  );
}

const hash = (token: string) => createHash("sha256").update(token).digest("hex");
