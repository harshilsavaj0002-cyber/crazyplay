export function CardSkeleton() {
  return (
    <div className="overflow-hidden rounded-xl bg-card ring-1 ring-border">
      <div className="aspect-square animate-pulse bg-secondary/60" />
      <div className="space-y-2 p-2.5">
        <div className="h-3.5 w-3/4 animate-pulse rounded bg-secondary/60" />
        <div className="h-3 w-1/2 animate-pulse rounded bg-secondary/60" />
      </div>
    </div>
  )
}

export function GridSkeleton({ count = 12 }: { count?: number }) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6">
      {Array.from({ length: count }).map((_, i) => (
        <CardSkeleton key={i} />
      ))}
    </div>
  )
}
