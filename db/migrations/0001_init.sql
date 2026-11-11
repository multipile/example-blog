-- The first schema: authors, their posts, and the tags on them.

CREATE TABLE authors (
  id            BIGSERIAL PRIMARY KEY,
  email         TEXT NOT NULL UNIQUE,
  display_name  TEXT NOT NULL,
  password_hash TEXT NOT NULL,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE posts (
  id           BIGSERIAL PRIMARY KEY,
  author_id    BIGINT NOT NULL REFERENCES authors (id),
  slug         TEXT NOT NULL UNIQUE,
  title        TEXT NOT NULL,
  body         TEXT NOT NULL,
  published_at TIMESTAMPTZ,
  updated_at   TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX posts_published_at ON posts (published_at DESC)
  WHERE published_at IS NOT NULL;

CREATE TABLE tags (
  post_id BIGINT NOT NULL REFERENCES posts (id) ON DELETE CASCADE,
  tag     TEXT NOT NULL,
  PRIMARY KEY (post_id, tag)
);
