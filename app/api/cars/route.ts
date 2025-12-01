import { NextRequest, NextResponse } from "next/server"
import { getAllBrands } from "@/lib/services/carService"

/**
 * GET /api/cars
 * Returns all available car brands
 */
export async function GET(request: NextRequest) {
  try {
    const brands = await getAllBrands()
    return NextResponse.json(brands, {
      headers: {
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=7200",
      },
    })
  } catch (error) {
    // Log error but don't expose details to client
    if (process.env.NODE_ENV === 'development') {
      console.error("Error fetching brands:", error)
    }
    return NextResponse.json(
      { error: "Failed to fetch brands" },
      { status: 500 }
    )
  }
}
