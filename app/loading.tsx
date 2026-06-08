import { GridSkeleton } from "@/components/loading-skeleton"

export default function Loading() {
  return (
    <div className="mx-auto max-w-[1600px] px-4 py-6 sm:px-6">
      <div className="mb-10 h-[280px] w-full animate-pulse rounded-2xl bg-card sm:h-[360px] lg:h-[420px]" />
      <div className="mb-4 h-6 w-40 animate-pulse rounded bg-card" />
      <GridSkeleton count={12} />
    </div>
  )
}
