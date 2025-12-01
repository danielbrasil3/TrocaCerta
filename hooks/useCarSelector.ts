'use client'

import { useEffect, useState, useRef, useCallback } from 'react'
import type { MotorInfo } from './../types/car'

export function useCarSelector() {
  const [allBrands, setAllBrands] = useState<string[]>([])
  const [searchInput, setSearchInput] = useState('')
  const [carName, setCarName] = useState('')
  const [selectedModel, setSelectedModel] = useState('')
  const [selectedYear, setSelectedYear] = useState<string | null>(null)
  const [selectedMotor, setSelectedMotor] = useState<string | null>(null)
  const [searchResults, setSearchResults] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const [models, setModels] = useState<string[]>([])
  const [years, setYears] = useState<string[]>([])
  const [availableMotors, setAvailableMotors] = useState<string[]>([])
  const [motorDetails, setMotorDetails] = useState<MotorInfo | null>(null)

  // Cache e refs para evitar re-fetches
  const cacheRef = useRef<Map<string, any>>(new Map())

  // =========================
  //  LOAD BRANDS FROM API
  // =========================
  useEffect(() => {
    const fetchBrands = async () => {
      try {
        setIsLoading(true)
        setError(null)
        const response = await fetch('/api/cars')

        if (!response.ok) {
          throw new Error(`Erro na API: ${response.statusText}`)
        }

        const brands: string[] = await response.json()
        setAllBrands(brands)
      } catch (err) {
        const errorMessage = 'Erro ao carregar marcas. Tente novamente.'
        setError(errorMessage)
        if (process.env.NODE_ENV === 'development') {
          console.error('Erro ao carregar marcas:', err)
        }
      } finally {
        setIsLoading(false)
      }
    }

    fetchBrands()
  }, [])

  // =========================
  // AUTO-SELEÇÃO DE MOTOR
  // =========================
  useEffect(() => {
    if (selectedYear && !selectedMotor && availableMotors.length === 1) {
      setSelectedMotor(availableMotors[0])
    }
  }, [selectedYear, availableMotors, selectedMotor])

  // =========================
  // HANDLES
  // =========================
  const handleSearch = useCallback((value: string) => {
    setSearchInput(value) // Atualiza o input visualmente
    setError(null) // Clear error on new search
    
    if (!value.trim()) {
      setSearchResults([])
      return
    }

    const searchTerm = value.toUpperCase()
    const results = allBrands.filter((brand) =>
      brand.toUpperCase().includes(searchTerm)
    )

    setSearchResults(results)
  }, [allBrands])

  const resetSelections = useCallback(() => {
    setSelectedModel('')
    setSelectedYear(null)
    setSelectedMotor(null)
  }, [])

  const handleSelectCar = useCallback((brand: string) => {
    setCarName(brand)
    resetSelections()
    setSearchResults([])
    setError(null) // Clear error on new selection
  }, [resetSelections])

  const handleSelectModel = useCallback((model: string) => {
    setSelectedModel(model)
    setSelectedYear(null)
    setSelectedMotor(null)
    setAvailableMotors([])
  }, [])

  const handleSelectYear = useCallback((year: string) => {
    setSelectedYear(year)
    setSelectedMotor(null)
  }, [])

  const handleSelectMotor = useCallback((motor: string) => {
    setSelectedMotor(motor)
  }, [])

  const handleReset = useCallback(() => {
    setSearchInput('')
    setCarName('')
    resetSelections()
    setSearchResults([])
  }, [resetSelections])

  // =========================
  // FETCH MODELS (ao clicar na marca)
  // =========================
  useEffect(() => {
    if (!carName) {
      setModels([])
      setSelectedModel('')
      return
    }

    const cacheKey = `models_${carName}`
    if (cacheRef.current.has(cacheKey)) {
      setModels(cacheRef.current.get(cacheKey))
      setIsLoading(false)
      return
    }

    // Sem debounce aqui porque só é chamado ao clicar na marca
    const fetchModels = async () => {
      try {
        setIsLoading(true)
        const url = `/api/cars/${encodeURIComponent(carName)}`
        const response = await fetch(url)
        
        if (!response.ok) {
          const errorData = await response.text()
          if (process.env.NODE_ENV === 'development') {
            console.error('API Error:', response.status, errorData)
          }
          throw new Error(`HTTP ${response.status}`)
        }
        
        const data: string[] = await response.json()
        cacheRef.current.set(cacheKey, data)
        setModels(data)
      } catch (err) {
        if (process.env.NODE_ENV === 'development') {
          console.error("Erro ao carregar modelos:", err)
        }
        setModels([])
        setError('Erro ao carregar modelos. Tente novamente.')
      } finally {
        setIsLoading(false)
      }
    }

    fetchModels()
  }, [carName])

  // =========================
  // FETCH YEARS
  // =========================
  useEffect(() => {
    if (!carName || !selectedModel) {
      setYears([])
      setSelectedYear(null)
      return
    }

    const cacheKey = `years_${carName}_${selectedModel}`
    if (cacheRef.current.has(cacheKey)) {
      setYears(cacheRef.current.get(cacheKey))
      setIsLoading(false)
      return
    }

    const timer = setTimeout(async () => {
      try {
        setIsLoading(true)
        const response = await fetch(
          `/api/cars/${encodeURIComponent(carName)}/${encodeURIComponent(selectedModel)}`
        )
        if (!response.ok) {
          throw new Error('Erro ao carregar anos')
        }
        const data: string[] = await response.json()
        const sorted = data.sort((a, b) => Number(b) - Number(a))
        cacheRef.current.set(cacheKey, sorted)
        setYears(sorted)
      } catch (err) {
        if (process.env.NODE_ENV === 'development') {
          console.error("Erro ao carregar anos:", err)
        }
        setYears([])
        setError('Erro ao carregar anos. Tente novamente.')
      } finally {
        setIsLoading(false)
      }
    }, 300)

    return () => clearTimeout(timer)
  }, [carName, selectedModel])

  // =========================
  // FETCH MOTORS
  // =========================
  useEffect(() => {
    if (!carName || !selectedModel || !selectedYear) {
      setAvailableMotors([])
      setSelectedMotor(null)
      setMotorDetails(null)
      return
    }

    const cacheKey = `motors_${carName}_${selectedModel}_${selectedYear}`
    if (cacheRef.current.has(cacheKey)) {
      const motors = cacheRef.current.get(cacheKey)
      setAvailableMotors(motors.map((m: MotorInfo) => m.motor))
      setIsLoading(false)
      return
    }

    const timer = setTimeout(async () => {
      try {
        setIsLoading(true)
        const response = await fetch(
          `/api/cars/${encodeURIComponent(carName)}/${encodeURIComponent(selectedModel)}/${selectedYear}`
        )
        if (!response.ok) {
          throw new Error('Erro ao carregar motores')
        }
        const data: MotorInfo[] = await response.json()
        cacheRef.current.set(cacheKey, data)
        setAvailableMotors(data.map((m) => m.motor))
        // Se houver só um motor, usar ele automaticamente
        if (data.length === 1) {
          setSelectedMotor(data[0].motor)
          setMotorDetails(data[0])
        }
      } catch (err) {
        if (process.env.NODE_ENV === 'development') {
          console.error("Erro ao carregar motores:", err)
        }
        setAvailableMotors([])
        setError('Erro ao carregar motores. Tente novamente.')
      } finally {
        setIsLoading(false)
      }
    }, 300)

    return () => clearTimeout(timer)
  }, [carName, selectedModel, selectedYear])

  // =========================
  // SET MOTOR DETAILS
  // =========================
  useEffect(() => {
    if (!selectedMotor || !carName || !selectedModel || !selectedYear) {
      setMotorDetails(null)
      return
    }

    const cacheKey = `motors_${carName}_${selectedModel}_${selectedYear}`
    const motors = cacheRef.current.get(cacheKey)

    if (motors) {
      const details = motors.find((m: MotorInfo) => m.motor === selectedMotor)
      setMotorDetails(details || null)
    }
  }, [selectedMotor, carName, selectedModel, selectedYear])

  const hasModels = models.length > 0

  // =========================
  // STEP SYSTEM
  // =========================
  const getCurrentStep = () => {
    if (!hasModels) return 0
    if (!selectedModel) return 1
    if (!selectedYear) return 2
    if (availableMotors.length > 1 && !selectedMotor) return 3
    return 4
  }

  const currentStep = getCurrentStep()

  return {
    // state
    carName, // Retorna carName (marca selecionada), não searchInput
    selectedModel,
    selectedYear,
    selectedMotor,
    searchResults,
    models,
    years,
    availableMotors,
    motorDetails,
    currentStep,
    hasModels,
    isLoading,
    error,
    searchInput, // Expor searchInput também para o componente usar

    // handlers
    handleSearch,
    handleSelectCar,
    handleSelectModel,
    handleSelectYear,
    handleSelectMotor,
    handleReset,

    // setters
    setSelectedModel,
    setSelectedYear,
    setSelectedMotor,
  }
}
