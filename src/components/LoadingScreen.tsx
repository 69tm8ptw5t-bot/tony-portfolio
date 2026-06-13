'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0)
  const [done, setDone] = useState(false)

  useEffect(() => {
    // Quick exit: no videos on page (soft navigation)
    const hasVideos = document.querySelectorAll('video').length > 0
    if (!hasVideos) {
      setProgress(100)
      setTimeout(() => setDone(true), 200)
      return
    }

    // Wait only for the first video (hero reel) or timeout 3s
    const heroVideo = document.querySelector('video')
    let resolved = false

    const check = setInterval(() => {
      if (heroVideo && heroVideo.readyState >= 2) {
        setProgress(100)
        resolved = true
        clearInterval(check)
        setTimeout(() => setDone(true), 300)
      } else {
        setProgress((prev) => Math.min(prev + 8, 85))
      }
    }, 200)

    const timeout = setTimeout(() => {
      if (!resolved) {
        setProgress(100)
        clearInterval(check)
        setTimeout(() => setDone(true), 300)
      }
    }, 3000)

    return () => {
      clearInterval(check)
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
          transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
        >
          <div className="flex flex-col items-center gap-6">
            <h1
              className="font-heading font-bold leading-[1.0] tracking-tight"
              style={{ fontSize: 'clamp(28px, 6vw, 48px)', color: 'var(--text)' }}
            >
              <span style={{ color: 'var(--accent)' }}>TONY</span> DARKO
            </h1>

            <div className="w-[200px] md:w-[280px] h-[2px] rounded-full overflow-hidden" style={{ background: 'var(--border)' }}>
              <motion.div
                className="h-full rounded-full"
                style={{ background: 'var(--accent)', width: `${Math.min(progress, 100)}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>

            <span className="font-sans text-[10px] uppercase tracking-[0.25em]" style={{ color: 'var(--text-muted)' }}>
              {progress < 100 ? 'Loading...' : 'Ready'}
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
