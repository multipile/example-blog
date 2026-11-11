import { type Result, ok, err } from "./result.ts";

/** A moment in time, always in UTC, as the database and the services pass it. */
export type Instant = Date;

/** Reads an ISO 8601 timestamp that carries its offset, such as `2026-10-01T09:00:00Z`. */
export function parseInstant(text: string): Result<Instant> {
  if (!/[zZ]|[+-]\d\d:\d\d$/.test(text)) return err(`no offset in ${text}`);
  const date = new Date(text);
  return Number.isNaN(date.getTime()) ? err(`not a timestamp: ${text}`) : ok(date);
}
