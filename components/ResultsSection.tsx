import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SpecificationsGrid } from "./SpecificationsGrid"
import { SelectedMotorHeader } from "./SelectedMotorHeader"
import type { MotorInfo } from "@/types/car"

interface ResultsSectionProps {
  availableMotors: string[]
  selectedMotor: string | null
  motorDetails: MotorInfo | null
  onResetMotor: () => void
  onReset: () => void
}

export function ResultsSection({
  availableMotors,
  selectedMotor,
  motorDetails,
  onResetMotor,
  onReset,
}: ResultsSectionProps) {
  return (
    <div className="space-y-3 animate-in fade-in slide-in-from-bottom-2 sm:space-y-4">
      {availableMotors.length > 1 && selectedMotor && (
        <SelectedMotorHeader
          selectedMotor={selectedMotor}
          onAlter={onResetMotor}
        />
      )}

      <SpecificationsGrid
        motorDetails={motorDetails}
        availableMotors={availableMotors}
      />

      <Button
        onClick={onReset}
        className="w-full h-11 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-all sm:h-12 sm:rounded-xl"
      >
        <Check className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
        Nova Consulta
      </Button>
    </div>
  )
}
