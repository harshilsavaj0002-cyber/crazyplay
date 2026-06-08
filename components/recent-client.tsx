"use client"

import { useEffect, useState } from "react"
import type { Game } from "@/types/game"
import { RecentlyPlayed } from "@/components/recently-played"
import { GridSkeleton } from "@/components/loading-skeleton"

export function RecentClient() {
  const [games, setGames] = useState<Game[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let active = true
    fetch("/api/games")
      .then((r) => r.json())
      .then((data: { games: Game[] }) => {
        if (active) setGames(data.games ?? [])
      })
      .catch((err) => console.log("[v0] recent fetch error:", err))
      .finally(() => {
        if (active) setLoading(false)
      })
    return () => {
      active = false
    }
  }, [])

  if (loading) return <GridSkeleton count={12} />

  return <RecentlyPlayed games={games} variant="grid" />
}
