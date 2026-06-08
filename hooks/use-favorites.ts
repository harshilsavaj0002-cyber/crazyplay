"use client"

import { useCallback, useEffect, useState } from "react"

const KEY = "crazyplay:favorites"

function read(): string[] {
  if (typeof window === "undefined") return []
  try {
    const raw = window.localStorage.getItem(KEY)
    return raw ? (JSON.parse(raw) as string[]) : []
  } catch {
    return []
  }
}

export function useFavorites() {
  const [favorites, setFavorites] = useState<string[]>([])
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    setFavorites(read())
    setHydrated(true)

    const onStorage = (e: StorageEvent) => {
      if (e.key === KEY) setFavorites(read())
    }
    const onCustom = () => setFavorites(read())
    window.addEventListener("storage", onStorage)
    window.addEventListener("crazyplay:favorites-changed", onCustom)
    return () => {
      window.removeEventListener("storage", onStorage)
      window.removeEventListener("crazyplay:favorites-changed", onCustom)
    }
  }, [])

  const persist = useCallback((next: string[]) => {
    window.localStorage.setItem(KEY, JSON.stringify(next))
    window.dispatchEvent(new Event("crazyplay:favorites-changed"))
    setFavorites(next)
  }, [])

  const toggleFavorite = useCallback(
    (code: string) => {
      const current = read()
      const next = current.includes(code)
        ? current.filter((c) => c !== code)
        : [code, ...current]
      persist(next)
    },
    [persist],
  )

  const isFavorite = useCallback(
    (code: string) => favorites.includes(code),
    [favorites],
  )

  return { favorites, toggleFavorite, isFavorite, hydrated }
}
