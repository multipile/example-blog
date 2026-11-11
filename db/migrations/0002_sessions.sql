-- Sessions for signed-in authors.

CREATE TABLE sessions (
  id         TEXT PRIMARY KEY,
  author_id  BIGINT NOT NULL REFERENCES authors (id) ON DELETE CASCADE,
  expires_at TIMESTAMPTZ NOT NULL
);

CREATE INDEX sessions_expires_at ON sessions (expires_at);
