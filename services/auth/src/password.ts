import { randomBytes, scrypt as scryptCb, timingSafeEqual } from "node:crypto";
import { promisify } from "node:util";

const scrypt = promisify(scryptCb) as (
  password: string, salt: Buffer, keylen: number,
) => Promise<Buffer>;

const KEY_LENGTH = 32;

/** Hashes a password for storing: `$scrypt$<salt>$<hash>`, both base64. */
export async function hashPassword(password: string): Promise<string> {
  const salt = randomBytes(16);
  const hash = await scrypt(password, salt, KEY_LENGTH);
  return `$scrypt$${salt.toString("base64")}$${hash.toString("base64")}`;
}

/** Whether a password matches a stored hash, in constant time. */
export async function verifyPassword(password: string, stored: string): Promise<boolean> {
  const [, kind, salt, hash] = stored.split("$");
  if (kind !== "scrypt" || !salt || !hash) return false;
  const expected = Buffer.from(hash, "base64");
  const actual = await scrypt(password, Buffer.from(salt, "base64"), expected.length);
  return timingSafeEqual(expected, actual);
}
