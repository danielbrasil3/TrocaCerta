import { NextRequest, NextResponse } from "next/server"
import type { MotorInfo } from "@/types/car"
import { getMotorsByModelAndYear } from "@/lib/services/carService"
import { validateCarName, validateYear } from "@/lib/validation"

/**
 * GET /api/cars/[marca]/[modelo]/[ano]
 * Returns motor information for a specific year
 */
export async function GET(
  request: NextRequest,
  {
    params,
  }: { params: Promise<{ marca: string; modelo: string; ano: string }> }
) {
  try {
    const resolvedParams = await params
    const decodedMarca = decodeURIComponent(resolvedParams.marca)
    const decodedModelo = decodeURIComponent(resolvedParams.modelo)
    const ano = resolvedParams.ano

    // Validate inputs
    const marca = validateCarName(decodedMarca)
    const modelo = validateCarName(decodedModelo)
    const validatedYear = validateYear(ano)
    
    if (!marca || !modelo || !validatedYear) {
      return NextResponse.json(
        { error: "Invalid brand, model, or year" },
        { status: 400 }
      )
    }

    const motors = await getMotorsByModelAndYear(marca, modelo, validatedYear)

    if (!motors || motors.length === 0) {
      return NextResponse.json(
        { error: "No motors found" },
        { status: 404 }
      )
    }

    return NextResponse.json(motors, {
      headers: {
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=7200",
      },
    })
  } catch (error) {
    // Log error but don't expose details to client
    if (process.env.NODE_ENV === 'development') {
      console.error("Error fetching motors:", error)
    }
    return NextResponse.json(
      { error: "Failed to fetch year data" },
      { status: 500 }
    )
  }
}
