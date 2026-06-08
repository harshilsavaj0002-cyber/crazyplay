"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Play, Star, Flame } from "lucide-react"
import type { Game } from "@/types/game"
import { formatPlays, formatRating } from "@/lib/helpers"

interface HeroBannerProps {
  game: Game
}

export function HeroBanner({ game }: HeroBannerProps) {
  return (
    <section className="relative overflow-hidden rounded-2xl ring-1 ring-border">
      <div className="absolute inset-0">
        <Image
          src={game.assets.wall || game.assets.cover}
          alt={game.name.en}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/85 to-background/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
      </div>

      <div className="relative flex min-h-[280px] flex-col justify-center gap-4 p-6 sm:min-h-[360px] sm:p-10 lg:min-h-[420px] lg:p-14">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-xl"
        >
          <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/15 px-3 py-1 text-xs font-semibold text-primary ring-1 ring-primary/30">
            <Flame size={13} />
            Featured Game
          </span>
          <h1 className="mt-4 text-balance text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            {game.name.en}
          </h1>
          <p className="mt-3 max-w-md text-pretty text-sm leading-relaxed text-muted-foreground sm:text-base">
            {game.description.en}
          </p>

          <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-1.5">
              <Star size={15} className="fill-primary text-primary" />
              {formatRating(game.rating)}
            </span>
            <span>{formatPlays(game.gamePlays)} plays</span>
            {game.categories.en[0] && (
              <span className="rounded-full bg-secondary px-2.5 py-0.5 text-xs text-secondary-foreground">
                {game.categories.en[0]}
              </span>
            )}
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href={`/play/${game.code}`}
              className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
            >
              <Play size={18} className="fill-current" />
              Play Now
            </Link>
            <Link
              href={`/game/${game.code}`}
              className="inline-flex items-center gap-2 rounded-full bg-secondary px-6 py-3 text-sm font-semibold text-secondary-foreground transition hover:bg-secondary/80"
            >
              Details
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
