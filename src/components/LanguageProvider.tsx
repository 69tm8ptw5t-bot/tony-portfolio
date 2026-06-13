'use client'

import { createContext, useContext, useEffect, useState, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { Lang } from '@/data/translations'
import { translations } from '@/data/translations'

interface LangContextType {
  lang: Lang
  setLang: (lang: Lang) => void
  t: typeof translations.en
}

const LangContext = createContext<LangContextType>({
  lang: 'en',
  setLang: () => {},
  t: translations.en,
})

export const useLang = () => useContext(LangContext)

export default function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>('en')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem('lang') as Lang | null
    if (saved && ['en', 'es', 'ru'].includes(saved)) {
      setLangState(saved)
    } else {
      // Detect browser/OS language
      const browserLang = navigator.language?.slice(0, 2) || ''
      if (browserLang === 'es') setLangState('es')
      else if (browserLang === 'ru') setLangState('ru')
      else setLangState('en')
    }
    setMounted(true)
  }, [])

  const setLang = useCallback((newLang: Lang) => {
    setLangState(newLang)
    localStorage.setItem('lang', newLang)
  }, [])

  const t = translations[lang]

  if (!mounted) return <>{children}</>

  return (
    <LangContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LangContext.Provider>
  )
}

export function LangToggle() {
  const { lang, setLang } = useLang()
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onPointerDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', onPointerDown)
    return () => document.removeEventListener('mousedown', onPointerDown)
  }, [])

  const flags: Record<Lang, { label: string; flag: string }> = {
    en: { label: 'EN', flag: '🇬🇧' },
    es: { label: 'ES', flag: '🇲🇽' },
    ru: { label: 'RU', flag: '🇷🇺' },
  }

  return (
    <div ref={ref} className="relative">
      <motion.button
        onClick={() => setOpen(!open)}
        className="relative w-9 h-9 rounded-md flex items-center justify-center cursor-pointer border-none font-sans text-xs font-medium"
        style={{ color: 'var(--text-secondary)', background: 'transparent' }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        aria-label="Change language"
      >
        {flags[lang].label}
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            className="absolute right-0 top-full mt-2 z-50 rounded-lg overflow-hidden min-w-[100px]"
            style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border)',
            }}
            initial={{ opacity: 0, y: -5, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -5, scale: 0.95 }}
            transition={{ duration: 0.15 }}
          >
            {(['en', 'es', 'ru'] as Lang[]).map((l) => (
              <motion.button
                key={l}
                onClick={() => { setLang(l); setOpen(false) }}
                className="w-full px-3 py-2 text-left flex items-center gap-2 text-xs font-sans border-none cursor-pointer"
                style={{
                  color: lang === l ? 'var(--accent)' : 'var(--text-secondary)',
                  background: lang === l ? 'var(--accent-dim)' : 'transparent',
                }}
                whileHover={{ background: 'var(--accent-dim)' }}
              >
                <span>{flags[l].flag}</span>
                <span>{flags[l].label}</span>
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}