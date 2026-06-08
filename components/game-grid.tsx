import type { Game } from "@/types/game"
import { GameCard } from "@/components/game-card"

interface GameGridProps {
  games: Game[]
  priorityCount?: number
}

export function GameGrid({ games, priorityCount = 0 }: GameGridProps) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6">
      {games.map((game, i) => (
        <GameCard key={game.code} game={game} priority={i < priorityCount} />
      ))}
    </div>
  )
}
