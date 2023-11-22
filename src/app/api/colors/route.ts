import { db } from "@/lib/db"
import { NextResponse } from "next/server"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const numberOfColors = searchParams.get("numberOfColors")
    const colors = await db.color.findMany({
      take: Number(numberOfColors),
    })
    return NextResponse.json(colors, { status: 200 })
  } catch (error: any) {
    console.log("COLORS GET ERROR", error)
    return new NextResponse(error.message, { status: 500 })
  }
}
