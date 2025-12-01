import { supabase } from "@/lib/supabase"
import type { MotorInfo } from "@/types/car"

// Cache simples em memória com limite de tamanho
const cache = new Map<string, { data: any; timestamp: number }>()
const CACHE_TIME = 5 * 60 * 1000 // 5 minutos
const MAX_CACHE_SIZE = 100 // Limite máximo de itens no cache

function getCached<T>(key: string): T | null {
  const cached = cache.get(key)
  if (cached && Date.now() - cached.timestamp < CACHE_TIME) {
    return cached.data
  }
  cache.delete(key)
  return null
}

function setCache<T>(key: string, data: T): T {
  // Limpar cache antigo se estiver muito grande
  if (cache.size >= MAX_CACHE_SIZE) {
    // Remove o item mais antigo
    const oldestKey = cache.keys().next().value
    if (oldestKey) {
      cache.delete(oldestKey)
    }
  }
  
  cache.set(key, { data, timestamp: Date.now() })
  return data
}

/**
 * Buscar todos os modelos de uma marca
 */
export async function getCarsByBrand(marca: string) {
  const cacheKey = `cars_${marca}`
  const cached = getCached<string[]>(cacheKey)
  if (cached) return cached

  try {
    const decodedMarca = decodeURIComponent(marca)
    
    const { data, error } = await supabase
      .from("cars")
      .select("modelo")
      .eq("marca", decodedMarca)
      .order("modelo")

    if (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error("Supabase error:", error)
      }
      throw error
    }


    // Remover duplicatas
    const models = [...new Set(data?.map((car: any) => car.modelo) || [])]
    
    return setCache(cacheKey, models as string[])
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error("Error fetching cars by brand:", error)
    }
    throw error
  }
}

/**
 * Buscar todos os anos de um modelo específico
 */
export async function getYearsByModel(marca: string, modelo: string) {
  const cacheKey = `years_${marca}_${modelo}`
  const cached = getCached<string[]>(cacheKey)
  if (cached) return cached

  try {
    const { data, error } = await supabase
      .from("cars")
      .select("ano")
      .eq("marca", decodeURIComponent(marca))
      .eq("modelo", decodeURIComponent(modelo))
      .order("ano", { ascending: false })

    if (error) throw error

    // Retorna anos únicos
    const years = [...new Set(data?.map((car) => car.ano) || [])]
    return setCache(cacheKey, years as string[])
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error("Error fetching years by model:", error)
    }
    throw error
  }
}

/**
 * Buscar motores para um modelo e ano específico
 */
export async function getMotorsByModelAndYear(
  marca: string,
  modelo: string,
  ano: string
) {
  const cacheKey = `motors_${marca}_${modelo}_${ano}`
  const cached = getCached<MotorInfo[]>(cacheKey)
  if (cached) return cached

  try {
    const { data, error } = await supabase
      .from("motors")
      .select(
        `
        id,
        motor,
        oleo,
        filtro_oleo,
        filtro_combustivel,
        filtro_ar,
        filtro_cabine,
        cars!inner(marca, modelo, ano)
      `
      )
      .eq("cars.marca", decodeURIComponent(marca))
      .eq("cars.modelo", decodeURIComponent(modelo))
      .eq("cars.ano", ano)

    if (error) throw error

    const motors =
      data?.map((item: any) => ({
        motor: item.motor,
        oleo: item.oleo,
        filtros: {
          oleo: item.filtro_oleo,
          combustivel: item.filtro_combustivel,
          ar: item.filtro_ar,
          cabine: item.filtro_cabine,
        },
      })) || []

    return setCache(cacheKey, motors)
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error("Error fetching motors:", error)
    }
    throw error
  }
}

/**
 * Buscar todas as marcas
 */
export async function getAllBrands() {
  const cacheKey = "all_brands"
  const cached = getCached<string[]>(cacheKey)
  if (cached) return cached

  try {
    const { data, error } = await supabase
      .from("cars")
      .select("marca")
      .order("marca")

    if (error) throw error

    // Retorna marcas únicas
    const brands = [...new Set(data?.map((car) => car.marca) || [])]
    return setCache(cacheKey, brands as string[])
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error("Error fetching brands:", error)
    }
    throw error
  }
}
