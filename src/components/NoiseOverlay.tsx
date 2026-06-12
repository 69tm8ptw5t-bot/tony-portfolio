'use client'

import { useEffect, useRef, useState } from 'react'

export default function NoiseOverlay() {
  const [visible, setVisible] = useState(false)

  // Scroll position (tracked via passive listener)
  const scrollRef = useRef(0)

  // Gradient orb DOM refs
  const orb1Ref = useRef<HTMLDivElement>(null)
  const orb2Ref = useRef<HTMLDivElement>(null)
  const orb3Ref = useRef<HTMLDivElement>(null)

  // Cursor tracking with lerp delay
  const cursorRef = useRef({ x: 0.5, y: 0.5 })
  const smoothRef = useRef({ x: 0.5, y: 0.5 })

  // ── Fade in alongside page content ──
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 80)
    return () => clearTimeout(t)
  }, [])

  // ── Track scroll position ──
  useEffect(() => {
    const onScroll = () => {
      scrollRef.current = window.scrollY
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // ── Track cursor position ──
  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      cursorRef.current = {
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      }
    }
    window.addEventListener('mousemove', onMouseMove, { passive: true })
    return () => window.removeEventListener('mousemove', onMouseMove)
  }, [])

  // ── Single RAF loop: scroll parallax + cursor follow ──
  useEffect(() => {
    let raf: number
    const animate = () => {
      // Smooth cursor with lerp
      smoothRef.current.x += (cursorRef.current.x - smoothRef.current.x) * 0.04
      smoothRef.current.y += (cursorRef.current.y - smoothRef.current.y) * 0.04

      const sy = scrollRef.current

      // Orb 1 — scroll parallax (moves down)
      if (orb1Ref.current) {
        orb1Ref.current.style.transform = `translateY(${sy * 0.08}px)`
      }

      // Orb 2 — inverse scroll parallax (moves up)
      if (orb2Ref.current) {
        orb2Ref.current.style.transform = `translateY(${sy * -0.08}px)`
      }

      // Orb 3 — cursor-following, always centered exactly where the cursor is
      if (orb3Ref.current) {
        const dx = (smoothRef.current.x - 0.5) * window.innerWidth
        const dy = (smoothRef.current.y - 0.5) * window.innerHeight
        orb3Ref.current.style.transform = `translate(calc(-50% + ${dx}px), calc(-50% + ${dy}px))`
      }

      raf = requestAnimationFrame(animate)
    }
    raf = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(raf)
  }, [])

  return (
    <div
      className="fixed inset-0 w-full h-full pointer-events-none z-0"
      style={{
        opacity: visible ? 1 : 0,
        transition: 'opacity 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
      }}
    >
      {/* ── Gradiente orb 1 — superior izquierdo, tono frío, parallax scroll ── */}
      <div
        ref={orb1Ref}
        className="fixed top-[-20%] left-[-15%] w-[70%] h-[60%] rounded-full pointer-events-none will-change-transform"
        style={{
          background:
            'radial-gradient(ellipse at 30% 40%, color-mix(in srgb, var(--accent) 20%, transparent) 0%, color-mix(in srgb, var(--accent) 8%, transparent) 45%, transparent 75%)',
          filter: 'blur(80px)',
        }}
      />

      {/* ── Gradiente orb 2 — inferior derecho, tono cálido, parallax inverso ── */}
      <div
        ref={orb2Ref}
        className="fixed bottom-[-20%] right-[-15%] w-[70%] h-[60%] rounded-full pointer-events-none will-change-transform"
        style={{
          background:
            'radial-gradient(ellipse at 70% 60%, color-mix(in srgb, var(--accent-warm) 22%, transparent) 0%, color-mix(in srgb, var(--accent-warm) 8%, transparent) 45%, transparent 75%)',
          filter: 'blur(80px)',
        }}
      />

      {/* ── Gradiente orb 3 — sigue al cursor, centrado, abstracto ── */}
      <div
        ref={orb3Ref}
        className="fixed top-[50%] left-[50%] w-[45%] h-[40%] rounded-full pointer-events-none will-change-transform"
        style={{
          background:
            'radial-gradient(circle at center, color-mix(in srgb, var(--accent) 18%, transparent) 0%, color-mix(in srgb, var(--accent) 5%, transparent) 35%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />

      {/* ── Textura noise sutil — compatible con cualquier tema ── */}
      <div
        className="fixed inset-0 w-full h-full pointer-events-none mix-blend-overlay"
        style={{
          backgroundImage:
            'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.75\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\' opacity=\'1\'/%3E%3C/svg%3E")',
          backgroundSize: '200px 200px',
          opacity: 0.045,
        }}
      />
    </div>
  )
}