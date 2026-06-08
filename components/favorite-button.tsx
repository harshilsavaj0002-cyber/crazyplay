"use client"

import { Heart } from "lucide-react"
import { useFavorites } from "@/hooks/use-favorites"
import { cn } from "@/lib/utils"

interface FavoriteButtonProps {
  code: string
  className?: string
  size?: number
  withLabel?: boolean
}

export function FavoriteButton({
  code,
  className,
  size = 18,
  withLabel = false,
}: FavoriteButtonProps) {
  const { isFavorite, toggleFavorite, hydrated } = useFavorites()
  const active = hydrated && isFavorite(code)

  return (
    <button
      type="button"
      aria-pressed={active}
      aria-label={active ? "Remove from favorites" : "Add to favorites"}
      onClick={(e) => {
        e.preventDefault()
        e.stopPropagation()
        toggleFavorite(code)
      }}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-full transition-colors",
        withLabel
          ? "px-4 py-2 bg-secondary text-secondary-foreground hover:bg-secondary/80 text-sm font-medium"
          : "h-9 w-9 bg-background/70 backdrop-blur-sm hover:bg-background",
        className,
      )}
    >
      <Heart
        size={size}
        className={cn(
          "transition-colors",
          active
            ? "fill-destructive text-destructive"
            : "text-foreground",
        )}
      />
      {withLabel && (
        <span>{active ? "Favorited" : "Favorite"}</span>
      )}
    </button>
  )
}
