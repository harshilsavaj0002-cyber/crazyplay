import Link from "next/link"
import { ArrowRight } from "lucide-react"

interface SectionHeaderProps {
  title: string
  icon?: React.ReactNode
  viewAllHref?: string
}

export function SectionHeader({ title, icon, viewAllHref }: SectionHeaderProps) {
  return (
    <div className="mb-4 flex items-center justify-between gap-4">
      <h2 className="flex items-center gap-2 text-lg font-bold tracking-tight text-foreground sm:text-xl">
        {icon && <span className="text-primary">{icon}</span>}
        {title}
      </h2>
      {viewAllHref && (
        <Link
          href={viewAllHref}
          className="inline-flex shrink-0 items-center gap-1 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
        >
          View all
          <ArrowRight size={15} />
        </Link>
      )}
    </div>
  )
}
