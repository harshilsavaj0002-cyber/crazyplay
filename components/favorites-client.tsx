"use client"

import { useEffect, useMemo, useState } from "react"
import Link from "next/link"
import { HeartCrack } from "lucide-react"
import type { Game } from "@/types/game"
import { useFavorites } from "@/hooks/use-favorites"
import { GameGrid } from "@/components/game-grid"
import { GridSkeleton } from "@/components/loading-skeleton"

export function FavoritesClient() {
  const { favorites, hydrated } = useFavorites()
  const [games, setGames] = useState<Game[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let active = true
    fetch("/api/games")
      .then((r) => r.json())
      .then((data: { games: Game[] }) => {
        if (active) setGames(data.games ?? [])
      })
      .catch((err) => console.log("[v0] favorites fetch error:", err))
      .finally(() => {
        if (active) setLoading(false)
      })
    return () => {
      active = false
    }
  }, [])

  const items = useMemo(() => {
    const map = new Map(games.map((g) => [g.code, g]))
    return favorites
      .map((code) => map.get(code))
      .filter((g): g is Game => Boolean(g))
  }, [favorites, games])

  if (loading || !hydrated) return <GridSkeleton count={12} />

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <HeartCrack size={40} className="text-muted-foreground" />
        <p className="mt-4 text-lg font-semibold text-foreground">
          No favorites yet
        </p>
        <p className="mt-1 text-sm text-muted-foreground">
          Tap the heart on any game to save it here.
        </p>
        <Link
          href="/games"
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
        >
          Browse Games
        </Link>
      </div>
    )
  }

  return <GameGrid games={items} priorityCount={6} />
}
