"use client"

import { useEffect, useRef, useState } from "react"
import type { Game } from "@/types/game"
import { GameCard } from "@/components/game-card"

interface InfiniteGridProps {
  games: Game[]
  pageSize?: number
}

export function InfiniteGrid({ games, pageSize = 24 }: InfiniteGridProps) {
  const [visible, setVisible] = useState(pageSize)
  const sentinel = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setVisible(pageSize)
  }, [games, pageSize])

  useEffect(() => {
    const el = sentinel.current
    if (!el) return
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisible((v) => Math.min(v + pageSize, games.length))
        }
      },
      { rootMargin: "400px" },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [games.length, pageSize])

  return (
    <>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6">
        {games.slice(0, visible).map((game, i) => (
          <GameCard key={game.code} game={game} priority={i < 6} />
        ))}
      </div>
      {visible < games.length && (
        <div ref={sentinel} className="h-12 w-full" aria-hidden="true" />
      )}
    </>
  )
}
