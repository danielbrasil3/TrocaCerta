import { ChevronLeft } from "lucide-react"

interface MotorSelectionProps {
  motors: string[]
  onSelectMotor: (motor: string) => void
}

export function MotorSelection({ motors, onSelectMotor }: MotorSelectionProps) {
  return (
    <div className="space-y-3 animate-in fade-in slide-in-from-bottom-2">
      <p className="text-xs font-medium text-muted-foreground sm:text-sm">Selecione o motor</p>
      <div className="grid gap-2">
        {motors.map((motor) => (
          <button
            key={motor}
            onClick={() => onSelectMotor(motor)}
            className="group flex items-center justify-between rounded-lg bg-secondary p-3 text-left text-sm transition-all hover:bg-primary hover:text-primary-foreground sm:rounded-xl sm:p-4 sm:text-base"
          >
            <span className="font-medium">{motor}</span>
            <ChevronLeft className="h-4 w-4 rotate-180 opacity-0 transition-all group-hover:opacity-100 sm:h-5 sm:w-5" />
          </button>
        ))}
      </div>
    </div>
  )
}
