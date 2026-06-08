import Image from "next/image"
import Link from "next/link"
import { Flame, Star, Tag, Clock } from "lucide-react"
import type { Game } from "@/types/game"
import { formatPlays, formatRating, slugify } from "@/lib/helpers"
import { RecentlyPlayed } from "@/components/recently-played"

interface SidebarProps {
  categories: string[]
  topRated: Game[]
  mostPlayed: Game[]
  allGames: Game[]
}

function MiniGameList({ games }: { games: Game[] }) {
  return (
    <ul className="space-y-2">
      {games.map((game) => (
        <li key={game.code}>
          <Link
            href={`/game/${game.code}`}
            className="flex items-center gap-3 rounded-lg p-1.5 transition hover:bg-sidebar-accent"
          >
            <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-md">
              <Image
                src={game.assets.square || game.assets.thumb}
                alt={game.name.en}
                fill
                sizes="40px"
                className="object-cover"
              />
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm text-sidebar-foreground">
                {game.name.en}
              </p>
              <p className="flex items-center gap-1 text-xs text-muted-foreground">
                <Star size={11} className="fill-primary text-primary" />
                {formatRating(game.rating)}
                <span className="px-1">·</span>
                {formatPlays(game.gamePlays)}
              </p>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  )
}

function Block({
  title,
  icon,
  children,
}: {
  title: string
  icon: React.ReactNode
  children: React.ReactNode
}) {
  return (
    <section className="rounded-xl bg-sidebar p-4 ring-1 ring-sidebar-border">
      <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-sidebar-foreground">
        <span className="text-primary">{icon}</span>
        {title}
      </h3>
      {children}
    </section>
  )
}

export function Sidebar({
  categories,
  topRated,
  mostPlayed,
  allGames,
}: SidebarProps) {
  return (
    <aside className="hidden w-64 shrink-0 space-y-4 xl:block">
      <Block title="Top Categories" icon={<Tag size={16} />}>
        <div className="flex flex-wrap gap-2">
          {categories.slice(0, 12).map((cat) => (
            <Link
              key={cat}
              href={`/category/${slugify(cat)}`}
              className="rounded-full bg-sidebar-accent px-3 py-1 text-xs text-sidebar-foreground transition hover:bg-primary hover:text-primary-foreground"
            >
              {cat}
            </Link>
          ))}
        </div>
      </Block>

      <Block title="Top Rated" icon={<Star size={16} />}>
        <MiniGameList games={topRated.slice(0, 5)} />
      </Block>

      <Block title="Most Played" icon={<Flame size={16} />}>
        <MiniGameList games={mostPlayed.slice(0, 5)} />
      </Block>

      <Block title="Recently Played" icon={<Clock size={16} />}>
        <RecentlyPlayed games={allGames} variant="sidebar" />
      </Block>
    </aside>
  )
}
