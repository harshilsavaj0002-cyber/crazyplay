import type { Metadata } from "next"
import { Gamepad2 } from "lucide-react"
import { fetchAllGames, sortByPlays } from "@/lib/gamezop"
import { PageHero } from "@/components/page-hero"
import { InfiniteGrid } from "@/components/infinite-grid"

export const revalidate = 3600

export const metadata: Metadata = {
  title: "All Games",
  description: "Browse our full collection of free online games.",
}

export default async function GamesPage() {
  const games = sortByPlays(await fetchAllGames())

  return (
    <div className="mx-auto max-w-[1600px] px-4 py-6 sm:px-6">
      <PageHero
        title="All Games"
        subtitle="Browse our complete collection"
        count={games.length}
        icon={<Gamepad2 size={22} />}
      />
      <InfiniteGrid games={games} />
    </div>
  )
}
