"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import {
  Maximize,
  Share2,
  Flag,
  ThumbsUp,
  Play,
  Loader2,
} from "lucide-react"
import type { Game } from "@/types/game"
import { FavoriteButton } from "@/components/favorite-button"
import { useRecent } from "@/hooks/use-recent"

interface GamePlayerProps {
  game: Game
}

export function GamePlayer({ game }: GamePlayerProps) {
  const [started, setStarted] = useState(false)
  const [loading, setLoading] = useState(true)
  const [liked, setLiked] = useState(false)
  const [status, setStatus] = useState<string | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const { addRecent } = useRecent()

  useEffect(() => {
    if (started) addRecent(game.code)
  }, [started, game.code, addRecent])

  const flashStatus = (msg: string) => {
    setStatus(msg)
    setTimeout(() => setStatus(null), 2000)
  }

  const toggleFullscreen = () => {
    const el = containerRef.current
    if (!el) return
    if (document.fullscreenElement) {
      document.exitFullscreen()
    } else {
      el.requestFullscreen?.()
    }
  }

  const share = async () => {
    const url = typeof window !== "undefined" ? window.location.href : ""
    try {
      if (navigator.share) {
        await navigator.share({ title: game.name.en, url })
      } else {
        await navigator.clipboard.writeText(url)
        flashStatus("Link copied to clipboard")
      }
    } catch {
      /* user cancelled */
    }
  }

  return (
    <div className="space-y-3">
      <div
        ref={containerRef}
        className="relative mx-auto w-full overflow-hidden rounded-xl bg-black ring-1 ring-border"
        style={{ maxWidth: 1400 }}
      >
        <div
          className="relative w-full"
          style={{
            aspectRatio: game.isPortrait ? "9 / 16" : "16 / 9",
            maxHeight: "80vh",
          }}
        >
          {!started ? (
            <button
              type="button"
              onClick={() => setStarted(true)}
              className="group absolute inset-0 flex flex-col items-center justify-center"
            >
              <Image
                src={game.assets.cover || game.assets.wall}
                alt={game.name.en}
                fill
                priority
                sizes="100vw"
                className="object-cover opacity-50"
              />
              <span className="relative flex h-20 w-20 items-center justify-center rounded-full bg-primary text-primary-foreground transition group-hover:scale-110">
                <Play size={36} className="fill-current" />
              </span>
              <span className="relative mt-4 text-lg font-bold text-foreground">
                Click to Play
              </span>
              <span className="relative mt-1 text-sm text-muted-foreground">
                {game.name.en}
              </span>
            </button>
          ) : (
            <>
              {loading && (
                <div className="absolute inset-0 z-10 flex items-center justify-center bg-black">
                  <Loader2 className="animate-spin text-primary" size={40} />
                </div>
              )}
              <iframe
                src={game.url}
                title={game.name.en}
                allowFullScreen
                onLoad={() => setLoading(false)}
                className="absolute inset-0 h-full w-full border-0"
              />
            </>
          )}
        </div>
      </div>

      {/* Controls */}
      <div className="sticky bottom-0 z-20 mx-auto flex w-full max-w-[1400px] flex-wrap items-center gap-2 rounded-xl bg-card p-2 ring-1 ring-border [padding-bottom:max(0.5rem,env(safe-area-inset-bottom))]">
        <button
          type="button"
          onClick={() => {
            setLiked((v) => !v)
            flashStatus(liked ? "Removed like" : "Thanks for the like!")
          }}
          aria-pressed={liked}
          className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition ${
            liked
              ? "bg-primary text-primary-foreground"
              : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
          }`}
        >
          <ThumbsUp size={16} className={liked ? "fill-current" : ""} />
          Like
        </button>

        <FavoriteButton code={game.code} withLabel />

        <button
          type="button"
          onClick={share}
          className="inline-flex items-center gap-2 rounded-full bg-secondary px-4 py-2 text-sm font-medium text-secondary-foreground transition hover:bg-secondary/80"
        >
          <Share2 size={16} />
          Share
        </button>

        <button
          type="button"
          onClick={() => flashStatus("Report submitted. Thank you!")}
          className="inline-flex items-center gap-2 rounded-full bg-secondary px-4 py-2 text-sm font-medium text-secondary-foreground transition hover:bg-secondary/80"
        >
          <Flag size={16} />
          Report
        </button>

        <button
          type="button"
          onClick={toggleFullscreen}
          className="ml-auto inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
        >
          <Maximize size={16} />
          Fullscreen
        </button>
      </div>

      {status && (
        <p
          role="status"
          className="text-center text-sm font-medium text-primary"
        >
          {status}
        </p>
      )}
    </div>
  )
}
