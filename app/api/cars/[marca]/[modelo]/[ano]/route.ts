import { NextResponse } from "next/server"
import type { CarData, MotorInfo } from "@/types/car"
import carsData from "@/public/dados.json"

/**
 * GET /api/cars/[marca]/[modelo]/[ano]
 * Returns motor information for a specific year
 */
export async function GET(
  request: Request,
  {
    params,
  }: { params: { marca: string; modelo: string; ano: string } }
) {
  try {
    const data: CarData = carsData as CarData
    const marca = decodeURIComponent(params.marca)
    const modelo = decodeURIComponent(params.modelo)
    const ano = params.ano

    if (!data[marca]) {
      return NextResponse.json(
        { error: `Brand "${marca}" not found` },
        { status: 404 }
      )
    }

    if (!data[marca][modelo]) {
      return NextResponse.json(
        { error: `Model "${modelo}" not found` },
        { status: 404 }
      )
    }

    const modelData = data[marca][modelo]
    if (!modelData[ano]) {
      return NextResponse.json(
        { error: `Year "${ano}" not found` },
        { status: 404 }
      )
    }

    const motors: MotorInfo[] = modelData[ano]
    return NextResponse.json(motors, {
      headers: {
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=7200",
      },
    })
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch year data" },
      { status: 500 }
    )
  }
}
