export function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center py-8">
      <div className="relative h-8 w-8">
        <div className="absolute inset-0 animate-spin rounded-full border-4 border-secondary border-t-primary"></div>
      </div>
      <span className="ml-3 text-sm text-muted-foreground">Carregando...</span>
    </div>
  )
}
