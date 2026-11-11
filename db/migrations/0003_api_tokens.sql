-- Long-lived tokens authors give their scripts. Only a hash is kept.

CREATE TABLE api_tokens (
  hash       TEXT PRIMARY KEY,
  author_id  BIGINT NOT NULL REFERENCES authors (id) ON DELETE CASCADE,
  label      TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  revoked_at TIMESTAMPTZ,
  UNIQUE (author_id, label)
);
