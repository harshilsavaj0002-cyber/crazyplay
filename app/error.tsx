"use client"

import { useEffect } from "react"
import { AlertTriangle, RotateCcw } from "lucide-react"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.log("[v0] Page error:", error.message)
  }, [error])

  return (
    <div className="mx-auto flex min-h-[60vh] max-w-md flex-col items-center justify-center px-4 text-center">
      <span className="flex h-14 w-14 items-center justify-center rounded-full bg-destructive/15 text-destructive">
        <AlertTriangle size={28} />
      </span>
      <h1 className="mt-5 text-2xl font-bold text-foreground">
        Something went wrong
      </h1>
      <p className="mt-2 text-sm text-muted-foreground">
        We couldn&apos;t load the games right now. Please try again in a moment.
      </p>
      <button
        type="button"
        onClick={reset}
        className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
      >
        <RotateCcw size={16} />
        Try again
      </button>
    </div>
  )
}
