import { createClient } from "redis";

/** How long a post stays in the cache before it is read again. */
const ttlSeconds = 60;

const redis = createClient({ url: process.env.REDIS_URL });
redis.on("error", (err) => console.error("cache:", err.message));
await redis.connect();

/**
 * The value under `key`, from the cache if it is there, or from `load`,
 * which is kept for a minute. A cache that is down is skipped.
 */
export async function cached<T>(key: string, load: () => Promise<T>): Promise<T> {
  try {
    const hit = await redis.get(key);
    if (hit !== null) return JSON.parse(hit) as T;
  } catch {
    return load();
  }
  const value = await load();
  redis.set(key, JSON.stringify(value), { EX: ttlSeconds }).catch(() => {});
  return value;
}
