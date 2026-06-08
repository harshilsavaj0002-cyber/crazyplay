import type { Game } from "@/types/game"

const GAMEZOP_API = "https://pub.gamezop.com/v3/games?id=9632&lang=en"

/**
 * Fetch all games directly from the Gamezop API.
 * Cached and revalidated every hour via Next.js fetch caching.
 */
export async function fetchAllGames(): Promise<Game[]> {
  const res = await fetch(GAMEZOP_API, {
    next: { revalidate: 3600 },
  })

  if (!res.ok) {
    throw new Error(`Failed to fetch games: ${res.status}`)
  }

  const data = (await res.json()) as { games: Game[] }
  return data.games ?? []
}

export async function getGameByCode(code: string): Promise<Game | null> {
  const games = await fetchAllGames()
  return games.find((g) => g.code === code) ?? null
}

export async function getCategories(): Promise<string[]> {
  const games = await fetchAllGames()
  const set = new Set<string>()
  for (const game of games) {
    for (const cat of game.categories.en) {
      set.add(cat)
    }
  }
  return Array.from(set).sort()
}

export async function getGamesByCategory(category: string): Promise<Game[]> {
  const games = await fetchAllGames()
  const normalized = category.toLowerCase()
  return games.filter((g) =>
    g.categories.en.some((c) => c.toLowerCase() === normalized),
  )
}

export function sortByPlays(games: Game[]): Game[] {
  return [...games].sort((a, b) => b.gamePlays - a.gamePlays)
}

export function sortByRating(games: Game[]): Game[] {
  return [...games].sort((a, b) => b.rating - a.rating)
}
