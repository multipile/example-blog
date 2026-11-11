import { test } from "node:test";
import assert from "node:assert/strict";
import { formatPostDate } from "./date.ts";

test("a post's date reads as a day, month and year", () => {
  assert.equal(formatPostDate(new Date("2026-10-01T09:00:00Z")), "1 October 2026");
});
