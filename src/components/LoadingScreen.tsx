'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0)
  const [done, setDone] = useState(false)

  useEffect(() => {
    // Check if page was already loaded (soft navigation)
    if (document.readyState === 'complete' && document.querySelectorAll('video').length === 0) {
      setProgress(100)
      setTimeout(() => setDone(true), 300)
      return
    }

    const interval = setInterval(() => {
      setProgress((prev) => {
        const videos = document.querySelectorAll('video')
        let loaded = 0
        videos.forEach((v) => {
          if (v.readyState >= 2) loaded++
        })
        const pct = videos.length > 0 ? Math.round((loaded / videos.length) * 100) : 60
        // Clamp between current and 95
        const next = Math.max(prev, Math.min(pct, 95))
        return next
      })
    }, 200)

    // Max 4 seconds
    const timeout = setTimeout(() => {
      setProgress(100)
      setTimeout(() => {
        setDone(true)
        clearInterval(interval)
      }, 400)
    }, 4000)

    return () => {
      clearInterval(interval)
      clearTimeout(timeout)
    }
  }, [])

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
          style={{ background: 'var(--bg)' }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
        >
          <div className="flex flex-col items-center gap-6">
            {/* Logo / Name */}
            <h1
              className="font-heading font-bold leading-[1.0] tracking-tight"
              style={{ fontSize: 'clamp(28px, 6vw, 48px)', color: 'var(--text)' }}
            >
              <span style={{ color: 'var(--accent)' }}>TONY</span> DARKO
            </h1>

            {/* Progress bar */}
            <div className="w-[200px] md:w-[280px] h-[2px] rounded-full overflow-hidden" style={{ background: 'var(--border)' }}>
              <motion.div
                className="h-full rounded-full"
                style={{ background: 'var(--accent)', width: `${Math.min(progress, 100)}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>

            <span className="font-sans text-[10px] uppercase tracking-[0.25em]" style={{ color: 'var(--text-muted)' }}>
              {progress < 100 ? 'Loading experience...' : 'Ready'}
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}