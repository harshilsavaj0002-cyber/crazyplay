import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { LayoutGrid } from "lucide-react"
import { fetchAllGames, getCategories, sortByPlays } from "@/lib/gamezop"
import { deslugify, slugify } from "@/lib/helpers"
import { PageHero } from "@/components/page-hero"
import { InfiniteGrid } from "@/components/infinite-grid"

export const revalidate = 3600

export async function generateStaticParams() {
  const categories = await getCategories()
  return categories.map((c) => ({ name: slugify(c) }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ name: string }>
}): Promise<Metadata> {
  const { name } = await params
  const categories = await getCategories()
  const category = deslugify(name, categories)
  if (!category) return { title: "Category not found" }
  return {
    title: `${category} Games`,
    description: `Play free ${category} games online on crazyplay.`,
  }
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ name: string }>
}) {
  const { name } = await params
  const all = await fetchAllGames()
  const categories = await getCategories()
  const category = deslugify(name, categories)
  if (!category) notFound()

  const games = sortByPlays(
    all.filter((g) =>
      g.categories.en.some((c) => c.toLowerCase() === category.toLowerCase()),
    ),
  )

  return (
    <div className="mx-auto max-w-[1600px] px-4 py-6 sm:px-6">
      <PageHero
        title={`${category} Games`}
        subtitle={`The best ${category.toLowerCase()} games to play for free`}
        count={games.length}
        icon={<LayoutGrid size={22} />}
      />
      <InfiniteGrid games={games} />
    </div>
  )
}
