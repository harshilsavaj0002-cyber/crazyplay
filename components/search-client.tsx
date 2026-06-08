"use client"

import { useEffect, useMemo, useState } from "react"
import { useSearchParams } from "next/navigation"
import { Search, SearchX } from "lucide-react"
import type { Game } from "@/types/game"
import { searchGames } from "@/lib/helpers"
import { GameGrid } from "@/components/game-grid"
import { GridSkeleton } from "@/components/loading-skeleton"

export function SearchClient() {
  const searchParams = useSearchParams()
  const initialQuery = searchParams.get("q") ?? ""

  const [games, setGames] = useState<Game[]>([])
  const [loading, setLoading] = useState(true)
  const [query, setQuery] = useState(initialQuery)

  useEffect(() => {
    setQuery(searchParams.get("q") ?? "")
  }, [searchParams])

  useEffect(() => {
    let active = true
    setLoading(true)
    fetch("/api/games")
      .then((r) => r.json())
      .then((data: { games: Game[] }) => {
        if (active) setGames(data.games ?? [])
      })
      .catch((err) => console.log("[v0] search fetch error:", err))
      .finally(() => {
        if (active) setLoading(false)
      })
    return () => {
      active = false
    }
  }, [])

  const results = useMemo(() => searchGames(games, query), [games, query])

  return (
    <div className="space-y-6">
      <div className="relative mx-auto w-full max-w-xl">
        <Search
          size={18}
          className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
        />
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search games by name, tag or category..."
          aria-label="Search games"
          className="w-full rounded-full bg-input py-3 pl-11 pr-4 text-sm text-foreground placeholder:text-muted-foreground outline-none ring-1 ring-border transition focus:ring-2 focus:ring-primary"
        />
      </div>

      {loading ? (
        <GridSkeleton count={12} />
      ) : query.trim() === "" ? (
        <p className="py-12 text-center text-muted-foreground">
          Start typing to search across {games.length} games.
        </p>
      ) : results.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <SearchX size={40} className="text-muted-foreground" />
          <p className="mt-4 text-lg font-semibold text-foreground">
            No games found for &quot;{query}&quot;
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            Try a different keyword, category, or tag.
          </p>
        </div>
      ) : (
        <>
          <p className="text-sm text-muted-foreground">
            <span className="font-semibold text-foreground">
              {results.length}
            </span>{" "}
            result{results.length === 1 ? "" : "s"} for &quot;{query}&quot;
          </p>
          <GameGrid games={results} priorityCount={6} />
        </>
      )}
    </div>
  )
}
