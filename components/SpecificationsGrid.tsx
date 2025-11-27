import { Droplets, Filter, Fuel, Wind, Fan } from "lucide-react"
import { InfoCard } from "./InfoCard"
import type { MotorInfo } from "@/types/car"

interface SpecificationsGridProps {
  motorDetails: MotorInfo | null
  availableMotors: string[]
}

export function SpecificationsGrid({
  motorDetails,
  availableMotors,
}: SpecificationsGridProps) {
  return (
    <div className="rounded-lg border border-primary/20 bg-primary/5 p-1 sm:rounded-xl">
      <div className="grid gap-1">
        <InfoCard
          icon={<Droplets className="h-4 w-4 sm:h-5 sm:w-5" />}
          label="Motor"
          value={motorDetails?.motor || availableMotors[0] || "—"}
        />
        <InfoCard
          icon={<Droplets className="h-4 w-4 sm:h-5 sm:w-5" />}
          label="Óleo Recomendado"
          value={motorDetails?.oleo || "—"}
        />
        <InfoCard
          icon={<Filter className="h-4 w-4 sm:h-5 sm:w-5" />}
          label="Filtro de Óleo"
          value={motorDetails?.filtros?.oleo || "—"}
        />
        <InfoCard
          icon={<Fuel className="h-4 w-4 sm:h-5 sm:w-5" />}
          label="Filtro de Combustível"
          value={motorDetails?.filtros?.combustivel || "—"}
        />
        <InfoCard
          icon={<Wind className="h-4 w-4 sm:h-5 sm:w-5" />}
          label="Filtro de Ar"
          value={motorDetails?.filtros?.ar || "—"}
        />
        <InfoCard
          icon={<Fan className="h-4 w-4 sm:h-5 sm:w-5" />}
          label="Filtro de Cabine"
          value={motorDetails?.filtros?.cabine || "—"}
          isLast
        />
      </div>
    </div>
  )
}
