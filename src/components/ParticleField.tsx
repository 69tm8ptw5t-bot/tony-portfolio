'use client'

import { useRef, useEffect } from 'react'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  baseSize: number
  alpha: number
  baseAlpha: number
}

export default function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef = useRef({ x: -999, y: -999, active: false })
  const particlesRef = useRef<Particle[]>([])
  const rafRef = useRef<number>(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let w = 0
    let h = 0

    const resize = () => {
      w = window.innerWidth
      h = window.innerHeight
      canvas!.width = w
      canvas!.height = h
    }
    resize()

    const handleMouse = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX
      mouseRef.current.y = e.clientY
      mouseRef.current.active = true
    }
    const handleLeave = () => {
      mouseRef.current.active = false
    }

    window.addEventListener('resize', resize)
    window.addEventListener('mousemove', handleMouse)
    window.addEventListener('mouseleave', handleLeave)

    // 80 particles for richer effect
    const count = 80
    particlesRef.current = Array.from({ length: count }, () => {
      const baseSize = 1.5 + Math.random() * 3.5
      return {
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: baseSize,
        baseSize,
        alpha: 0.2 + Math.random() * 0.25,
        baseAlpha: 0.2 + Math.random() * 0.25,
      }
    })

    const computeStyle = getComputedStyle(document.documentElement)
    const getAccent = () => computeStyle.getPropertyValue('--accent').trim() || '#FFD166'

    const animate = () => {
      ctx!.clearRect(0, 0, w, h)
      const accent = getAccent()
      const mouse = mouseRef.current
      const particles = particlesRef.current

      // ── Move & interact with cursor ──
      for (const p of particles) {
        // Natural drift
        p.x += p.vx
        p.y += p.vy

        // Wrap around edges
        if (p.x < -20) p.x = w + 20
        if (p.x > w + 20) p.x = -20
        if (p.y < -20) p.y = h + 20
        if (p.y > h + 20) p.y = -20

        // ── Cursor interaction ──
        if (mouse.active) {
          const dx = p.x - mouse.x
          const dy = p.y - mouse.y
          const dist = Math.sqrt(dx * dx + dy * dy)

          // Repulsion (strong when very close)
          const repelRadius = 120
          if (dist < repelRadius && dist > 0) {
            const force = (1 - dist / repelRadius) * 4
            p.x += (dx / dist) * force
            p.y += (dy / dist) * force
          }

          // Attraction (gentle pull from medium distance)
          const attractRadius = 250
          if (dist > repelRadius && dist < attractRadius) {
            const force = (1 - dist / attractRadius) * 0.3
            p.x -= (dx / dist) * force
            p.y -= (dy / dist) * force
          }

          // Brighten & grow near cursor
          const glowRadius = 200
          if (dist < glowRadius) {
            const t = 1 - dist / glowRadius
            p.size = p.baseSize + t * 4
            p.alpha = Math.min(p.baseAlpha + t * 0.5, 1)
          } else {
            p.size += (p.baseSize - p.size) * 0.05
            p.alpha += (p.baseAlpha - p.alpha) * 0.05
          }
        } else {
          // Smoothly return to base state
          p.size += (p.baseSize - p.size) * 0.03
          p.alpha += (p.baseAlpha - p.alpha) * 0.03
        }
      }

      // ── Draw connection lines (particle ↔ particle) ──
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          const maxDist = 140
          if (dist < maxDist) {
            ctx!.beginPath()
            ctx!.moveTo(particles[i].x, particles[i].y)
            ctx!.lineTo(particles[j].x, particles[j].y)
            ctx!.strokeStyle = accent
            ctx!.globalAlpha = (1 - dist / maxDist) * 0.18
            ctx!.lineWidth = 0.5
            ctx!.stroke()
          }
        }
      }

      // ── Draw connection lines (particle ↔ cursor) ──
      if (mouse.active) {
        for (const p of particles) {
          const dx = p.x - mouse.x
          const dy = p.y - mouse.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          const maxCursorDist = 180
          if (dist < maxCursorDist) {
            ctx!.beginPath()
            ctx!.moveTo(p.x, p.y)
            ctx!.lineTo(mouse.x, mouse.y)
            ctx!.strokeStyle = accent
            ctx!.globalAlpha = (1 - dist / maxCursorDist) * 0.12
            ctx!.lineWidth = 0.5
            ctx!.stroke()
          }
        }
      }

      // ── Draw particles ──
      for (const p of particles) {
        ctx!.beginPath()
        ctx!.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx!.fillStyle = accent
        ctx!.globalAlpha = p.alpha
        ctx!.fill()

        // Glow effect
        ctx!.beginPath()
        ctx!.arc(p.x, p.y, p.size * 2.5, 0, Math.PI * 2)
        ctx!.fillStyle = accent
        ctx!.globalAlpha = p.alpha * 0.12
        ctx!.fill()
      }

      ctx!.globalAlpha = 1
      rafRef.current = requestAnimationFrame(animate)
    }

    rafRef.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', handleMouse)
      window.removeEventListener('mouseleave', handleLeave)
      cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.7 }}
    />
  )
}