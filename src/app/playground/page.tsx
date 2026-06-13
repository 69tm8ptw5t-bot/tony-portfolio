'use client'

import { useRef, useState, useEffect } from 'react'
import { useLang } from '@/components/LanguageProvider'

const VIDEO_SRCS = [
  '/videos/playground0.webm',
  '/videos/playground1.webm',
  '/videos/playground3.webm',
  '/videos/playground4.webm',
  '/videos/playground5.webm',
  '/videos/playground6.webm',
  '/videos/playground7.webm',
  '/videos/playground8.webm',
]

export default function PlaygroundPage() {
  const { t } = useLang()
  const videoRefs = useRef<Map<string, HTMLVideoElement>>(new Map())
  const [playing, setPlaying] = useState<Map<string, boolean>>(new Map())

  const togglePlay = (src: string) => {
    const v = videoRefs.current.get(src)
    if (!v) return
    if (v.paused) {
      v.play()
      setPlaying(new Map(playing.set(src, true)))
    } else {
      v.pause()
      setPlaying(new Map(playing.set(src, false)))
    }
  }

  return (
    <div style={{ minHeight: '100vh', paddingTop: 'clamp(72px, 12vh, 120px)' }}>
      <h2
        className="font-heading text-[22px] md:text-[22px] uppercase tracking-[0.2em] text-center"
        style={{ color: 'var(--text-muted)', margin: '0 0 32px 0' }}
      >
        {t.playground.title}
      </h2>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 480px), 1fr))',
          gap: '24px',
          maxWidth: '1400px',
          margin: '0 auto',
          padding: '0 16px 80px',
        }}
      >
        {VIDEO_SRCS.map((src, i) => (
          <div
            key={src}
            className="rounded-xl overflow-hidden"
            style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border)',
            }}
          >
            <div
              className="relative cursor-pointer"
              style={{ aspectRatio: '16 / 9' }}
              onClick={() => togglePlay(src)}
            >
              <video
                ref={(el) => { if (el) videoRefs.current.set(src, el) }}
                src={src}
                playsInline
                preload="metadata"
                className="absolute inset-0 w-full h-full"
                style={{ objectFit: 'cover' }}
                controlsList="nodownload"
                disablePictureInPicture
                onContextMenu={(e) => e.preventDefault()}
                onEnded={() => setPlaying(new Map(playing.set(src, false)))}
              >
                <source src={src} type="video/webm" />
              </video>

              {!playing.get(src) && (
                <div
                  className="absolute inset-0 flex items-center justify-center"
                  style={{ background: 'rgba(0,0,0,0.3)' }}
                >
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center"
                    style={{ background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(4px)' }}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
                      <polygon points="6 3 20 12 6 21 6 3" />
                    </svg>
                  </div>
                </div>
              )}
            </div>

            <div style={{ padding: '12px 16px' }}>
              <h3
                className="font-heading text-xs uppercase tracking-[0.15em]"
                style={{ color: 'var(--text)', margin: 0 }}
              >
                {t.playground.videos[i]}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}