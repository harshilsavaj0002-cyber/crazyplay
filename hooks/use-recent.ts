"use client"

import { useCallback, useEffect, useState } from "react"

const KEY = "crazyplay:recent"
const MAX = 20

function read(): string[] {
  if (typeof window === "undefined") return []
  try {
    const raw = window.localStorage.getItem(KEY)
    return raw ? (JSON.parse(raw) as string[]) : []
  } catch {
    return []
  }
}

export function useRecent() {
  const [recent, setRecent] = useState<string[]>([])
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    setRecent(read())
    setHydrated(true)
    const onCustom = () => setRecent(read())
    window.addEventListener("crazyplay:recent-changed", onCustom)
    return () =>
      window.removeEventListener("crazyplay:recent-changed", onCustom)
  }, [])

  const addRecent = useCallback((code: string) => {
    const current = read()
    const next = [code, ...current.filter((c) => c !== code)].slice(0, MAX)
    window.localStorage.setItem(KEY, JSON.stringify(next))
    window.dispatchEvent(new Event("crazyplay:recent-changed"))
    setRecent(next)
  }, [])

  return { recent, addRecent, hydrated }
}
