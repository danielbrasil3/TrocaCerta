import { NextRequest, NextResponse } from "next/server"
import type { CarData } from "@/types/car"
import carsData from "@/public/dados.json"

/**
 * GET /api/cars/[marca]/[modelo]
 * Returns all years and motor info for a specific model
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ marca: string; modelo: string }> }
) {
  try {
    const data: CarData = carsData as CarData
    const resolvedParams = await params
    const marca = decodeURIComponent(resolvedParams.marca)
    const modelo = decodeURIComponent(resolvedParams.modelo)

    if (!data[marca]) {
      return NextResponse.json(
        { error: `Brand "${marca}" not found` },
        { status: 404 }
      )
    }

    if (!data[marca][modelo]) {
      return NextResponse.json(
        { error: `Model "${modelo}" not found for brand "${marca}"` },
        { status: 404 }
      )
    }

    const modelData = data[marca][modelo]
    return NextResponse.json(modelData, {
      headers: {
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=7200",
      },
    })
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch model data" },
      { status: 500 }
    )
  }
}
