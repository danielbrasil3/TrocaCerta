"use client"

import { useEffect, useState } from "react"
import type { CarData } from "@/types/car"

export function useCarData() {
  const [data, setData] = useState<CarData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true)
        const response = await fetch("/api/cars")

        if (!response.ok) {
          throw new Error(`Failed to fetch cars data: ${response.statusText}`)
        }

        const carsData = await response.json()
        setData(carsData)
        setError(null)
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Unknown error occurred"
        setError(errorMessage)
        setData(null)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  return { data, loading, error }
}
