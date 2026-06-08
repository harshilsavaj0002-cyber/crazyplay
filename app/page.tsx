import { Flame, TrendingUp, Star, Swords, Gamepad, Puzzle, Trophy, Crosshair, Compass } from "lucide-react"
import {
  fetchAllGames,
  getCategories,
  sortByPlays,
  sortByRating,
} from "@/lib/gamezop"
import type { Game } from "@/types/game"
import { HeroBanner } from "@/components/hero-banner"
import { GameSlider } from "@/components/game-slider"
import { CategorySection } from "@/components/category-section"
import { SectionHeader } from "@/components/section-header"
import { GameGrid } from "@/components/game-grid"
import { Sidebar } from "@/components/sidebar"

export const revalidate = 3600

function byCategory(games: Game[], name: string) {
  return games.filter((g) =>
    g.categories.en.some((c) => c.toLowerCase() === name.toLowerCase()),
  )
}

export default async function HomePage() {
  const games = await fetchAllGames()
  const categories = await getCategories()

  const mostPlayed = sortByPlays(games)
  const topRated = sortByRating(games.filter((g) => g.numberOfRatings >= 5))
  const trending = mostPlayed.slice(0, 16)
  const featured = topRated[0] ?? games[0]

  return (
    <div className="mx-auto max-w-[1600px] px-4 py-6 sm:px-6">
      <div className="flex gap-6">
        <div className="min-w-0 flex-1 space-y-10">
          <HeroBanner game={featured} />

          <section>
            <SectionHeader
              title="Trending Now"
              icon={<TrendingUp size={20} />}
              viewAllHref="/trending"
            />
            <GameSlider games={trending} />
          </section>

          <section>
            <SectionHeader
              title="Most Played"
              icon={<Flame size={20} />}
              viewAllHref="/trending"
            />
            <GameGrid games={mostPlayed.slice(0, 12)} priorityCount={6} />
          </section>

          <section>
            <SectionHeader
              title="Top Rated"
              icon={<Star size={20} />}
              viewAllHref="/top-rated"
            />
            <GameGrid games={topRated.slice(0, 12)} />
          </section>

          <CategorySection title="Action Games" category="Action" icon={<Swords size={20} />} games={byCategory(games, "Action")} />
          <CategorySection title="Arcade Games" category="Arcade" icon={<Gamepad size={20} />} games={byCategory(games, "Arcade")} />
          <CategorySection title="Puzzle Games" category="Puzzle" icon={<Puzzle size={20} />} games={byCategory(games, "Puzzle")} />
          <CategorySection title="Sports Games" category="Sports" icon={<Trophy size={20} />} games={byCategory(games, "Sports")} />
          <CategorySection title="Shooting Games" category="Shooting" icon={<Crosshair size={20} />} games={byCategory(games, "Shooting")} />
          <CategorySection title="Adventure Games" category="Adventure" icon={<Compass size={20} />} games={byCategory(games, "Adventure")} />
        </div>

        <Sidebar
          categories={categories}
          topRated={topRated}
          mostPlayed={mostPlayed}
          allGames={games}
        />
      </div>
    </div>
  )
}
