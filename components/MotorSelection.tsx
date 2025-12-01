import { memo, useCallback } from 'react'
import { ChevronLeft } from 'lucide-react'
import { LoadingSpinner } from './LoadingSpinner'

interface MotorSelectionProps {
  motors: string[]
  onSelectMotor: (motor: string) => void
  isLoading?: boolean
}

function MotorSelectionComponent({ motors, onSelectMotor, isLoading = false }: MotorSelectionProps) {
  const handleMotorClick = useCallback((motor: string) => {
    return () => onSelectMotor(motor)
  }, [onSelectMotor])

  const validMotors = (motors ?? []).filter((motor) => motor && typeof motor === 'string')

  return (
    <div className="space-y-3 animate-in fade-in slide-in-from-bottom-2">
      <p className="text-xs font-medium text-muted-foreground sm:text-sm">Selecione o motor</p>
      {isLoading ? (
        <div className="flex justify-center py-8">
          <LoadingSpinner />
        </div>
      ) : (
        <div className="grid gap-2">
          {validMotors.length > 0 ? (
            validMotors.map((motor) => (
              <button
                key={motor}
                onClick={handleMotorClick(motor)}
                className="group flex items-center justify-between rounded-lg bg-secondary p-3 text-left text-sm transition-all hover:bg-primary hover:text-primary-foreground sm:rounded-xl sm:p-4 sm:text-base"
              >
                <span className="font-medium">{motor}</span>
                <ChevronLeft className="h-4 w-4 rotate-180 opacity-0 transition-all group-hover:opacity-100 sm:h-5 sm:w-5" />
              </button>
            ))
          ) : (
            <p className="py-4 text-center text-sm text-muted-foreground">Nenhum motor encontrado</p>
          )}
        </div>
      )}
    </div>
  )
}

export const MotorSelection = memo(MotorSelectionComponent)
