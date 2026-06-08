import type { Metadata } from "next"
import { Star } from "lucide-react"
import { fetchAllGames, sortByRating } from "@/lib/gamezop"
import { PageHero } from "@/components/page-hero"
import { InfiniteGrid } from "@/components/infinite-grid"

export const revalidate = 3600

export const metadata: Metadata = {
  title: "Top Rated Games",
  description: "The highest rated games on crazyplay.",
}

export default async function TopRatedPage() {
  const all = await fetchAllGames()
  const games = sortByRating(all.filter((g) => g.numberOfRatings >= 5))

  return (
    <div className="mx-auto max-w-[1600px] px-4 py-6 sm:px-6">
      <PageHero
        title="Top Rated Games"
        subtitle="Highest rated games by our players"
        count={games.length}
        icon={<Star size={22} />}
      />
      <InfiniteGrid games={games} />
    </div>
  )
}
