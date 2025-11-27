interface SelectedMotorHeaderProps {
  selectedMotor: string
  onAlter: () => void
}

export function SelectedMotorHeader({
  selectedMotor,
  onAlter,
}: SelectedMotorHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Motor
        </p>
        <p className="text-sm font-semibold text-foreground sm:text-lg">{selectedMotor}</p>
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
