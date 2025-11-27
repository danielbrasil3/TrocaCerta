import { Search, ChevronLeft } from "lucide-react"
import { Input } from "@/components/ui/input"

interface SearchSectionProps {
  carName: string
  searchResults: string[]
  onSearch: (value: string) => void
  onSelectCar: (car: string) => void
}

export function SearchSection({
  carName,
  searchResults,
  onSearch,
  onSelectCar,
}: SearchSectionProps) {
  return (
    <div className="space-y-4 sm:space-y-5">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Digite a marca do veículo..."
          value={carName}
          onChange={(e) => onSearch(e.target.value)}
          className="h-12 rounded-lg border-border bg-secondary pl-11 text-base text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-primary sm:h-14 sm:rounded-xl sm:pl-12 sm:text-lg"
        />
      </div>

      {searchResults.length > 0 && (
        <div className="space-y-2 animate-in fade-in slide-in-from-top-2 duration-300">
          <p className="text-xs font-medium text-muted-foreground sm:text-sm">Marcas encontradas</p>
          <div className="grid gap-2">
            {searchResults.map((car) => (
              <button
                key={car}
                onClick={() => onSelectCar(car)}
                className="group flex items-center justify-between rounded-lg bg-secondary p-3 text-left text-sm transition-all hover:bg-primary hover:text-primary-foreground sm:rounded-xl sm:p-4 sm:text-base"
              >
                <span className="font-medium">{car}</span>
                <ChevronLeft className="h-4 w-4 rotate-180 opacity-0 transition-all group-hover:opacity-100 sm:h-5 sm:w-5" />
              </button>
            ))}
          </div>
        </div>
      )}

      {carName && searchResults.length === 0 && (
        <p className="text-center text-xs text-muted-foreground animate-in fade-in sm:text-sm">
          Nenhuma marca encontrada para "{carName}"
        </p>
      )}
    </div>
  )
}
