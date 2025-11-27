interface SelectedModelHeaderProps {
  selectedModel: string
  onAlter: () => void
}

export function SelectedModelHeader({
  selectedModel,
  onAlter,
}: SelectedModelHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Modelo
        </p>
        <p className="text-sm font-semibold text-foreground sm:text-lg">{selectedModel}</p>
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
