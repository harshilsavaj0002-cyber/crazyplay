import type { Game } from "@/types/game"
import { GameGrid } from "@/components/game-grid"
import { SectionHeader } from "@/components/section-header"
import { slugify } from "@/lib/helpers"

interface CategorySectionProps {
  title: string
  games: Game[]
  category?: string
  icon?: React.ReactNode
  limit?: number
}

export function CategorySection({
  title,
  games,
  category,
  icon,
  limit = 12,
}: CategorySectionProps) {
  if (games.length === 0) return null

  return (
    <section>
      <SectionHeader
        title={title}
        icon={icon}
        viewAllHref={category ? `/category/${slugify(category)}` : undefined}
      />
      <GameGrid games={games.slice(0, limit)} />
    </section>
  )
}
