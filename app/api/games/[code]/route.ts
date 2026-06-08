import { NextResponse } from "next/server"
import { getGameByCode } from "@/lib/gamezop"

export const revalidate = 3600

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ code: string }> },
) {
  try {
    const { code } = await params
    const game = await getGameByCode(code)

    if (!game) {
      return NextResponse.json({ error: "Game not found" }, { status: 404 })
    }

    return NextResponse.json({ game })
  } catch (error) {
    console.log("[v0] /api/games/[code] error:", error)
    return NextResponse.json(
      { error: "Failed to fetch game" },
      { status: 500 },
    )
  }
}
