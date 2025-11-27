interface ProgressBarProps {
  currentStep: number
}

export function ProgressBar({ currentStep }: ProgressBarProps) {
  return (
    <div className="mb-6 flex items-center justify-center gap-1.5 sm:mb-8 sm:gap-2">
      {[1, 2, 3, 4].map((step) => (
        <div
          key={step}
          className={`h-1.5 w-8 rounded-full transition-all duration-300 sm:w-12 ${
            step <= currentStep ? "bg-primary" : "bg-secondary"
          }`}
        />
      ))}
    </div>
  )
}
