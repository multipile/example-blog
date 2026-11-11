import { Hono } from "hono";
import { getCookie, setCookie, deleteCookie } from "hono/cookie";
import pg from "pg";
import { verifyPassword } from "./password.ts";
import { createSession, endSession, findSession } from "./session.ts";

const db = new pg.Pool({ connectionString: process.env.DATABASE_URL });
const app = new Hono();

app.post("/sign-in", async (c) => {
  const { email, password } = await c.req.json<{ email: string; password: string }>();
  const { rows } = await db.query(
    "SELECT id, password_hash FROM authors WHERE email = $1", [email],
  );
  const author = rows[0];
  if (!author || !(await verifyPassword(password, author.password_hash))) {
    return c.json({ error: "wrong email or password" }, 401);
  }
  const session = await createSession(db, author.id);
  setCookie(c, "session", session.id, {
    httpOnly: true, secure: true, sameSite: "Lax", expires: session.expiresAt,
  });
  return c.json({ authorId: author.id });
});

app.get("/me", async (c) => {
  const id = getCookie(c, "session");
  const session = id ? await findSession(db, id) : null;
  return session ? c.json({ authorId: session.authorId }) : c.json({ error: "signed out" }, 401);
});

app.post("/sign-out", async (c) => {
  const id = getCookie(c, "session");
  if (id) await endSession(db, id);
  deleteCookie(c, "session");
  return c.body(null, 204);
});

export default app;
