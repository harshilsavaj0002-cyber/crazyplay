"use client"

import Image from "next/image"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, X } from "lucide-react"

interface ScreenshotCarouselProps {
  screens: string[]
  name: string
}

export function ScreenshotCarousel({ screens, name }: ScreenshotCarouselProps) {
  const [lightbox, setLightbox] = useState<number | null>(null)

  if (!screens || screens.length === 0) return null

  const close = () => setLightbox(null)
  const prev = () =>
    setLightbox((i) => (i === null ? null : (i - 1 + screens.length) % screens.length))
  const next = () =>
    setLightbox((i) => (i === null ? null : (i + 1) % screens.length))

  return (
    <>
      <div className="no-scrollbar flex gap-3 overflow-x-auto pb-1">
        {screens.map((src, i) => (
          <button
            key={src}
            type="button"
            onClick={() => setLightbox(i)}
            className="relative aspect-video w-56 shrink-0 overflow-hidden rounded-xl ring-1 ring-border transition hover:ring-primary sm:w-64"
          >
            <Image
              src={src || "/placeholder.svg"}
              alt={`${name} screenshot ${i + 1}`}
              fill
              sizes="256px"
              className="object-cover"
            />
          </button>
        ))}
      </div>

      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
            className="fixed inset-0 z-50 flex items-center justify-center bg-background/90 p-4 backdrop-blur"
          >
            <button
              type="button"
              aria-label="Close"
              onClick={close}
              className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-secondary text-foreground"
            >
              <X size={22} />
            </button>
            <button
              type="button"
              aria-label="Previous"
              onClick={(e) => {
                e.stopPropagation()
                prev()
              }}
              className="absolute left-4 flex h-11 w-11 items-center justify-center rounded-full bg-secondary text-foreground"
            >
              <ChevronLeft size={24} />
            </button>
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative aspect-video w-full max-w-4xl overflow-hidden rounded-xl"
            >
              <Image
                src={screens[lightbox] || "/placeholder.svg"}
                alt={`${name} screenshot ${lightbox + 1}`}
                fill
                sizes="100vw"
                className="object-contain"
              />
            </div>
            <button
              type="button"
              aria-label="Next"
              onClick={(e) => {
                e.stopPropagation()
                next()
              }}
              className="absolute right-4 flex h-11 w-11 items-center justify-center rounded-full bg-secondary text-foreground"
            >
              <ChevronRight size={24} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
