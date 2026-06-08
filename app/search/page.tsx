import type { Metadata } from "next"
import { Suspense } from "react"
import { Search } from "lucide-react"
import { PageHero } from "@/components/page-hero"
import { SearchClient } from "@/components/search-client"
import { GridSkeleton } from "@/components/loading-skeleton"

export const metadata: Metadata = {
  title: "Search Games",
  description: "Search for free online games by name, category, or tag.",
}

export default function SearchPage() {
  return (
    <div className="mx-auto max-w-[1600px] px-4 py-6 sm:px-6">
      <PageHero
        title="Search Games"
        subtitle="Find your next favorite game"
        icon={<Search size={22} />}
      />
      <Suspense fallback={<GridSkeleton count={12} />}>
        <SearchClient />
      </Suspense>
    </div>
  )
}
