'use client'

import { usePathname, useRouter } from 'next/navigation'
import { useCallback, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Cursor from '@/components/Cursor'
import NoiseOverlay from '@/components/NoiseOverlay'
import SoundEffects from '@/components/SoundEffects'
import PageTransition from '@/components/PageTransition'
import ParticleField from '@/components/ParticleField'
import LoadingScreen from '@/components/LoadingScreen'
import { TransitionContext } from './TransitionContext'

export default function LayoutShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const isLanding = pathname === '/'
  const [overlayVisible, setOverlayVisible] = useState(false)
  const pendingNavRef = useRef<string | null>(null)
  const prevPathnameRef = useRef(pathname)

  // ── Cursor gradient (persistent across all pages) ──
  const mouseX = useMotionValue(0.5)
  const mouseY = useMotionValue(0.5)
  const springX = useSpring(mouseX, { stiffness: 60, damping: 20 })
  const springY = useSpring(mouseY, { stiffness: 60, damping: 20 })

  const gradientBg = useTransform(
    [springX, springY],
    ([x, y]) => `radial-gradient(circle at ${(x as number) * 100}% ${(y as number) * 100}%, var(--accent-dim) 0%, transparent 40%)`,
  )

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect()
    mouseX.set(e.clientX / rect.width)
    mouseY.set(e.clientY / rect.height)
  }, [mouseX, mouseY])

  // ── Navigate function (provided via context) ──
  const navigate = useCallback((href: string) => {
    const prev = pathname
    if (prev === '/' || href === '/') {
      pendingNavRef.current = href
      setOverlayVisible(true)
    } else {
      router.push(href)
    }
  }, [pathname, router])

  const handleTransitionEnd = useCallback(() => {
    setOverlayVisible(false)
    pendingNavRef.current = null
  }, [])

  return (
    <TransitionContext.Provider value={{ navigate }}>
      <LoadingScreen />
      <div onMouseMove={handleMouseMove} className="relative min-h-screen" style={{ background: 'var(--bg)' }}>
        {/* ── Cursor-following gradient + particles (landing only) ── */}
        {isLanding && (
          <>
            <motion.div
              className="fixed inset-0 pointer-events-none z-0"
              style={{ background: gradientBg }}
            />
            <ParticleField />
          </>
        )}

        {/* ── Content ── */}
        <div className="relative z-10">
          {!isLanding && <NoiseOverlay />}
          <Cursor />
          {!isLanding && <Navbar />}
          <SoundEffects />
          <main id="main-content">
            {children}
          </main>
          {!isLanding && pathname !== '/work' && <Footer />}
        </div>

        {/* ── Transition overlay (fixed, covers everything) ── */}
        <PageTransition
          overlayVisible={overlayVisible}
          onTransitionEnd={handleTransitionEnd}
          targetHref={pendingNavRef.current}
        />
      </div>
    </TransitionContext.Provider>
  )
}