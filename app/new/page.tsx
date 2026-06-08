import type { Metadata } from "next"
import { Sparkles } from "lucide-react"
import { fetchAllGames } from "@/lib/gamezop"
import { PageHero } from "@/components/page-hero"
import { InfiniteGrid } from "@/components/infinite-grid"

export const revalidate = 3600

export const metadata: Metadata = {
  title: "New Games",
  description: "The latest games added to crazyplay.",
}

export default async function NewPage() {
  // The Gamezop feed lists newest additions last, so reverse for a "new first" view.
  const games = [...(await fetchAllGames())].reverse()

  return (
    <div className="mx-auto max-w-[1600px] px-4 py-6 sm:px-6">
      <PageHero
        title="New Games"
        subtitle="Freshly added to our collection"
        count={games.length}
        icon={<Sparkles size={22} />}
      />
      <InfiniteGrid games={games} />
    </div>
  )
}
