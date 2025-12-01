import { NextRequest, NextResponse } from "next/server"
import { getCarsByBrand } from "@/lib/services/carService"
import { validateCarName } from "@/lib/validation"

/**
 * GET /api/cars/[marca]
 * Returns all models for a specific brand
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ marca: string }> }
) {
  try {
    const resolvedParams = await params
    const decodedMarca = decodeURIComponent(resolvedParams.marca)
    
    // Validate input
    const marca = validateCarName(decodedMarca)
    if (!marca) {
      return NextResponse.json(
        { error: "Invalid brand name" },
        { status: 400 }
      )
    }

    const models = await getCarsByBrand(marca)

    if (!models || models.length === 0) {
      return NextResponse.json(
        { error: "Brand not found" },
        { status: 404 }
      )
    }

    return NextResponse.json(models, {
      headers: {
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=7200",
      },
    })
  } catch (error) {
    // Log error but don't expose details to client
    if (process.env.NODE_ENV === 'development') {
      console.error("Error fetching models:", error)
    }
    return NextResponse.json(
      { error: "Failed to fetch brand data" },
      { status: 500 }
    )
  }
}
