import { ChevronLeft, Search } from "lucide-react"
import { useState } from "react"

interface ModelSelectionProps {
  models: string[]
  onSelectModel: (model: string) => void
}

export function ModelSelection({ models, onSelectModel }: ModelSelectionProps) {
  const [searchModel, setSearchModel] = useState("")

  // Ordena alfabeticamente e filtra
  const filteredModels = models
    .sort((a, b) => a.localeCompare(b, "pt-BR"))
    .filter((model) => model.toUpperCase().includes(searchModel.toUpperCase()))

  return (
    <div className="space-y-3 animate-in fade-in slide-in-from-bottom-2">
      <p className="text-xs font-medium text-muted-foreground sm:text-sm">Selecione o modelo</p>
      
      {/* Campo de busca */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground sm:h-5 sm:w-5" />
        <input
          type="text"
          placeholder="Pesquisar modelo..."
          value={searchModel}
          onChange={(e) => setSearchModel(e.target.value)}
          className="w-full rounded-lg border border-border bg-secondary px-3 py-2 pl-10 text-sm outline-none placeholder:text-muted-foreground transition-colors hover:border-primary focus:border-primary sm:rounded-xl sm:py-3 sm:text-base"
        />
      </div>

      {/* Lista de modelos */}
      <div className="grid gap-2">
        {filteredModels.length > 0 ? (
          filteredModels.map((model) => (
            <button
              key={model}
              onClick={() => onSelectModel(model)}
              className="group flex items-center justify-between rounded-lg bg-secondary p-3 text-left text-sm transition-all hover:bg-primary hover:text-primary-foreground sm:rounded-xl sm:p-4 sm:text-base"
            >
              <span className="font-medium">{model}</span>
              <ChevronLeft className="h-4 w-4 rotate-180 opacity-0 transition-all group-hover:opacity-100 sm:h-5 sm:w-5" />
            </button>
          ))
        ) : (
          <p className="py-4 text-center text-sm text-muted-foreground">Nenhum modelo encontrado</p>
        )}
      </div>
    </div>
  )
}
