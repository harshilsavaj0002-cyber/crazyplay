import type { Metadata } from "next"
import { Clock } from "lucide-react"
import { PageHero } from "@/components/page-hero"
import { RecentClient } from "@/components/recent-client"

export const metadata: Metadata = {
  title: "Recently Played",
  description: "Games you've played recently.",
}

export default function RecentPage() {
  return (
    <div className="mx-auto max-w-[1600px] px-4 py-6 sm:px-6">
      <PageHero
        title="Recently Played"
        subtitle="Pick up where you left off"
        icon={<Clock size={22} />}
      />
      <RecentClient />
    </div>
  )
}
