import { memo, useCallback, useState } from 'react'
import { ChevronLeft, Search } from 'lucide-react'
import { LoadingSpinner } from './LoadingSpinner'

interface ModelSelectionProps {
  models: string[]
  onSelectModel: (model: string) => void
  isLoading?: boolean
}

function ModelSelectionComponent({ models, onSelectModel, isLoading = false }: ModelSelectionProps) {
  const [searchModel, setSearchModel] = useState('')

  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchModel(e.target.value)
  }, [])

  const handleModelClick = useCallback((model: string) => {
    return () => onSelectModel(model)
  }, [onSelectModel])

  // Filtra modelos válidos, ordena alfabeticamente e filtra por busca
  const filteredModels = (models ?? [])
    .filter((model) => model && typeof model === 'string')
    .sort((a, b) => a.localeCompare(b, 'pt-BR'))
    .filter((model) => model.toUpperCase().includes(searchModel.toUpperCase()))

  return (
    <div className="space-y-3 animate-in fade-in slide-in-from-bottom-2">
      <p className="text-xs font-medium text-muted-foreground sm:text-sm">Selecione o modelo</p>
      
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground sm:h-5 sm:w-5" />
        <input
          type="text"
          placeholder="Pesquisar modelo..."
          value={searchModel}
          onChange={handleSearchChange}
          disabled={isLoading}
          className="w-full rounded-lg border border-border bg-secondary px-3 py-2 pl-10 text-sm outline-none placeholder:text-muted-foreground transition-colors hover:border-primary focus:border-primary disabled:opacity-50 sm:rounded-xl sm:py-3 sm:text-base"
        />
      </div>

      {isLoading ? (
        <div className="flex justify-center py-8">
          <LoadingSpinner />
        </div>
      ) : (
        <div className="grid gap-2">
          {filteredModels.length > 0 ? (
            filteredModels.map((model) => (
              <button
                key={model}
                onClick={handleModelClick(model)}
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
      )}
    </div>
  )
}

export const ModelSelection = memo(ModelSelectionComponent)
