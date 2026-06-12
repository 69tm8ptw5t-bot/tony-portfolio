'use client'

import { useState, useRef, useEffect } from 'react'
import CVDropdown from '@/components/CVDropdown'
import TransitionLink from '@/components/TransitionLink'

const socialLinks = [
  { name: 'LinkedIn', href: 'https://www.linkedin.com/in/antonio-cordero-4b9693235/' },
  { name: 'Telegram', href: 'https://t.me/Tonydarko98' },
  { name: 'X', href: 'https://x.com/TonyDarko_eth' },
  { name: 'YouTube', href: 'https://youtube.com/@tonydarko2195' },
]

const socialIcons: Record<string, React.ReactNode> = {
  LinkedIn: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>,
  Telegram: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21.5 2.5L2.5 10.5l7 3 3 7 9-18z"/><path d="M12 14l4-4"/></svg>,
  X: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4l11.733 16h4.267l-11.733 -16z"/><path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772"/></svg>,
  YouTube: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.94 2C5.12 20 12 20 12 20s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"/></svg>,
}

export default function Landing() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = useState(true)
  const [showControls, setShowControls] = useState(false)

  const activateVideo = () => {
    if (!videoRef.current) return
    videoRef.current.currentTime = 0
    videoRef.current.muted = true
    videoRef.current.play()
    setShowControls(true)
    if (videoRef.current.requestFullscreen) {
      videoRef.current.requestFullscreen().catch(() => {})
    }
  }

  const togglePlay = () => {
    if (!videoRef.current) return
    if (videoRef.current.paused) {
      videoRef.current.play()
      setIsPlaying(true)
    } else {
      videoRef.current.pause()
      setIsPlaying(false)
    }
  }

  const handleStop = () => {
    if (!videoRef.current) return
    videoRef.current.pause()
    videoRef.current.currentTime = 0
    setIsPlaying(false)
  }

  const handleFullscreen = () => {
    if (!videoRef.current) return
    if (videoRef.current.requestFullscreen) {
      videoRef.current.requestFullscreen()
    }
  }

  const handleVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!videoRef.current) return
    videoRef.current.volume = parseFloat(e.target.value)
  }

  return (
    <div className="min-h-dvh flex flex-col items-center justify-center relative overflow-hidden">
      <div className="relative z-10 flex flex-col items-center justify-center w-full max-w-lg mx-auto px-6 py-10 md:py-0">
        {/* Name */}
        <h1
          className="font-heading font-bold leading-[1.0] m-0 tracking-tight text-center"
          style={{ fontSize: 'clamp(42px, 8vw, 72px)', color: 'var(--text)' }}
        >
          <span style={{ color: 'var(--accent)' }}>TONY</span> DARKO
        </h1>

        {/* Tagline */}
        <p
          className="font-sans text-xs md:text-sm mt-2 mb-6 md:mb-8 text-center"
          style={{ color: 'var(--text-secondary)' }}
        >
          <TypewriterLanding />
        </p>

        {/* Video Card */}
        <div className="w-full max-w-sm mx-auto mb-5 md:mb-8">
          <div
            className="relative rounded-xl overflow-hidden border cursor-pointer group transition-all duration-300 hover:border-accent hover:shadow-[0_0_30px_var(--accent-glow-strong)]"
            style={{ borderColor: 'var(--border)', background: 'var(--bg-card)' }}
            onClick={() => { if (!showControls) activateVideo() }}
          >
            <div className="relative aspect-video">
              <video
                ref={videoRef}
                src="/videos/TonyDarkoREEL-3DMotionDesign.webm"
                className="w-full h-full object-cover"
                autoPlay
                loop
                muted
                playsInline
              />
              {!showControls && (
                <div
                  className="absolute inset-0 flex flex-col items-center justify-center gap-2 transition-all duration-300 group-hover:bg-black/30"
                  style={{ background: 'rgba(0,0,0,0.2)' }}
                >
                  <div
                    className="w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center border-2 animate-pulse-scale"
                    style={{ borderColor: 'var(--accent)', background: 'rgba(255,209,102,0.15)' }}
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="var(--accent)">
                      <polygon points="6 3 20 12 6 21 6 3" />
                    </svg>
                  </div>
                  <span className="font-heading text-xs md:text-sm font-bold uppercase tracking-[0.15em]" style={{ color: 'var(--accent)' }}>
                    Watch Reel
                  </span>
                </div>
              )}
            </div>
            {showControls && (
              <div className="flex items-center gap-2 px-3 py-2"
                style={{ background: 'var(--bg-card)', borderTop: '1px solid var(--border)' }}
                onClick={(e) => e.stopPropagation()}
              >
                <button onClick={togglePlay} className="w-7 h-7 rounded-full flex items-center justify-center border-0 cursor-pointer"
                  style={{ background: 'var(--accent-dim)', color: 'var(--accent)' }}>
                  {isPlaying ? (
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>
                  ) : (
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                  )}
                </button>
                <button onClick={handleStop} className="w-7 h-7 rounded-full flex items-center justify-center border-0 cursor-pointer"
                  style={{ background: 'var(--accent-dim)', color: 'var(--accent)' }}>
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor"><rect x="4" y="4" width="16" height="16"/></svg>
                </button>
                <button onClick={handleFullscreen} className="w-7 h-7 rounded-full flex items-center justify-center border-0 cursor-pointer"
                  style={{ background: 'var(--accent-dim)', color: 'var(--accent)' }}>
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"/></svg>
                </button>
                <div className="flex-1" />
                <input type="range" min="0" max="1" step="0.05" defaultValue="1"
                  onChange={handleVolume} className="w-16 h-1 cursor-pointer" style={{ accentColor: 'var(--accent)' }} />
              </div>
            )}
          </div>
        </div>

        {/* Link buttons */}
        <div className="w-full flex flex-col gap-2.5 max-w-sm mb-5 md:mb-8">
          <TransitionLink href="/work"
            className="w-full rounded-xl py-3 font-heading font-bold text-xs uppercase tracking-[0.15em] no-underline text-center hover:scale-[1.02] active:scale-[0.98] transition-transform duration-200"
            style={{ background: 'var(--accent)', color: 'var(--button-text)' }}>
            View Portfolio
          </TransitionLink>
          <TransitionLink href="/about"
            className="w-full rounded-xl py-3 font-heading font-bold text-xs uppercase tracking-[0.15em] no-underline text-center hover:scale-[1.02] active:scale-[0.98] transition-transform duration-200"
            style={{ border: '1px solid var(--border)', color: 'var(--text-secondary)', background: 'rgba(255,255,255,0.03)' }}>
            About Me
          </TransitionLink>
        </div>

        {/* Social icons */}
        <div className="flex items-center gap-3 mb-4 md:mb-5">
          {socialLinks.map(({ name, href }) => (
            <a key={name} href={href} target="_blank" rel="noopener noreferrer"
              className="w-9 h-9 rounded-full border flex items-center justify-center hover:scale-110 hover:border-accent hover:text-accent active:scale-90 transition-all duration-200"
              style={{ borderColor: 'var(--border)', color: 'var(--text-muted)' }}
              title={name}>
              {socialIcons[name]}
            </a>
          ))}
        </div>

        {/* CV button */}
        <div>
          <CVDropdown variant="inline" />
        </div>
      </div>
    </div>
  )
}

function TypewriterLanding() {
  const words = ['3D Generalist', 'CGI Artist']
  const [text, setText] = useState('')
  const [wordIdx, setWordIdx] = useState(0)
  const [phase, setPhase] = useState<'typing' | 'pausing' | 'deleting'>('typing')

  const word = words[wordIdx]

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>
    if (phase === 'typing' && text.length < word.length) {
      timer = setTimeout(() => setText(word.slice(0, text.length + 1)), 70)
    } else if (phase === 'typing' && text.length === word.length) {
      timer = setTimeout(() => setPhase('pausing'), 1500)
    } else if (phase === 'pausing') {
      timer = setTimeout(() => setPhase('deleting'), 10)
    } else if (phase === 'deleting' && text.length > 0) {
      timer = setTimeout(() => setText(text.slice(0, -1)), 40)
    } else if (phase === 'deleting' && text.length === 0) {
      timer = setTimeout(() => { setWordIdx((prev) => (prev + 1) % words.length); setPhase('typing') }, 300)
    }
    return () => clearTimeout(timer)
  }, [phase, text, word, word.length])

  return <span>{text}<span className="animate-pulse" style={{ color: 'var(--accent)' }}>|</span></span>
}