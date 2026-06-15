'use client'

import { useEffect, useState, useRef } from 'react'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { AnimatePresence, motion } from 'framer-motion'
import { useLang } from './LanguageProvider'
import { LangToggle } from './LanguageProvider'
import CVDropdown from './CVDropdown'
import TransitionLink from './TransitionLink'
import type { Lang } from '@/data/translations'

export default function Navbar() {
  const [mounted, setMounted] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [langOpen, setLangOpen] = useState(false)
  const [cvOpen, setCvOpen] = useState(false)
  const pathname = usePathname()
  const { t, lang, setLang } = useLang()

  useEffect(() => {
    setMounted(true)
    setMobileMenuOpen(false)
    setLangOpen(false)
    setCvOpen(false)
  }, [pathname])

  const links = [
    { href: '/about', label: t.nav.home },
    { href: '/work', label: t.nav.work },
    { href: '/playground', label: t.nav.playground },
    { href: '/ia-video', label: t.nav.iavideo },
  ]

  return (
    <>
      <nav
        className="fixed top-3 md:top-4 z-50 h-12 md:h-14 flex items-center justify-between px-3 md:px-5"
        style={{
          width: 'min(92vw, 1200px)',
          left: '50%',
          transform: mounted ? 'translateX(-50%)' : 'translateX(-50%) translateY(-20px)',
          opacity: mounted ? 1 : 0,
          transition: 'opacity 0.5s ease, transform 0.5s ease',
          background: 'var(--navbar-bg)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid var(--border)',
          borderRadius: '999px',
        }}
      >
        <div className="hover:scale-105 active:scale-95 transition-transform duration-200">
          <TransitionLink href="/" className="block no-underline">
            <Image src="/tonylogo.svg" alt="Tony" width={80} height={24}
              className="h-5 md:h-6 w-auto" style={{ filter: 'var(--logo-filter)' }} priority />
          </TransitionLink>
        </div>

        <div className="hidden md:flex items-center gap-5 lg:gap-6">
          {links.map(({ href, label }) => {
            const isActive = pathname === href
            return (
              <TransitionLink key={href} href={href}
                className="text-[10px] lg:text-[11px] uppercase tracking-[0.12em] no-underline transition-all duration-200 relative inline-block hover:scale-105 active:scale-95 font-medium"
                style={{ color: isActive ? 'var(--accent)' : 'var(--text-secondary)' }}>
                {label}
                {isActive && (
                  <span className="absolute -bottom-1 left-0 right-0 h-[2px] rounded-full" style={{ background: 'var(--accent)', boxShadow: '0 0 6px var(--accent)' }} />
                )}
              </TransitionLink>
            )
          })}
        </div>

        <div className="hidden md:flex items-center gap-1.5 lg:gap-2">
          <LangToggle />
          <CVDropdown />
        </div>

        <div className="flex md:hidden items-center gap-1">
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="w-7 h-7 flex flex-col items-center justify-center gap-0.5 border-none cursor-pointer bg-transparent" aria-label="Menu">
            <motion.span className="w-4 h-px block" style={{ background: 'var(--text)' }}
              animate={mobileMenuOpen ? { rotate: 45, y: 2.5 } : { rotate: 0, y: 0 }} />
            <motion.span className="w-4 h-px block" style={{ background: 'var(--text)' }}
              animate={mobileMenuOpen ? { opacity: 0 } : { opacity: 1 }} />
            <motion.span className="w-4 h-px block" style={{ background: 'var(--text)' }}
              animate={mobileMenuOpen ? { rotate: -45, y: -2.5 } : { rotate: 0, y: 0 }} />
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-40 md:hidden"
            style={{ background: 'var(--bg)', borderBottom: '1px solid var(--border)', top: '56px' }}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex flex-col h-[calc(100dvh-56px)] overflow-y-auto px-6 py-8">
              <nav className="flex flex-col gap-2 mb-8">
                {links.map(({ href, label }) => {
                  const isActive = pathname === href
                  return (
                    <TransitionLink key={href} href={href}
                      className="font-heading text-lg no-underline rounded-lg px-4 py-3 transition-colors duration-200 flex items-center justify-between"
                      style={{
                        color: isActive ? 'var(--accent)' : 'var(--text)',
                        background: isActive ? 'var(--accent-dim)' : 'transparent',
                      }}>
                      {label}
                      {isActive && <span className="w-1.5 h-1.5 rounded-full" style={{ background: 'var(--accent)' }} />}
                    </TransitionLink>
                  )
                })}
              </nav>

              <div className="mb-2">
                <button onClick={() => { setLangOpen(!langOpen); setCvOpen(false) }}
                  className="font-heading text-lg no-underline rounded-lg px-4 py-3 transition-colors duration-200 flex items-center justify-between w-full cursor-pointer border-none"
                  style={{ color: 'var(--text)', background: langOpen ? 'var(--bg-card)' : 'transparent' }}>
                  <span className="flex items-center gap-2">
                    {t.nav.language}
                    <span className="font-sans text-[11px] uppercase tracking-[0.1em] font-medium" style={{ color: 'var(--accent)' }}>{lang.toUpperCase()}</span>
                  </span>
                  <motion.span animate={{ rotate: langOpen ? 180 : 0 }} transition={{ duration: 0.2 }} style={{ fontSize: '10px', color: 'var(--text-muted)' }}>▼</motion.span>
                </button>
                <AnimatePresence>
                  {langOpen && (
                    <motion.div initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.15 }}>
                      <div className="flex flex-col gap-0.5 px-4 pb-2">
                        {(['en', 'es', 'ru'] as Lang[]).map((l) => (
                          <button key={l}
                            onClick={() => { setLang(l); setLangOpen(false) }}
                            className="w-full text-left px-4 py-2.5 rounded-lg text-sm font-sans no-underline transition-colors duration-150 cursor-pointer border-none"
                            style={{
                              color: lang === l ? 'var(--accent)' : 'var(--text-secondary)',
                              background: lang === l ? 'var(--accent-dim)' : 'transparent',
                            }}
                            onMouseEnter={(e: React.MouseEvent<HTMLButtonElement>) => { if (lang !== l) e.currentTarget.style.background = 'var(--bg-card)' }}
                            onMouseLeave={(e: React.MouseEvent<HTMLButtonElement>) => { if (lang !== l) e.currentTarget.style.background = 'transparent' }}>
                            {l === 'en' ? '🇬🇧 English' : l === 'es' ? '🇲🇽 Español' : '🇷🇺 Русский'}
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="mb-2">
                <button onClick={() => { setCvOpen(!cvOpen); setLangOpen(false) }}
                  className="font-heading text-lg no-underline rounded-lg px-4 py-3 transition-colors duration-200 flex items-center justify-between w-full cursor-pointer border-none"
                  style={{ color: 'var(--text)', background: cvOpen ? 'var(--bg-card)' : 'transparent' }}>
                  <span>{t.nav.cv}</span>
                  <motion.span animate={{ rotate: cvOpen ? 180 : 0 }} transition={{ duration: 0.2 }} style={{ fontSize: '10px', color: 'var(--text-muted)' }}>▼</motion.span>
                </button>
                <AnimatePresence>
                  {cvOpen && (
                    <motion.div initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.15 }}>
                      <div className="flex flex-col gap-0.5 px-4 pb-2">
                        {[
                          { label: 'CV-EN', href: '/cv/Tony_Darko_CV_EN.pdf' },
                          { label: 'CV-RU', href: '/cv/Tony_Darko_CV_RU.pdf' },
                          { label: 'CV-ES', href: '/cv/Tony_Darko_CV_ES.pdf' },
                        ].map((item) => (
                          <a key={item.label} href={item.href} download
                            className="block w-full px-4 py-2.5 rounded-lg text-sm font-sans no-underline transition-colors duration-150"
                            style={{ color: 'var(--accent)' }}
                            onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--bg-card)' }}
                            onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent' }}>{item.label}</a>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}