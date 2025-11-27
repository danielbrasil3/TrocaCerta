import { ChevronLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

interface BrandHeaderProps {
  carName: string
  onReset: () => void
}

export function BrandHeader({ carName, onReset }: BrandHeaderProps) {
  return (
    <div className="flex items-center justify-between border-b border-border pb-3 sm:pb-4">
      <div>
        <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Marca
        </p>
        <p className="text-lg font-bold text-primary sm:text-2xl">{carName}</p>
      </div>
      <Button
        variant="ghost"
        size="sm"
        onClick={onReset}
        className="text-xs text-muted-foreground hover:text-foreground sm:text-sm"
      >
        <ChevronLeft className="mr-1 h-4 w-4" />
        Voltar
      </Button>
    </div>
  )
}
