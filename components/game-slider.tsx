"use client"

import { useRef } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import type { Game } from "@/types/game"
import { GameCard } from "@/components/game-card"

interface GameSliderProps {
  games: Game[]
}

export function GameSlider({ games }: GameSliderProps) {
  const ref = useRef<HTMLDivElement>(null)

  const scroll = (dir: "left" | "right") => {
    const el = ref.current
    if (!el) return
    const amount = el.clientWidth * 0.8
    el.scrollBy({ left: dir === "left" ? -amount : amount, behavior: "smooth" })
  }

  return (
    <div className="relative">
      <button
        type="button"
        aria-label="Scroll left"
        onClick={() => scroll("left")}
        className="absolute -left-3 top-1/2 z-10 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-card text-foreground ring-1 ring-border transition hover:bg-primary hover:text-primary-foreground md:flex"
      >
        <ChevronLeft size={20} />
      </button>

      <div
        ref={ref}
        className="no-scrollbar flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-smooth pb-1"
      >
        {games.map((game) => (
          <div
            key={game.code}
            className="w-40 shrink-0 snap-start sm:w-44 md:w-48"
          >
            <GameCard game={game} />
          </div>
        ))}
      </div>

      <button
        type="button"
        aria-label="Scroll right"
        onClick={() => scroll("right")}
        className="absolute -right-3 top-1/2 z-10 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-card text-foreground ring-1 ring-border transition hover:bg-primary hover:text-primary-foreground md:flex"
      >
        <ChevronRight size={20} />
      </button>
    </div>
  )
}
