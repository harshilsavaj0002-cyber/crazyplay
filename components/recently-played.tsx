"use client"

import Image from "next/image"
import Link from "next/link"
import { useMemo } from "react"
import type { Game } from "@/types/game"
import { useRecent } from "@/hooks/use-recent"
import { formatPlays } from "@/lib/helpers"

interface RecentlyPlayedProps {
  games: Game[]
  variant?: "sidebar" | "grid"
  limit?: number
}

export function RecentlyPlayed({
  games,
  variant = "sidebar",
  limit = 5,
}: RecentlyPlayedProps) {
  const { recent, hydrated } = useRecent()

  const items = useMemo(() => {
    const map = new Map(games.map((g) => [g.code, g]))
    return recent
      .map((code) => map.get(code))
      .filter((g): g is Game => Boolean(g))
      .slice(0, variant === "sidebar" ? limit : undefined)
  }, [recent, games, limit, variant])

  if (!hydrated) return null

  if (items.length === 0) {
    return (
      <p className="text-sm text-muted-foreground">
        No games played yet. Start playing to see them here.
      </p>
    )
  }

  if (variant === "grid") {
    return (
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6">
        {items.map((game) => (
          <Link
            key={game.code}
            href={`/game/${game.code}`}
            className="group overflow-hidden rounded-xl bg-card ring-1 ring-border transition hover:ring-primary/60"
          >
            <div className="relative aspect-square">
              <Image
                src={game.assets.square || game.assets.thumb}
                alt={game.name.en}
                fill
                sizes="(max-width:640px) 50vw, 16vw"
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <div className="p-2.5">
              <h3 className="truncate text-sm font-semibold">{game.name.en}</h3>
              <p className="text-xs text-muted-foreground">
                {formatPlays(game.gamePlays)} plays
              </p>
            </div>
          </Link>
        ))}
      </div>
    )
  }

  return (
    <ul className="space-y-2">
      {items.map((game) => (
        <li key={game.code}>
          <Link
            href={`/game/${game.code}`}
            className="flex items-center gap-3 rounded-lg p-1.5 transition hover:bg-sidebar-accent"
          >
            <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-md">
              <Image
                src={game.assets.square || game.assets.thumb}
                alt={game.name.en}
                fill
                sizes="40px"
                className="object-cover"
              />
            </div>
            <span className="truncate text-sm text-sidebar-foreground">
              {game.name.en}
            </span>
          </Link>
        </li>
      ))}
    </ul>
  )
}
