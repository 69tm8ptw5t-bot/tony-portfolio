'use client'

import { createContext, useContext } from 'react'

export interface TransitionContextType {
  navigate: (href: string) => void
}

export const TransitionContext = createContext<TransitionContextType>({
  navigate: () => {},
})

export const useTransitionNav = () => useContext(TransitionContext)