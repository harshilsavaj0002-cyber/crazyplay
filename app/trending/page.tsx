import type { Metadata } from "next"
import { TrendingUp } from "lucide-react"
import { fetchAllGames, sortByPlays } from "@/lib/gamezop"
import { PageHero } from "@/components/page-hero"
import { InfiniteGrid } from "@/components/infinite-grid"

export const revalidate = 3600

export const metadata: Metadata = {
  title: "Trending Games",
  description: "The most played games on crazyplay right now.",
}

export default async function TrendingPage() {
  const games = sortByPlays(await fetchAllGames())

  return (
    <div className="mx-auto max-w-[1600px] px-4 py-6 sm:px-6">
      <PageHero
        title="Trending Games"
        subtitle="The hottest games by play count"
        count={games.length}
        icon={<TrendingUp size={22} />}
      />
      <InfiniteGrid games={games} />
    </div>
  )
}
