import Link from "next/link"
import { Gamepad2, Github, Twitter, Youtube } from "lucide-react"
import { FEATURED_CATEGORIES } from "@/lib/nav"
import { slugify } from "@/lib/helpers"

export function Footer() {
  return (
    <footer className="mt-16 border-t border-border bg-sidebar">
      <div className="mx-auto grid max-w-[1600px] grid-cols-1 gap-8 px-4 py-12 sm:grid-cols-2 sm:px-6 lg:grid-cols-4">
        <div>
          <Link href="/" className="flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Gamepad2 size={20} />
            </span>
            <span className="text-lg font-bold text-foreground">
              Play<span className="text-primary">Zone</span>
            </span>
          </Link>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted-foreground">
            Thousands of free online games to play instantly in your browser.
            No downloads. No installs. Just play.
          </p>
        </div>

        <div>
          <h3 className="mb-3 text-sm font-semibold text-foreground">
            Categories
          </h3>
          <ul className="space-y-2 text-sm">
            {FEATURED_CATEGORIES.slice(0, 6).map((cat) => (
              <li key={cat}>
                <Link
                  href={`/category/${slugify(cat)}`}
                  className="text-muted-foreground transition hover:text-primary"
                >
                  {cat}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-3 text-sm font-semibold text-foreground">Browse</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/games" className="text-muted-foreground transition hover:text-primary">All Games</Link>
            </li>
            <li>
              <Link href="/trending" className="text-muted-foreground transition hover:text-primary">Trending</Link>
            </li>
            <li>
              <Link href="/top-rated" className="text-muted-foreground transition hover:text-primary">Top Rated</Link>
            </li>
            <li>
              <Link href="/new" className="text-muted-foreground transition hover:text-primary">New Games</Link>
            </li>
            <li>
              <Link href="/favorites" className="text-muted-foreground transition hover:text-primary">Favorites</Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="mb-3 text-sm font-semibold text-foreground">Legal</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/about" className="text-muted-foreground transition hover:text-primary">About</Link>
            </li>
            <li>
              <Link href="/about#privacy" className="text-muted-foreground transition hover:text-primary">Privacy Policy</Link>
            </li>
            <li>
              <Link href="/about#terms" className="text-muted-foreground transition hover:text-primary">Terms of Service</Link>
            </li>
            <li>
              <Link href="/about#contact" className="text-muted-foreground transition hover:text-primary">Contact</Link>
            </li>
          </ul>
          <div className="mt-4 flex items-center gap-2">
            <a href="#" aria-label="Twitter" className="flex h-9 w-9 items-center justify-center rounded-full bg-secondary text-muted-foreground transition hover:bg-primary hover:text-primary-foreground">
              <Twitter size={18} />
            </a>
            <a href="#" aria-label="YouTube" className="flex h-9 w-9 items-center justify-center rounded-full bg-secondary text-muted-foreground transition hover:bg-primary hover:text-primary-foreground">
              <Youtube size={18} />
            </a>
            <a href="#" aria-label="GitHub" className="flex h-9 w-9 items-center justify-center rounded-full bg-secondary text-muted-foreground transition hover:bg-primary hover:text-primary-foreground">
              <Github size={18} />
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="mx-auto max-w-[1600px] px-4 py-5 text-center text-xs text-muted-foreground sm:px-6">
          {`© ${new Date().getFullYear()} crazyplay. Games powered by Gamezop. All trademarks belong to their respective owners.`}
        </div>
      </div>
    </footer>
  )
}
