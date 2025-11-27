import { Car } from "lucide-react"

export function Header() {
  return (
    <header className="mb-8 text-center sm:mb-12">
      <div className="mb-3 inline-flex items-center justify-center rounded-full bg-primary/10 p-3 sm:mb-4 sm:p-4">
        <Car className="h-8 w-8 text-primary sm:h-10 sm:w-10" />
      </div>
      <h1 className="mb-2 text-2xl font-bold tracking-tight text-foreground sm:text-3xl md:text-4xl">
        Troca Certa
      </h1>
      <p className="text-xs text-muted-foreground sm:text-sm">
        Encontre as especificações de óleo e filtros do seu veículo
      </p>
    </header>
  )
}
