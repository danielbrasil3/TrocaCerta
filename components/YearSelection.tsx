interface YearSelectionProps {
  years: number[]
  onSelectYear: (year: number) => void
}

export function YearSelection({ years, onSelectYear }: YearSelectionProps) {
  return (
    <div className="space-y-3 animate-in fade-in slide-in-from-bottom-2">
      <p className="text-xs font-medium text-muted-foreground sm:text-sm">Selecione o ano</p>
      <div className="grid grid-cols-4 gap-2 max-h-48 overflow-y-auto sm:grid-cols-3 sm:max-h-60">
        {years.map((year) => (
          <button
            key={year}
            onClick={() => onSelectYear(year)}
            className="rounded-lg bg-secondary p-2 text-sm font-medium transition-all hover:bg-primary hover:text-primary-foreground sm:rounded-xl sm:p-3 sm:text-base"
          >
            {year}
          </button>
        ))}
      </div>
    </div>
  )
}
