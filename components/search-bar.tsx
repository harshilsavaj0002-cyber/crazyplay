"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"
import { Search } from "lucide-react"
import { cn } from "@/lib/utils"

interface SearchBarProps {
  className?: string
  autoFocus?: boolean
  initialValue?: string
}

export function SearchBar({
  className,
  autoFocus = false,
  initialValue = "",
}: SearchBarProps) {
  const router = useRouter()
  const [value, setValue] = useState(initialValue)

  return (
    <form
      role="search"
      onSubmit={(e) => {
        e.preventDefault()
        const q = value.trim()
        if (q) router.push(`/search?q=${encodeURIComponent(q)}`)
      }}
      className={cn("relative w-full", className)}
    >
      <Search
        size={18}
        className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
      />
      <input
        type="search"
        // eslint-disable-next-line jsx-a11y/no-autofocus
        autoFocus={autoFocus}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Search games..."
        aria-label="Search games"
        className="w-full rounded-full bg-input py-2 pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground outline-none ring-1 ring-border transition focus:ring-2 focus:ring-primary"
      />
    </form>
  )
}
