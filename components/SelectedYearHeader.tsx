interface SelectedYearHeaderProps {
  selectedYear: number
  onAlter: () => void
}

export function SelectedYearHeader({
  selectedYear,
  onAlter,
}: SelectedYearHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Ano
        </p>
        <p className="text-sm font-semibold text-foreground sm:text-lg">{selectedYear}</p>
      </div>
      <button
        onClick={onAlter}
        className="text-xs text-muted-foreground hover:text-primary transition-colors sm:text-sm"
      >
        Alterar
      </button>
    </div>
  )
}
