import type { Instant } from "@blog/shared";

const formatter = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "UTC",
});

/** The day a post was published, as a reader sees it: `1 October 2026`. */
export function formatPostDate(at: Instant): string {
  return formatter.format(at);
}
