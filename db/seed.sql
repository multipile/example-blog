-- A little data to develop against. Never run in production.

INSERT INTO authors (email, display_name, password_hash) VALUES
  ('ada@example.com', 'Ada', '$scrypt$N=16384,r=8,p=1$c2VlZA$ZmFrZWhhc2g');

INSERT INTO posts (author_id, slug, title, body, published_at) VALUES
  (1, 'hello', 'Hello, readers', 'The first post.', '2026-10-01T09:00:00Z'),
  (1, 'draft', 'Not yet', 'A post still being written.', NULL);

INSERT INTO tags (post_id, tag) VALUES (1, 'meta');
