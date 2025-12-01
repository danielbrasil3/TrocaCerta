import { memo, useCallback } from 'react'
import { LoadingSpinner } from './LoadingSpinner'

interface YearSelectionProps {
  years: string[]
  onSelectYear: (year: string) => void
  isLoading?: boolean
}

function YearSelectionComponent({ years, onSelectYear, isLoading = false }: YearSelectionProps) {
  const handleYearClick = useCallback((year: string) => {
    return () => onSelectYear(year)
  }, [onSelectYear])

  const validYears = (years ?? []).filter((year) => year && typeof year === 'string')

  return (
    <div className="space-y-3 animate-in fade-in slide-in-from-bottom-2">
      <p className="text-xs font-medium text-muted-foreground sm:text-sm">Selecione o ano</p>
      {isLoading ? (
        <div className="flex justify-center py-8">
          <LoadingSpinner />
        </div>
      ) : (
        <div className="grid grid-cols-4 gap-2 max-h-48 overflow-y-auto sm:grid-cols-3 sm:max-h-60">
          {validYears.length > 0 ? (
            validYears.map((year) => (
              <button
                key={year}
                onClick={handleYearClick(year)}
                className="rounded-lg bg-secondary p-2 text-sm font-medium transition-all hover:bg-primary hover:text-primary-foreground sm:rounded-xl sm:p-3 sm:text-base"
              >
                {year}
              </button>
            ))
          ) : (
            <p className="col-span-4 py-4 text-center text-sm text-muted-foreground">Nenhum ano encontrado</p>
          )}
        </div>
      )}
    </div>
  )
}

export const YearSelection = memo(YearSelectionComponent)
