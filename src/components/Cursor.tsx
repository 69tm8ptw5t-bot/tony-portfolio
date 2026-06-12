'use client'

import { useEffect, useRef } from 'react'

export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const posRef = useRef({ x: -30, y: -30 })
  const targetRef = useRef({ x: -30, y: -30 })

  useEffect(() => {
    const onMouse = (e: MouseEvent) => {
      targetRef.current = { x: e.clientX, y: e.clientY }
    }

    window.addEventListener('mousemove', onMouse)

    let raf: number
    const animate = () => {
      posRef.current.x += (targetRef.current.x - posRef.current.x) * 0.13
      posRef.current.y += (targetRef.current.y - posRef.current.y) * 0.13
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${posRef.current.x - 4}px, ${posRef.current.y - 4}px)`
      }
      raf = requestAnimationFrame(animate)
    }
    animate()

    return () => {
      window.removeEventListener('mousemove', onMouse)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <div
      ref={dotRef}
      className="fixed top-0 left-0 w-2 h-2 rounded-full pointer-events-none z-[9999] hidden md:block"
      style={{
        background: 'var(--accent)',
        mixBlendMode: 'difference',
      }}
    />
  )
}