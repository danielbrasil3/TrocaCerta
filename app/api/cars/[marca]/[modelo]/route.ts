import { NextRequest, NextResponse } from "next/server"
import { getYearsByModel } from "@/lib/services/carService"
import { validateCarName } from "@/lib/validation"

/**
 * GET /api/cars/[marca]/[modelo]
 * Returns all years available for a specific model
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ marca: string; modelo: string }> }
) {
  try {
    const resolvedParams = await params
    const decodedMarca = decodeURIComponent(resolvedParams.marca)
    const decodedModelo = decodeURIComponent(resolvedParams.modelo)

    // Validate inputs
    const marca = validateCarName(decodedMarca)
    const modelo = validateCarName(decodedModelo)
    
    if (!marca || !modelo) {
      return NextResponse.json(
        { error: "Invalid brand or model name" },
        { status: 400 }
      )
    }

    const years = await getYearsByModel(marca, modelo)

    if (!years || years.length === 0) {
      return NextResponse.json(
        { error: "Model not found" },
        { status: 404 }
      )
    }

    return NextResponse.json(years, {
      headers: {
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=7200",
      },
    })
  } catch (error) {
    // Log error but don't expose details to client
    if (process.env.NODE_ENV === 'development') {
      console.error("Error fetching years:", error)
    }
    return NextResponse.json(
      { error: "Failed to fetch model data" },
      { status: 500 }
    )
  }
}
