"use client"

import Link from "next/link"
import { useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"
import { NAV_LINKS, FEATURED_CATEGORIES } from "@/lib/nav"
import { slugify } from "@/lib/helpers"
import { SearchBar } from "@/components/search-bar"

interface MobileMenuProps {
  open: boolean
  onClose: () => void
}

export function MobileMenu({ open, onClose }: MobileMenuProps) {
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [open])

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm lg:hidden"
          />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.25 }}
            className="fixed inset-y-0 right-0 z-50 flex w-72 max-w-[85vw] flex-col overflow-y-auto bg-sidebar p-5 lg:hidden"
          >
            <div className="mb-5 flex items-center justify-between">
              <span className="text-lg font-bold text-sidebar-foreground">
                Menu
              </span>
              <button
                type="button"
                aria-label="Close menu"
                onClick={onClose}
                className="rounded-full p-1.5 text-sidebar-foreground hover:bg-sidebar-accent"
              >
                <X size={22} />
              </button>
            </div>

            <SearchBar className="mb-6" />

            <nav className="flex flex-col gap-1">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={onClose}
                  className="rounded-lg px-3 py-2.5 text-sm font-medium text-sidebar-foreground transition hover:bg-sidebar-accent"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="mt-6">
              <p className="mb-2 px-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Categories
              </p>
              <nav className="flex flex-col gap-1">
                {FEATURED_CATEGORIES.map((cat) => (
                  <Link
                    key={cat}
                    href={`/category/${slugify(cat)}`}
                    onClick={onClose}
                    className="rounded-lg px-3 py-2 text-sm text-sidebar-foreground/90 transition hover:bg-sidebar-accent"
                  >
                    {cat}
                  </Link>
                ))}
              </nav>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}
