import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import {
  Play,
  Star,
  Users,
  Smartphone,
  Monitor,
  Tag,
  ImageIcon,
} from "lucide-react"
import { fetchAllGames, getGameByCode } from "@/lib/gamezop"
import { formatPlays, formatRating, slugify } from "@/lib/helpers"
import { ScreenshotCarousel } from "@/components/screenshot-carousel"
import { FavoriteButton } from "@/components/favorite-button"
import { SectionHeader } from "@/components/section-header"
import { GameGrid } from "@/components/game-grid"

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
    title: game.name.en,
    description: game.description.en,
    openGraph: {
      title: game.name.en,
      description: game.description.en,
      images: [{ url: game.assets.cover }],
    },
    twitter: {
      card: "summary_large_image",
      title: game.name.en,
      description: game.description.en,
      images: [game.assets.cover],
    },
  }
}

export default async function GameDetailPage({
  params,
}: {
  params: Promise<{ code: string }>
}) {
  const { code } = await params
  const game = await getGameByCode(code)
  if (!game) notFound()

  const all = await fetchAllGames()
  const related = all
    .filter(
      (g) =>
        g.code !== game.code &&
        g.categories.en.some((c) => game.categories.en.includes(c)),
    )
    .slice(0, 12)

  const info = [
    {
      icon: <Star size={16} className="fill-primary text-primary" />,
      label: "Rating",
      value: `${formatRating(game.rating)} / 5`,
    },
    {
      icon: <Users size={16} className="text-primary" />,
      label: "Ratings",
      value: game.numberOfRatings.toLocaleString(),
    },
    {
      icon: <Play size={16} className="text-primary" />,
      label: "Plays",
      value: formatPlays(game.gamePlays),
    },
    {
      icon: game.isPortrait ? (
        <Smartphone size={16} className="text-primary" />
      ) : (
        <Monitor size={16} className="text-primary" />
      ),
      label: "Orientation",
      value: game.isPortrait ? "Portrait" : "Landscape",
    },
  ]

  return (
    <div className="mx-auto max-w-[1200px] px-4 py-6 sm:px-6">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        {/* Cover */}
        <div className="relative aspect-video overflow-hidden rounded-2xl ring-1 ring-border">
          <Image
            src={game.assets.cover || game.assets.wall}
            alt={game.name.en}
            fill
            priority
            sizes="(max-width:1024px) 100vw, 50vw"
            className="object-cover"
          />
        </div>

        {/* Info */}
        <div className="flex flex-col">
          <div className="mb-2 flex flex-wrap gap-2">
            {game.categories.en.map((cat) => (
              <Link
                key={cat}
                href={`/category/${slugify(cat)}`}
                className="rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground transition hover:bg-primary hover:text-primary-foreground"
              >
                {cat}
              </Link>
            ))}
          </div>

          <h1 className="text-balance text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
            {game.name.en}
          </h1>
          <p className="mt-3 text-pretty leading-relaxed text-muted-foreground">
            {game.description.en}
          </p>

          <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {info.map((item) => (
              <div
                key={item.label}
                className="rounded-xl bg-card p-3 text-center ring-1 ring-border"
              >
                <div className="flex justify-center">{item.icon}</div>
                <p className="mt-1.5 text-sm font-bold text-foreground">
                  {item.value}
                </p>
                <p className="text-xs text-muted-foreground">{item.label}</p>
              </div>
            ))}
          </div>

          {game.tags.en.length > 0 && (
            <div className="mt-5">
              <h2 className="mb-2 flex items-center gap-1.5 text-sm font-semibold text-foreground">
                <Tag size={15} className="text-primary" />
                Tags
              </h2>
              <div className="flex flex-wrap gap-2">
                {game.tags.en.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-secondary px-3 py-1 text-xs text-secondary-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="mt-auto flex flex-wrap gap-3 pt-6">
            <Link
              href={`/play/${game.code}`}
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-primary px-8 py-4 text-base font-bold text-primary-foreground transition hover:opacity-90 sm:flex-none"
            >
              <Play size={20} className="fill-current" />
              PLAY GAME
            </Link>
            <FavoriteButton code={game.code} withLabel className="px-5 py-4" />
          </div>
        </div>
      </div>

      {/* Screenshots */}
      {game.assets.screens?.length > 0 && (
        <section className="mt-12">
          <SectionHeader title="Screenshots" icon={<ImageIcon size={20} />} />
          <ScreenshotCarousel screens={game.assets.screens} name={game.name.en} />
        </section>
      )}

      {/* Related */}
      {related.length > 0 && (
        <section className="mt-12">
          <SectionHeader title="You May Also Like" />
          <GameGrid games={related} />
        </section>
      )}
    </div>
  )
}
