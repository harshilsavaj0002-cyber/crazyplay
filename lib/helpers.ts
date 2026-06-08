import type { Game } from "@/types/game"

/** Format large play counts: 259510 -> 259.5K, 1200000 -> 1.2M */
export function formatPlays(plays: number): string {
  if (plays >= 1_000_000) {
    return `${(plays / 1_000_000).toFixed(1)}M`
  }
  if (plays >= 1_000) {
    return `${(plays / 1_000).toFixed(1)}K`
  }
  return `${plays}`
}

/** Round rating to one decimal */
export function formatRating(rating: number): string {
  return rating.toFixed(1)
}

/** Convert a category name to a URL-safe slug */
export function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
}

/** Convert a slug back to a display label, matching against known categories */
export function deslugify(slug: string, known: string[]): string | null {
  const found = known.find((c) => slugify(c) === slug)
  return found ?? null
}

/** Simple search across name, tags, and categories */
export function searchGames(games: Game[], query: string): Game[] {
  const q = query.toLowerCase().trim()
  if (!q) return []
  return games.filter((g) => {
    if (g.name.en.toLowerCase().includes(q)) return true
    if (g.tags.en.some((t) => t.toLowerCase().includes(q))) return true
    if (g.categories.en.some((c) => c.toLowerCase().includes(q))) return true
    return false
  })
}
