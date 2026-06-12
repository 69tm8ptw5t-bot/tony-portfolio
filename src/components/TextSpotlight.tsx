'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

export default function TextSpotlight({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.1, 1, 1, 0.1])
  const scale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.85, 1, 1, 0.85])
  const blur = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], ['blur(8px)', 'blur(0px)', 'blur(0px)', 'blur(8px)'])
  const y = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [40, 0, 0, -40])

  return (
    <div ref={ref} className="relative flex items-center justify-center py-24 md:py-32">
      {/* Spotlight gradient */}
      <motion.div
        className="absolute w-[60%] h-[200%] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse, var(--accent-glow-strong) 0%, transparent 70%)',
          opacity: useTransform(scrollYProgress, [0, 0.5, 1], [0, 0.6, 0]),
          scale,
        }}
      />
      <motion.div
        style={{ opacity, scale, filter: blur, y }}
        className="relative z-10 text-center"
      >
        {children}
      </motion.div>
    </div>
  )
}