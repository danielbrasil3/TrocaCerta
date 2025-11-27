import { NextResponse } from "next/server"
import type { CarData } from "@/types/car"
import carsData from "@/public/dados.json"

/**
 * GET /api/cars
 * Returns all car brands and their data
 */
export async function GET() {
  try {
    const data: CarData = carsData as CarData
    return NextResponse.json(data, {
      headers: {
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=7200",
      },
    })
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch cars data" },
      { status: 500 }
    )
  }
}
