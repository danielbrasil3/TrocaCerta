/**
 * Input validation utilities for security
 */

/**
 * Validates and sanitizes brand/model names
 * - Removes dangerous characters
 * - Limits length
 * - Returns null if invalid
 */
export function validateCarName(input: string): string | null {
  if (!input || typeof input !== 'string') return null
  
  // Remove leading/trailing whitespace
  const trimmed = input.trim()
  
  // Check length (reasonable limit for car names)
  if (trimmed.length === 0 || trimmed.length > 100) return null
  
  // Only allow alphanumeric, spaces, hyphens, and common car name characters
  // This prevents SQL injection and XSS attempts
  if (!/^[a-zA-Z0-9\s\-áàâãéêíóôõúçÁÀÂÃÉÊÍÓÔÕÚÇ]+$/.test(trimmed)) {
    return null
  }
  
  return trimmed
}

/**
 * Validates year format (4 digits, reasonable range)
 */
export function validateYear(year: string): string | null {
  if (!year || typeof year !== 'string') return null
  
  const trimmed = year.trim()
  
  // Must be exactly 4 digits
  if (!/^\d{4}$/.test(trimmed)) return null
  
  const yearNum = parseInt(trimmed, 10)
  
  // Reasonable range for car years (1900-2100)
  if (yearNum < 1900 || yearNum > 2100) return null
  
  return trimmed
}

/**
 * Sanitizes string for safe display (prevents XSS)
 */
export function sanitizeForDisplay(input: string): string {
  if (!input || typeof input !== 'string') return ''
  
  // Escape HTML entities
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
}

