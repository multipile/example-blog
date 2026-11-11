#!/usr/bin/env bash
# Applies every migration not yet applied, in order, to $DATABASE_URL.
set -euo pipefail
cd "$(dirname "$0")/migrations"
psql "$DATABASE_URL" -v ON_ERROR_STOP=1 -c \
  'CREATE TABLE IF NOT EXISTS schema_migrations (name TEXT PRIMARY KEY)'
for f in *.sql; do
  applied=$(psql "$DATABASE_URL" -tA -c \
    "SELECT 1 FROM schema_migrations WHERE name = '$f'")
  [ -n "$applied" ] && continue
  echo "applying $f"
  psql "$DATABASE_URL" -v ON_ERROR_STOP=1 -1 -f "$f" \
    -c "INSERT INTO schema_migrations (name) VALUES ('$f')"
done
