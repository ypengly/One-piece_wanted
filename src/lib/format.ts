/** Strip everything but digits from a raw bounty input string. */
export function sanitizeBountyInput(raw: string): string {
  return raw.replace(/[^\d]/g, "");
}

/** Format a numeric string/number with thousands separators, e.g. 3000000000 -> "3,000,000,000" */
export function formatBounty(value: string | number): string {
  const digits = typeof value === "number" ? String(Math.max(0, Math.floor(value))) : sanitizeBountyInput(value);
  if (!digits) return "0";
  return digits.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function bountyToNumber(value: string | number): number {
  if (typeof value === "number") return value;
  const digits = sanitizeBountyInput(value);
  return digits ? parseInt(digits, 10) : 0;
}

/** Turn a character name into a safe filename slug, e.g. "Monkey D. Luffy" -> "monkey-d-luffy" */
export function slugifyName(name: string): string {
  const slug = name
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return slug || "wanted";
}

export function posterFilename(name: string, ext: "pdf" | "png"): string {
  return `wanted-poster-${slugifyName(name)}.${ext}`;
}
