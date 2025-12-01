'use client'

import { ErrorBoundary } from './ErrorBoundary'
import type { ReactNode } from 'react'

interface ErrorBoundaryWrapperProps {
  children: ReactNode
}

export function ErrorBoundaryWrapper({ children }: ErrorBoundaryWrapperProps) {
  return <ErrorBoundary>{children}</ErrorBoundary>
}

export default ErrorBoundaryWrapper

