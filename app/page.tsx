"use client"

import { useCarSelector } from "@/hooks/useCarSelector"
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
    setSelectedModel,
    setSelectedYear,
    setSelectedMotor,
  } = useCarSelector();


  return (
    <div className="min-h-screen bg-background p-3 sm:p-4 md:p-8">
      <div className="mx-auto max-w-2xl">
        <Header />

        {hasModels && <ProgressBar currentStep={currentStep} />}

        <div className="rounded-lg border border-border bg-card p-3 shadow-lg shadow-black/10 sm:rounded-2xl sm:p-5 md:p-6 md:shadow-2xl md:shadow-black/20">
          {!hasModels ? (
            <SearchSection
              carName={carName}
              searchResults={searchResults}
              onSearch={handleSearch}
              onSelectCar={handleSelectCar}
            />
          ) : (
            <div className="space-y-6 animate-in fade-in duration-300">
              <BrandHeader carName={carName} onReset={handleReset} />

              {!selectedModel ? (
                <ModelSelection models={models} onSelectModel={handleSelectModel} />
              ) : (
                <div className="space-y-6 animate-in fade-in">
                  <SelectedModelHeader
                    selectedModel={selectedModel}
                    onAlter={() => setSelectedModel("")}
                  />

                  {!selectedYear ? (
                    <YearSelection years={years} onSelectYear={handleSelectYear} />
                  ) : (
                    <div className="space-y-6 animate-in fade-in">
                      <SelectedYearHeader
                        selectedYear={selectedYear}
                        onAlter={() => {
                          setSelectedYear(null)
                          setSelectedMotor(null)
                        }}
                      />

                      {availableMotors.length > 1 && !selectedMotor ? (
                        <MotorSelection
                          motors={availableMotors}
                          onSelectMotor={handleSelectMotor}
                        />
                      ) : (
                        <ResultsSection
                          availableMotors={availableMotors}
                          selectedMotor={selectedMotor}
                          motorDetails={motorDetails ?? null}
                          onResetMotor={() => setSelectedMotor(null)}
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