import { NextResponse } from "next/server"
import type { CarData } from "@/types/car"
import carsData from "@/public/dados.json"

/**
 * GET /api/cars/[marca]
 * Returns all models for a specific brand
 */
export async function GET(
  request: Request,
  { params }: { params: { marca: string } }
) {
  try {
    const data: CarData = carsData as CarData
    const marca = decodeURIComponent(params.marca)

    if (!data[marca]) {
      return NextResponse.json(
        { error: `Brand "${marca}" not found` },
        { status: 404 }
      )
    }

    const models = data[marca]
    return NextResponse.json(models, {
      headers: {
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=7200",
      },
    })
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch brand data" },
      { status: 500 }
    )
  }
}
