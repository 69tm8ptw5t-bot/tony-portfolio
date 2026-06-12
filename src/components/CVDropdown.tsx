'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const items = [
  { label: 'CV-EN', href: '/cv/CV-en.pdf' },
  { label: 'CV-RU', href: '/cv/CV-ru.pdf' },
  { label: 'CV-ES', href: '/cv/CV-es.pdf' },
]

interface CVDropdownProps {
  /** 'navbar' for the compact nav version, 'inline' for the prominent landing page version */
  variant?: 'navbar' | 'inline'
}

export default function CVDropdown({ variant = 'navbar' }: CVDropdownProps) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onPointerDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', onPointerDown)
    return () => document.removeEventListener('mousedown', onPointerDown)
  }, [])

  if (variant === 'inline') {
    return (
      <div ref={ref} className="relative inline-flex flex-col items-center">
        <button onClick={() => setOpen(!open)}
          className="font-heading text-xs uppercase tracking-[0.15em] font-bold cursor-pointer flex items-center gap-2 rounded-xl px-5 py-2.5 border hover:scale-[1.03] active:scale-[0.97] transition-all duration-200"
          style={{
            background: 'var(--accent)',
            color: 'var(--button-text)',
            border: '1px solid var(--accent)',
            boxShadow: '0 0 20px var(--accent-glow-strong)',
          }}
          aria-label="Download CV"
          aria-expanded={open}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
          Download CV
          <span className="inline-block transition-transform duration-200 text-[8px]" style={{ transform: `rotate(${open ? 180 : 0}deg)` }}>▼</span>
        </button>
        <AnimatePresence>
          {open && (
            <motion.div
              className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 rounded-xl overflow-hidden border z-50 min-w-[120px]"
              style={{ background: 'var(--bg-card)', borderColor: 'var(--border)' }}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.15, ease: [0.4, 0, 0.2, 1] }}
            >
              {items.map((item) => (
                <a key={item.label} href={item.href} download
                  className="block w-full text-center px-4 py-2.5 text-[11px] uppercase tracking-[0.1em] no-underline hover:opacity-80 transition-opacity font-sans font-medium"
                  style={{ color: 'var(--accent)' }}
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </a>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    )
  }

  // Navbar variant
  return (
    <div ref={ref} className="relative">
      <button onClick={() => setOpen(!open)}
        className="text-[10px] lg:text-[11px] uppercase tracking-[0.12em] rounded-full px-3 lg:px-3.5 py-1.5 relative cursor-pointer hover:scale-105 active:scale-95 transition-transform duration-200 font-medium"
        style={{ color: 'var(--accent)', border: '1px solid var(--accent)', background: 'transparent' }}
        aria-label="Download CV"
        aria-expanded={open}
      >
        <span className="relative z-10 flex items-center gap-1">
          CV
          <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }} style={{ display: 'inline-block', fontSize: '8px' }}>▼</motion.span>
        </span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            className="absolute right-0 top-full mt-2 rounded-lg overflow-hidden border z-50"
            style={{ background: 'var(--bg-card)', borderColor: 'var(--border)', minWidth: '120px' }}
            initial={{ opacity: 0, y: -8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.95 }}
            transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
          >
            {items.map((item) => (
              <a key={item.label} href={item.href} download
                className="block w-full text-left px-3.5 py-2.5 text-[11px] uppercase tracking-[0.1em] no-underline transition-colors duration-150 font-medium"
                style={{ color: 'var(--text-secondary)' }}
                onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--bg-card-hover)'; e.currentTarget.style.color = 'var(--accent)' }}
                onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--text-secondary)' }}
                onClick={() => setOpen(false)}
              >
                {item.label}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}