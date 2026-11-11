import { Hono } from "hono";
import pg from "pg";

const db = new pg.Pool({ connectionString: process.env.DATABASE_URL });
const app = new Hono().basePath("/api");

/** Every published post, newest first, or only those with `?tag=`. */
app.get("/posts", async (c) => {
  const { rows } = await db.query(`
    SELECT p.slug, p.title, a.display_name AS author, p.published_at,
           coalesce(array_agg(t.tag ORDER BY t.tag) FILTER (WHERE t.tag IS NOT NULL), '{}') AS tags
      FROM posts p
      JOIN authors a ON a.id = p.author_id
      LEFT JOIN tags t ON t.post_id = p.id
     WHERE p.published_at IS NOT NULL
       AND ($1::text IS NULL OR EXISTS (SELECT 1 FROM tags x WHERE x.post_id = p.id AND x.tag = $1))
     GROUP BY p.id, a.display_name
     ORDER BY p.published_at DESC
     LIMIT 50`, [c.req.query("tag") ?? null]);
  return c.json(rows.map((r) => ({
    slug: r.slug, title: r.title, author: r.author, tags: r.tags, publishedAt: r.published_at.toISOString(),
  })));
});

/** One published post, whole. */
app.get("/posts/:slug", async (c) => {
  const { rows } = await db.query(`
    SELECT p.title, a.display_name AS author, p.body, p.published_at
      FROM posts p JOIN authors a ON a.id = p.author_id
     WHERE p.slug = $1 AND p.published_at IS NOT NULL`, [c.req.param("slug")]);
  const r = rows[0];
  if (!r) return c.json({ error: "no such post" }, 404);
  return c.json({ title: r.title, author: r.author, body: r.body, publishedAt: r.published_at.toISOString() });
});

export default app;
