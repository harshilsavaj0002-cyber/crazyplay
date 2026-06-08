interface PageHeroProps {
  title: string
  subtitle?: string
  count?: number
  icon?: React.ReactNode
}

export function PageHero({ title, subtitle, count, icon }: PageHeroProps) {
  return (
    <div className="mb-6 overflow-hidden rounded-2xl bg-card p-6 ring-1 ring-border sm:p-8">
      <div className="flex items-center gap-3">
        {icon && (
          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/15 text-primary">
            {icon}
          </span>
        )}
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>
          )}
        </div>
      </div>
      {typeof count === "number" && (
        <p className="mt-3 text-sm text-muted-foreground">
          <span className="font-semibold text-foreground">{count}</span> games
          available
        </p>
      )}
    </div>
  )
}
