import Link from "next/link"
import { Gamepad2 } from "lucide-react"

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-md flex-col items-center justify-center px-4 text-center">
      <span className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/15 text-primary">
        <Gamepad2 size={28} />
      </span>
      <h1 className="mt-5 text-3xl font-extrabold text-foreground">404</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        We couldn&apos;t find the page or game you were looking for.
      </p>
      <Link
        href="/"
        className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
      >
        Back to Home
      </Link>
    </div>
  )
}
