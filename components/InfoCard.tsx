import type React from "react"

interface InfoCardProps {
  icon: React.ReactNode
  label: string
  value: string
  isLast?: boolean
}

export function InfoCard({
  icon,
  label,
  value,
  isLast = false,
}: InfoCardProps) {
  return (
    <div className="flex items-center gap-3 rounded-lg bg-card py-3 px-2 transition-all hover:bg-secondary sm:gap-4 sm:p-4">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary sm:h-10 sm:w-10">
        {icon}
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          {label}
        </p>
        <p className="truncate text-sm font-semibold text-foreground sm:text-base">{value}</p>
      </div>
    </div>
  )
}
