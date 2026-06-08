import { NextResponse } from "next/server"
import { fetchAllGames } from "@/lib/gamezop"

export const revalidate = 3600

export async function GET() {
  try {
    const games = await fetchAllGames()
    return NextResponse.json({ games })
  } catch (error) {
    console.log("[v0] /api/games error:", error)
    return NextResponse.json(
      { error: "Failed to fetch games" },
      { status: 500 },
    )
  }
}
