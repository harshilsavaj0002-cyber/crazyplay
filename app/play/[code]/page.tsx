import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ChevronLeft, Star, Sparkles } from "lucide-react"
import { fetchAllGames, getGameByCode } from "@/lib/gamezop"
import { formatPlays, formatRating } from "@/lib/helpers"
import { GamePlayer } from "@/components/game-player"
import { GameSlider } from "@/components/game-slider"
import { SectionHeader } from "@/components/section-header"
import { RecentlyPlayed } from "@/components/recently-played"

export const revalidate = 3600

export async function generateMetadata({
  params,
}: {
  params: Promise<{ code: string }>
}): Promise<Metadata> {
  const { code } = await params
  const game = await getGameByCode(code)
  if (!game) return { title: "Game not found" }
  return {
    title: `Play ${game.name.en}`,
    description: `Play ${game.name.en} for free online. ${game.description.en}`,
  }
}

export default async function PlayPage({
  params,
}: {
  params: Promise<{ code: string }>
}) {
  const { code } = await params
  const game = await getGameByCode(code)
  if (!game) notFound()

  const all = await fetchAllGames()
  const recommended = all
    .filter(
      (g) =>
        g.code !== game.code &&
        g.categories.en.some((c) => game.categories.en.includes(c)),
    )
    .slice(0, 16)

  return (
    <div className="mx-auto max-w-[1600px] px-4 py-4 sm:px-6">
      <div className="mb-4 flex items-center justify-between gap-4">
        <Link
          href={`/game/${game.code}`}
          className="inline-flex items-center gap-1 text-sm font-medium text-muted-foreground transition hover:text-foreground"
        >
          <ChevronLeft size={18} />
          Back to details
        </Link>
        <div className="flex items-center gap-3 text-sm text-muted-foreground">
          <span className="inline-flex items-center gap-1">
            <Star size={14} className="fill-primary text-primary" />
            {formatRating(game.rating)}
          </span>
          <span>{formatPlays(game.gamePlays)} plays</span>
        </div>
      </div>

      <h1 className="mb-3 text-xl font-bold text-foreground sm:text-2xl">
        {game.name.en}
      </h1>

      <GamePlayer game={game} />

      {/* Game info */}
      <section className="mx-auto mt-6 max-w-[1400px] rounded-xl bg-card p-5 ring-1 ring-border">
        <h2 className="mb-2 text-base font-semibold text-foreground">
          About {game.name.en}
        </h2>
        <p className="text-sm leading-relaxed text-muted-foreground">
          {game.description.en}
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          {game.tags.en.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-secondary px-3 py-1 text-xs text-secondary-foreground"
            >
              {tag}
            </span>
          ))}
        </div>
      </section>

      {recommended.length > 0 && (
        <section className="mt-10">
          <SectionHeader
            title="Recommended Games"
            icon={<Sparkles size={20} />}
          />
          <GameSlider games={recommended} />
        </section>
      )}

      <section className="mt-10">
        <SectionHeader title="Recently Played" />
        <RecentlyPlayed games={all} variant="grid" />
      </section>
    </div>
  )
}
