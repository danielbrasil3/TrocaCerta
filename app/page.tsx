'use client'

import { useCallback } from 'react'
import { useCarSelector } from '@/hooks/useCarSelector'
import { Header } from "@/components/Header"
import { ProgressBar } from "@/components/ProgressBar"
import { SearchSection } from "@/components/SearchSection"
import { BrandHeader } from "@/components/BrandHeader"
import { SelectedModelHeader } from "@/components/SelectedModelHeader"
import { ModelSelection } from "@/components/ModelSelection"
import { SelectedYearHeader } from "@/components/SelectedYearHeader"
import { YearSelection } from "@/components/YearSelection"
import { MotorSelection } from "@/components/MotorSelection"
import { ResultsSection } from "@/components/ResultsSection"
import { Footer } from "@/components/Footer"

export default function Home() {
  const {
    carName,
    searchInput,
    selectedModel,
    selectedYear,
    selectedMotor,
    searchResults,
    handleSearch,
    handleSelectCar,
    handleSelectModel,
    handleSelectYear,
    handleSelectMotor,
    handleReset,
    models,
    years,
    availableMotors,
    motorDetails,
    currentStep,
    hasModels,
    isLoading,
    error,
    setSelectedModel,
    setSelectedYear,
    setSelectedMotor,
  } = useCarSelector()

  // Extract inline handlers to prevent re-renders
  const handleAlterModel = useCallback(() => {
    setSelectedModel('')
  }, [setSelectedModel])

  const handleAlterYear = useCallback(() => {
    setSelectedYear(null)
    setSelectedMotor(null)
  }, [setSelectedYear, setSelectedMotor])

  const handleResetMotor = useCallback(() => {
    setSelectedMotor(null)
  }, [setSelectedMotor])

  return (
    <div className="min-h-screen bg-background p-3 sm:p-4 md:p-8">
      <div className="mx-auto max-w-2xl">
        <Header />

        {error && (
          <div className="mb-4 rounded-lg border border-destructive/50 bg-destructive/10 p-3 text-sm text-destructive sm:p-4">
            <p className="font-medium">Erro</p>
            <p>{error}</p>
          </div>
        )}

        {hasModels && <ProgressBar currentStep={currentStep} />}

        <div className="rounded-lg border border-border bg-card p-3 shadow-lg shadow-black/10 sm:rounded-2xl sm:p-5 md:p-6 md:shadow-2xl md:shadow-black/20">
          {!hasModels ? (
            <SearchSection
              carName={carName}
              searchInput={searchInput}
              searchResults={searchResults}
              onSearch={handleSearch}
              onSelectCar={handleSelectCar}
            />
          ) : (
            <div className="space-y-6 animate-in fade-in duration-300">
              <BrandHeader carName={carName} onReset={handleReset} />

              {!selectedModel ? (
                <ModelSelection models={models} onSelectModel={handleSelectModel} isLoading={isLoading} />
              ) : (
                <div className="space-y-6 animate-in fade-in">
                  <SelectedModelHeader
                    selectedModel={selectedModel}
                    onAlter={handleAlterModel}
                  />

                  {!selectedYear ? (
                    <YearSelection years={years} onSelectYear={handleSelectYear} isLoading={isLoading} />
                  ) : (
                    <div className="space-y-6 animate-in fade-in">
                      <SelectedYearHeader
                        selectedYear={selectedYear}
                        onAlter={handleAlterYear}
                      />

                      {availableMotors.length > 1 && !selectedMotor ? (
                        <MotorSelection
                          motors={availableMotors}
                          onSelectMotor={handleSelectMotor}
                          isLoading={isLoading}
                        />
                      ) : (
                        <ResultsSection
                          availableMotors={availableMotors}
                          selectedMotor={selectedMotor}
                          motorDetails={motorDetails ?? null}
                          onResetMotor={handleResetMotor}
                          onReset={handleReset}
                        />
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>

        <Footer />
      </div>
    </div>
  )
}