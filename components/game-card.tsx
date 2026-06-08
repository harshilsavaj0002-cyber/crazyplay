"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Play, Star } from "lucide-react"
import type { Game } from "@/types/game"
import { formatPlays, formatRating, slugify } from "@/lib/helpers"
import { FavoriteButton } from "@/components/favorite-button"

interface GameCardProps {
  game: Game
  priority?: boolean
}

export function GameCard({ game, priority = false }: GameCardProps) {
  const category = game.categories.en[0]

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.3 }}
      className="group relative"
    >
      <Link
        href={`/game/${game.code}`}
        className="block overflow-hidden rounded-xl bg-card ring-1 ring-border transition-all duration-300 hover:ring-primary/60 hover:shadow-xl hover:shadow-primary/10"
      >
        <div className="relative aspect-square overflow-hidden">
          <Image
            src={game.assets.square || game.assets.thumb}
            alt={game.name.en}
            fill
            sizes="(max-width:640px) 50vw, (max-width:1024px) 33vw, 16vw"
            priority={priority}
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

          <div className="absolute right-2 top-2">
            <FavoriteButton code={game.code} size={16} />
          </div>

          {category && (
            <span className="absolute left-2 top-2 rounded-full bg-background/70 px-2 py-0.5 text-[10px] font-medium text-foreground backdrop-blur-sm">
              {category}
            </span>
          )}

          <div className="absolute inset-x-0 bottom-0 flex translate-y-2 items-center justify-center pb-3 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-1.5 text-xs font-semibold text-primary-foreground">
              <Play size={14} className="fill-current" />
              Play
            </span>
          </div>
        </div>

        <div className="p-2.5">
          <h3 className="truncate text-sm font-semibold text-card-foreground">
            {game.name.en}
          </h3>
          <div className="mt-1 flex items-center justify-between text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-1">
              <Star size={12} className="fill-primary text-primary" />
              {formatRating(game.rating)}
            </span>
            <span>{formatPlays(game.gamePlays)} plays</span>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

export { slugify }
