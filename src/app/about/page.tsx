'use client'

import { useRef, useState, useEffect } from 'react'
import { motion, useInView, useMotionValue, useSpring, useTransform } from 'framer-motion'
import Image from 'next/image'
import TransitionLink from '@/components/TransitionLink'
import ParticleField from '@/components/ParticleField'
import { useLang } from '@/components/LanguageProvider'

// ── Reversible text reveal (clip-path) ──────────
function Reveal({ children, delay = 0, margin = '-20%' }: { children: React.ReactNode; delay?: number; margin?: string }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: false, margin: margin as any })
  return (
    <motion.div
      ref={ref}
      initial={{ clipPath: 'inset(0 100% 0 0)' }}
      animate={inView ? { clipPath: 'inset(0 0% 0 0)' } : { clipPath: 'inset(0 100% 0 0)' }}
      transition={{ duration: 0.6, delay, ease: [0.4, 0, 0.2, 1] }}
    >
      {children}
    </motion.div>
  )
}

const easeFn = [0.4, 0, 0.2, 1] as const

function Stagger({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: false, margin: '-50px' })
  return (
    <motion.div ref={ref} className={className}
      initial="hidden" animate={inView ? 'visible' : 'hidden'}
      variants={{ visible: { transition: { staggerChildren: 0.05 } }, hidden: {} }}>
      {children}
    </motion.div>
  )
}

const fadeItem = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: easeFn } },
}

function formatNum(n: number): string {
  if (n >= 1000000) return `${(n / 1000000).toFixed(0)}M`
  if (n >= 1000) return `${(n / 1000).toFixed(0)}K`
  return `${n}`
}

function CountUp({ value, suffix = '' }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: false })
  const [display, setDisplay] = useState('0')
  const started = useRef(false)
  useEffect(() => {
    if (inView && !started.current) {
      started.current = true
      const dur = 1200, start = performance.now()
      const fn = (now: number) => {
        const p = Math.min((now - start) / dur, 1), e = 1 - (1 - p) * (1 - p)
        const raw = Math.round(e * value)
        setDisplay(`${formatNum(raw)}${suffix}`)
        if (p < 1) requestAnimationFrame(fn)
      }
      requestAnimationFrame(fn)
    }
    if (!inView) { started.current = false; setDisplay('0') }
  }, [inView, value, suffix])
  return <span ref={ref}>{display}</span>
}

function SkillBar({ label, items, pct }: { label: string; items: string; pct: number }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: false, margin: '-30px' })
  return (
    <motion.div ref={ref} className="mb-4" variants={fadeItem}>
      <div className="flex justify-between mb-1.5">
        <span className="font-sans text-xs md:text-sm font-medium" style={{ color: 'var(--text)' }}>{label}</span>
        <span className="font-sans text-xs md:text-sm font-semibold" style={{ color: 'var(--accent)' }}>{pct}%</span>
      </div>
      <div className="h-[6px] md:h-[8px] rounded-full overflow-hidden" style={{ background: 'var(--border)' }}>
        <motion.div className="h-full rounded-full" style={{ background: 'linear-gradient(90deg, var(--accent), var(--accent-secondary))' }}
          initial={{ width: '0%' }} animate={inView ? { width: `${pct}%` } : { width: '0%' }}
          transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }} />
      </div>
      <p className="font-sans text-xs leading-[1.6] mt-1 font-medium" style={{ color: 'var(--text-muted)' }}>{items}</p>
    </motion.div>
  )
}

const roleIcons: Record<string, React.ReactNode> = {
  'Zack D Films': (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-full h-full"><polygon points="23 7 16 12 23 17 23 7" /><rect x="1" y="5" width="15" height="14" rx="2" ry="2" /></svg>),
  'Michicanos': (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-full h-full"><rect x="2" y="6" width="20" height="12" rx="2" /><path d="M12 12h.01" /><path d="M6 12h.01" /><path d="M18 12h.01" /></svg>),
  'Union Avatars': (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-full h-full"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>),
  'Decentraland': (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-full h-full"><circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" /></svg>),
  'Freelance': (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-full h-full"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" /></svg>),
  default: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-full h-full"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>),
}

function getIconKey(org: string): string {
  for (const key of Object.keys(roleIcons)) { if (org.includes(key)) return key }
  return 'default'
}

function TimelineItem({ year, title, company, desc, tags, index }: {
  year: string; title: string; company: string; desc: string; tags: string[]; index: number
}) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: false, margin: '-30px' })
  const iconKey = getIconKey(company)
  return (
    <motion.div ref={ref} className="relative pl-14 md:pl-16 pb-10"
      initial={{ opacity: 0, x: -20 }} animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
      transition={{ duration: 0.45, delay: index * 0.06, ease: [0.4, 0, 0.2, 1] }}>
      <div className="absolute left-[17px] md:left-[19px] top-8 bottom-0 w-px" style={{ background: 'var(--border)' }} />
      <motion.div className="absolute left-0 top-1 w-[34px] h-[34px] md:w-[38px] md:h-[38px] rounded-full border-2 flex items-center justify-center p-1.5 md:p-2"
        style={{ borderColor: 'var(--accent)', background: 'var(--bg)' }} whileHover={{ scale: 1.15 }}>
        <div style={{ color: 'var(--accent)' }}>{roleIcons[iconKey]}</div>
      </motion.div>
      <motion.div className="p-3.5 md:p-4 rounded-lg border" style={{ background: 'var(--bg-card)', borderColor: 'var(--border)' }}
        whileHover={{ x: 6, borderColor: 'var(--accent)', boxShadow: '0 0 16px var(--accent-glow-strong)' }} transition={{ duration: 0.2 }}>
        <span className="font-sans text-[11px] md:text-xs uppercase tracking-[0.12em] font-semibold" style={{ color: 'var(--accent)' }}>{year}</span>
        <h3 className="font-heading text-sm md:text-base font-semibold m-0 mt-0.5" style={{ color: 'var(--text)' }}>{title}</h3>
        <p className="font-sans text-xs md:text-sm m-0 mt-0.5 mb-1.5 font-semibold" style={{ color: 'var(--accent)' }}>{company}</p>
        <p className="font-sans text-xs md:text-sm leading-[1.6] m-0" style={{ color: 'var(--text-secondary)' }}>{desc}</p>
        <div className="flex flex-wrap gap-1.5 mt-2">
          {tags.map((t) => (
            <motion.span key={t} className="rounded px-1.5 py-0.5 text-[11px] md:text-xs inline-block font-semibold"
              style={{ background: 'var(--accent-dim)', color: 'var(--accent)' }} whileHover={{ scale: 1.1 }}>{t}</motion.span>
          ))}
        </div>
      </motion.div>
    </motion.div>
  )
}

function RecognitionCard({ year, title, detail, index }: { year: string; title: string; detail: string; index: number }) {
  const ref = useRef(null)
  const [hovered, setHovered] = useState(false)
  const inView = useInView(ref, { once: false, margin: '-30px' })
  return (
    <motion.div ref={ref} className="rounded-xl overflow-hidden border cursor-pointer flex flex-row w-full"
      style={{ background: 'var(--bg-card)', borderColor: 'var(--border)', minHeight: '100px' }}
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 20, scale: 0.95 }}
      transition={{ duration: 0.35, delay: index * 0.06, ease: [0.4, 0, 0.2, 1] }}
      onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
      <div className="flex-1 p-3 md:p-4 flex flex-col justify-center">
        <span className="font-sans text-[10px] md:text-[11px] uppercase tracking-[0.12em] font-medium" style={{ color: 'var(--accent)' }}>{year}</span>
        <h4 className="font-heading text-xs md:text-sm font-semibold m-0 mt-1" style={{ color: 'var(--text)' }}>{title}</h4>
        <p className="font-sans text-[11px] md:text-xs m-0 mt-1 leading-[1.5] font-medium" style={{ color: 'var(--text-secondary)' }}>{detail}</p>
      </div>
      <div className="w-[80px] md:w-[120px] flex-shrink-0 flex items-center justify-center overflow-hidden"
        style={{ background: 'linear-gradient(135deg, var(--accent-dim) 0%, var(--bg-card) 100%)' }}>
        <motion.div animate={{ scale: hovered ? 1.1 : 1, filter: hovered ? 'grayscale(0%) brightness(1)' : 'grayscale(100%) brightness(0.6)' }}
          transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="w-8 h-8 md:w-10 md:h-10 opacity-30" style={{ color: 'var(--accent)' }}>
            <circle cx="12" cy="8" r="6" /><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
          </svg>
        </motion.div>
      </div>
    </motion.div>
  )
}

function StatsRow() {
  const { t } = useLang()
  const ref = useRef(null)
  const inView = useInView(ref, { once: false, margin: '-30px' })
  return (
    <motion.div ref={ref} className="flex justify-center gap-8 md:gap-16 flex-wrap"
      initial="hidden" animate={inView ? 'visible' : 'hidden'}
      variants={{ visible: { transition: { staggerChildren: 0.08 } }, hidden: {} }}>
      {[
        { value: 25000000, suffix: '+', label: t.stats.views },
        { value: 5, suffix: '+', label: t.stats.experience },
        { value: 300, suffix: '+', label: t.stats.students },
        { value: 4, suffix: '', label: t.stats.exhibitions },
      ].map((s) => (
        <motion.div key={s.label} className="text-center"
          variants={{ hidden: { opacity: 0, y: 20, scale: 0.9 }, visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.4, ease: easeFn } } }}>
          <span className="block font-heading text-2xl md:text-4xl font-bold" style={{ color: 'var(--accent)' }}>
            <CountUp value={s.value} suffix={s.suffix} />
          </span>
          <span className="block font-sans text-[11px] md:text-xs uppercase tracking-[0.15em] mt-1 font-semibold" style={{ color: 'var(--text-muted)' }}>{s.label}</span>
        </motion.div>
      ))}
    </motion.div>
  )
}

function ScrollIndicator() {
  const { t } = useLang()
  return (
    <motion.div className="flex flex-col items-center gap-2 mt-10 md:mt-12"
      initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: false }} transition={{ delay: 0.5 }}>
      <motion.span className="font-sans text-[10px] md:text-xs uppercase tracking-[0.2em] font-medium" style={{ color: 'var(--text-muted)' }}>
        {t.about.scrollExplore}
      </motion.span>
      <motion.div className="w-5 h-8 md:w-6 md:h-10 rounded-full border-2 flex items-start justify-center pt-1.5"
        style={{ borderColor: 'var(--text-muted)' }}
        animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 2, repeat: Infinity }}>
        <motion.div className="w-1 h-2 md:w-1.5 md:h-2.5 rounded-full" style={{ background: 'var(--accent)' }}
          animate={{ y: [0, 10, 0] }} transition={{ duration: 1.5, repeat: Infinity }} />
      </motion.div>
    </motion.div>
  )
}

// ── Hero with bloom + hover glow + particles ──
function HeroSection() {
  const { t } = useLang()
  const mouseX = useMotionValue(0.5)
  const mouseY = useMotionValue(0.5)
  const springX = useSpring(mouseX, { stiffness: 30, damping: 25 })
  const springY = useSpring(mouseY, { stiffness: 30, damping: 25 })

  // Bloom position follows mouse
  const bloomX = useTransform(springX, [0, 1], ['20%', '80%'])
  const bloomY = useTransform(springY, [0, 1], ['20%', '80%'])

  const handleMouse = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect()
    mouseX.set(e.clientX / rect.width)
    mouseY.set(e.clientY / rect.height)
  }

  return (
    <section onMouseMove={handleMouse} className="min-h-dvh flex items-center justify-center px-5 md:px-6 py-16 md:py-20 relative overflow-hidden" style={{ background: 'var(--bg)' }}>
      {/* Particles in background */}
      <div className="absolute inset-0 opacity-30 pointer-events-none z-0">
        <ParticleField />
      </div>

      {/* Reactive bloom that follows cursor */}
      <motion.div
        className="hidden md:block absolute pointer-events-none w-[500px] h-[500px] rounded-full -translate-x-1/2 -translate-y-1/2 z-[1]"
        style={{
          left: bloomX,
          top: bloomY,
          background: 'radial-gradient(circle, var(--accent-glow) 0%, var(--accent-dim) 30%, transparent 70%)',
        }}
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Constant ambient bloom */}
      <div className="hidden md:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full pointer-events-none z-[1]"
        style={{ background: 'radial-gradient(circle, var(--accent-glow) 0%, transparent 60%)', opacity: 0.25 }} />

      <div className="w-full max-w-6xl mx-auto flex flex-col items-center relative z-10">
        {/* Line 1: hover glow effect — 3 lines on mobile, 1 line on desktop */}
        <motion.h1
          className="font-heading text-[clamp(28px,8vw,96px)] leading-[1.1] font-medium text-center"
          style={{ color: 'var(--text)' }}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          whileHover={{ textShadow: '0 0 40px var(--accent-glow-strong), 0 0 80px var(--accent-glow)' }}
        >
          <span className="block md:inline" style={{ color: 'var(--accent)' }}>3D</span>
          <span className="block md:inline"> Motion Designer</span>
          <span className="block md:inline"> &</span>
          <span className="block md:inline"> CGI Generalist</span>
        </motion.h1>

        {/* Line 2: initial fade-up */}
        <motion.p
          className="max-w-4xl mx-auto text-center mt-8 md:mt-10 font-sans text-base md:text-2xl leading-relaxed"
          style={{ color: 'var(--text-secondary)' }}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          {t.about.heroPipeline}
        </motion.p>

        {/* Scroll indicator */}
        <div className="mt-16 md:mt-20">
          <ScrollIndicator />
        </div>
      </div>
    </section>
  )
}

// ── Main page ───────────────────────────────────
export default function About() {
  const { t } = useLang()
  const [imgHover, setImgHover] = useState(false)

  const timeline = [
    { year: '2025 – Present', title: '3D Motion Designer', company: 'Zack D Films & YouTube Channels (Zack D Films-style)',
      desc: 'Produced 3–5 short-form 3D animated pieces per week — hook-driven structure, brand-consistent, delivered at high volume.\nFull pipeline: brief → Blender 3D → AE compositing → multi-format export — same mechanics as mobile UA and game ad creative production.\nIntegrated AI tools (Tripo AI, Kling, NanoBanana) to accelerate asset generation and creative hypothesis testing without extending delivery time.',
      tags: ['Blender', 'After Effects', 'AI Workflow'] },
    { year: '2023 – Present', title: 'Creative Director & Lead Animator', company: 'Michicanos MX (Original IP)',
      desc: 'Founded original low-poly animated IP blending Mexican culture with PS2-era aesthetics — 25M+ organic views in 4 months across TikTok and Instagram. Zero paid distribution.\nBuilt full batch production pipeline in Blender: storyboard → 3D animation → compositing → platform-optimized export, enabling consistent weekly publishing cadence.\nLaunched UGC strategy — audience submissions converted into animated episodes, driving compounding community growth without paid acquisition.',
      tags: ['Blender', 'Low-poly', 'TikTok/IG'] },
    { year: '2023', title: '3D Technical Consultant & Cinematic Artist', company: 'Union Avatars',
      desc: 'Produced promotional cinematic for stylized 3D avatar product launch — full Blender pipeline from pre-viz to final composite.\nReduced avatar package size by 60% through atlas baking, decreasing the polygon count, UV consolidation and shader simplification while improving browser loading performance.\nConsulted on WebXR avatar architecture: rendering pipeline, scalable deployment strategy, and browser performance optimization.',
      tags: ['Blender', 'GLB', 'WebXR'] },
    { year: '2021 – 2023', title: 'Technical Artist & Motion Designer', company: 'I2C/Decentraland — I+D Studio',
      desc: 'Built 3D asset pipeline for games and metaverse experiences — shipped work inside Decentraland including interactive environments and branded experiences.\nDeveloped and shipped open-source VTubing app: software architecture, Unity scene setup, 3D character pipeline, and real-time rendering optimization.\nLed brand identity, UX/UI systems, and 3D promotional video across simultaneous XR projects for gaming-adjacent clients.',
      tags: ['Unity', 'Decentraland', 'Blender'] },
    { year: '2022 – Present', title: '3D Motion Designer & CGI Generalist', company: 'Freelance / Independent Studio',
      desc: 'Delivered 7+ cinematic and stylized 3D productions for brand, gaming-adjacent, Web3, and digital media clients — full pipeline 0 to deliverable.\nProduced 3D+2D hybrid content: explainer videos, social ads, branded short-form — adapted to 9×16, 16×9, 1×1, and 4×5 formats.',
      tags: ['Blender Cycles', 'After Effects', 'Full Pipeline'] },
  ]

  const achievements = [
    { year: '2021', title: '1st Place — Iberoamerican CryptoArt Contest', detail: 'Avalanche (AVAX) Blockchain · Judge: Javier Arrez' },
    { year: '2021', title: 'Speaker — Talent Land Home', detail: '"Democratization of Art Through Technology" · LATAM · Online' },
    { year: '2021–22', title: 'Exhibition — Renaissance Protocol (Virtual Reality)', detail: 'Vizmesh · New York, USA · Immersive digital art exhibition' },
    { year: '2023', title: 'Speaker — NFT Barcelona', detail: '"Digital Identities" · Barcelona, Spain · International Web3 conference' },
    { year: '2023', title: 'Exhibition — Mexican Embassy', detail: 'Texas, USA · Animated work exhibited' },
  ]

  const skillGroups = [
    { label: '3D & Animation', items: 'Blender (Cycles · EEVEE · Grease Pencil) · Unity · 3D Animation · Rigging · VFX', pct: 95 },
    { label: 'AI Workflow', items: 'Seedance 2.0 · Nano Banana · Stable Diffusion · Kling · ComfyUI · FLUX · Tripo AI', pct: 88 },
    { label: 'Real-time & Web', items: 'Unity (asset pipeline · scene setup · Recorder) · GLB/WebXR · Three.js · WebGL · GSAP', pct: 82 },
    { label: 'Texturing', items: 'Substance Painter · Substance Designer · PBR · Atlas baking · UV optimization', pct: 85 },
    { label: 'Post & Motion', items: 'After Effects · Premiere Pro · DaVinci Resolve · Compositing · Motion Graphics', pct: 92 },
    { label: 'Design', items: 'Figma · Illustrator · Photoshop · Brand Identity · UX/UI · Typography', pct: 80 },
  ]

  const teaching = [
    'Blender Instructor · NFTianguis · Decentraland · Adobe / Bitso / Government of México — 2021–2023 · Online · LATAM',
    '300+ students trained in Blender across 4 workshops — fundamentals through full 3D production projects, fully online across LATAM.',
    'Co-facilitated Decentraland wearables workshop: low-poly 3D assets, UV mapping, platform optimization, and on-chain deployment.',
    '2 workshops for Talentum digital school sponsored by Adobe, Bitso, and the Government of México — production-focused, community-wide reach.',
  ]

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }} style={{ overflow: 'visible' }}>
      <HeroSection />

      <div className="max-w-[1100px] mx-auto px-5 md:px-6 pb-10 md:pb-16">

        <div className="pt-8 md:pt-12">
        <Reveal delay={0}>
          <h2 className="font-heading text-xs md:text-sm uppercase tracking-[0.18em] mb-5 font-semibold text-center" style={{ color: 'var(--text-muted)' }}>{t.stats.byTheNumbers}</h2>
        </Reveal>
        </div>
        <div className="mb-14"><StatsRow /></div>

        <Reveal delay={0}>
          <h2 className="font-heading text-xs md:text-sm uppercase tracking-[0.18em] mb-6 font-semibold" style={{ color: 'var(--text-muted)' }}>{t.about.skills}</h2>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 mb-14">
          {skillGroups.map((s) => <SkillBar key={s.label} label={s.label} items={s.items} pct={s.pct} />)}
        </div>

        <Reveal delay={0}>
          <h2 className="font-heading text-xs md:text-sm uppercase tracking-[0.18em] mb-6 font-semibold" style={{ color: 'var(--text-muted)' }}>{t.about.experience}</h2>
        </Reveal>
        <div className="mb-14">{timeline.map((t, i) => <TimelineItem key={i} {...t} index={i} />)}</div>

        <Reveal delay={0}>
          <h2 className="font-heading text-xs md:text-sm uppercase tracking-[0.18em] mb-5 font-semibold" style={{ color: 'var(--text-muted)' }}>{t.about.teaching}</h2>
        </Reveal>
        <Stagger className="mb-14">
          {teaching.map((t, i) => (
            <motion.div key={i} variants={fadeItem} className="p-3 md:p-3.5 rounded-lg border mb-2.5 flex items-center gap-3"
              style={{ background: 'var(--bg-card)', borderColor: 'var(--border)' }} whileHover={{ x: 4, borderColor: 'var(--accent)' }}>
              <div className="w-[6px] h-[6px] rounded-full flex-shrink-0" style={{ background: 'var(--accent)' }} />
              <p className="font-sans text-xs md:text-sm m-0 leading-[1.55] font-medium" style={{ color: 'var(--text-secondary)' }}>{t}</p>
            </motion.div>
          ))}
        </Stagger>

        <Reveal delay={0}>
          <h2 className="font-heading text-xs md:text-sm uppercase tracking-[0.18em] mb-6 font-semibold" style={{ color: 'var(--text-muted)' }}>{t.about.recognition}</h2>
        </Reveal>
        <div className="flex flex-col gap-3 mb-14">
          {achievements.map((a, i) => <RecognitionCard key={i} {...a} index={i} />)}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-14">
          <Stagger>
            <Reveal delay={0}><h2 className="font-heading text-xs md:text-sm uppercase tracking-[0.18em] mb-4 font-semibold" style={{ color: 'var(--text-muted)' }}>{t.about.education}</h2></Reveal>
            <motion.div variants={fadeItem} className="p-4 rounded-lg border" style={{ background: 'var(--bg-card)', borderColor: 'var(--border)' }} whileHover={{ scale: 1.01, borderColor: 'var(--accent)' }}>
              <p className="font-heading text-sm font-semibold m-0" style={{ color: 'var(--text)' }}>{t.about.educationDegree}</p>
              <p className="font-sans text-xs m-0 mt-1" style={{ color: 'var(--text-secondary)' }}>{t.about.educationSchool}</p>
            </motion.div>
          </Stagger>
          <Stagger>
            <Reveal delay={0}><h2 className="font-heading text-xs md:text-sm uppercase tracking-[0.18em] mb-4 font-semibold" style={{ color: 'var(--text-muted)' }}>{t.about.languages}</h2></Reveal>
            <motion.div variants={fadeItem} className="p-4 rounded-lg border flex gap-6 flex-wrap" style={{ background: 'var(--bg-card)', borderColor: 'var(--border)' }} whileHover={{ scale: 1.01, borderColor: 'var(--accent)' }}>
              {t.about.languagesList.map(({ name, level }) => (
                <div key={name}>
                  <p className="font-heading text-sm font-semibold m-0" style={{ color: 'var(--text)' }}>{name}</p>
                  <p className="font-sans text-xs m-0 mt-0.5 font-medium" style={{ color: 'var(--text-secondary)' }}>{level}</p>
                </div>
              ))}
            </motion.div>
          </Stagger>
        </div>

    </div>

      {/* ── CLOSING: full-width photo + info + CTA ── */}
      <div className="w-full flex justify-center px-5 md:px-6 mt-14 mb-16 md:mb-20">
        <div className="flex flex-col md:flex-row md:items-center md:gap-10">
          {/* Photo */}
          <motion.div className="relative rounded-xl overflow-hidden w-[140px] md:w-[200px] mx-auto flex-shrink-0 mb-5 md:mb-0 cursor-pointer"
            style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: false, margin: '-100px' }}
            transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
            onMouseEnter={() => setImgHover(true)} onMouseLeave={() => setImgHover(false)}>
            <div className="relative w-full aspect-[3/4] overflow-hidden rounded-t-xl">
              <motion.div className="absolute inset-0"
                animate={{ filter: imgHover ? 'grayscale(0%) brightness(1)' : 'grayscale(100%) brightness(0.7)' }}
                transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}>
                <Image src="/images/perfil.png" alt="Tony" fill className="object-cover" sizes="200px" priority />
              </motion.div>
              <motion.div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, var(--accent-dim) 0%, transparent 60%)' }}
                initial={{ opacity: 0 }} animate={{ opacity: imgHover ? 1 : 0 }} transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }} />
            </div>
            <div className="p-2 text-center">
              <p className="font-sans text-[11px] italic m-0 font-medium" style={{ color: 'var(--text-muted)' }}>{t.about.alwaysLearning}</p>
            </div>
          </motion.div>

          {/* Info + CTA */}
          <div className="flex-1 text-center">
            <Stagger>
              <motion.h2 variants={fadeItem} className="font-heading text-[clamp(28px,4vw,42px)] font-bold leading-[1.0] m-0 tracking-tight" style={{ color: 'var(--text)' }}>
                <span style={{ color: 'var(--accent)' }}>TONY</span> DARKO
              </motion.h2>
              <motion.p variants={fadeItem} className="font-sans text-xs md:text-sm font-medium mt-2" style={{ color: 'var(--text-secondary)' }}>
                3D Motion Designer  ·  CGI Generalist
              </motion.p>
              <motion.div variants={fadeItem} className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 mt-2 text-xs md:text-sm" style={{ color: 'var(--accent)' }}>
                <span>hello@tonydarko.work</span>
                <span style={{ color: 'var(--text-muted)' }}>|</span>
                <a href="https://t.me/Tonydarko98" target="_blank" rel="noopener noreferrer" className="no-underline" style={{ color: 'var(--accent)' }}>Telegram: @tonydarko98</a>
              </motion.div>
            </Stagger>
            <motion.div className="mt-5" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false, margin: '-50px' }} transition={{ duration: 0.5 }}>
              <TransitionLink href="/work" className="inline-block rounded-md px-6 py-3 font-heading font-bold text-sm no-underline"
                style={{ background: 'var(--accent)', color: 'var(--button-text)' }}>
                See Portfolio →
              </TransitionLink>
            </motion.div>
          </div>
        </div>
      </div>

    </motion.div>
  )
}
