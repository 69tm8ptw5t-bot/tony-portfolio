'use client'

import { useEffect, ReactNode } from 'react'

export const useTheme = () => ({ theme: 'dark' as const })

export default function ThemeProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    document.documentElement.removeAttribute('data-theme')
  }, [])

  return <>{children}</>
}