import type { Metadata } from "next"
import { Heart } from "lucide-react"
import { PageHero } from "@/components/page-hero"
import { FavoritesClient } from "@/components/favorites-client"

export const metadata: Metadata = {
  title: "My Favorites",
  description: "Your saved favorite games.",
}

export default function FavoritesPage() {
  return (
    <div className="mx-auto max-w-[1600px] px-4 py-6 sm:px-6">
      <PageHero
        title="My Favorites"
        subtitle="Games you've saved to play later"
        icon={<Heart size={22} />}
      />
      <FavoritesClient />
    </div>
  )
}
