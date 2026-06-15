'use client'

import { useRef, useState, useEffect } from 'react'

const TOTAL = 11

// These lazy-loaded references will be populated only on the client
let SwiperModule: any = null
let SwiperSlideModule: any = null
let NavigationModule: any = null
let MousewheelModule: any = null
let EffectCreativeModule: any = null

async function ensureSwiper() {
  if (typeof window === 'undefined' || SwiperModule) return

  const swiperReact = await import('swiper/react')
  const swiperMods = await import('swiper/modules')
  await import('swiper/css')
  await import('swiper/css/navigation')
  await import('swiper/css/effect-creative')

  SwiperModule = swiperReact.Swiper
  SwiperSlideModule = swiperReact.SwiperSlide
  NavigationModule = swiperMods.Navigation
  MousewheelModule = swiperMods.Mousewheel
  EffectCreativeModule = swiperMods.EffectCreative
}

function buildVideos(): string[] {
  const rest = [1,2,3,4,5,6,7,8,9,10,11]
  for (let i = rest.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [rest[i], rest[j]] = [rest[j], rest[i]]
  }
  const ts = Date.now()
  return rest.map(n => `/videos/IA-video-${n}.webm?t=${ts}`)
}

export default function IaVideoCarouselSwiper() {
  const swiperRef = useRef<any>(null)
  const videoRefs = useRef<Map<string, HTMLVideoElement>>(new Map())
  const [activeIdx, setActiveIdx] = useState(0)
  const [winW, setWinW] = useState(1024)
  const [ready, setReady] = useState(false)
  const [videos] = useState(() => buildVideos())
  const userInteracted = useRef(false)
  const isLoading = !ready || !SwiperModule
  const isDesktop = winW >= 1024
  const isWide = winW >= 1440
  const isMobile = winW < 640
  const cardWidth = isDesktop ? 312 : isMobile ? 265 : 331
  const N = videos.length

  useEffect(() => {
    setWinW(window.innerWidth)
    ensureSwiper().then(() => setReady(true))

    let t: ReturnType<typeof setTimeout>
    const r = () => { clearTimeout(t); t = setTimeout(() => setWinW(window.innerWidth), 80) }
    window.addEventListener('resize', r)
    return () => { window.removeEventListener('resize', r) }
  }, [])

  // Manage all videos: play active with volume, keep inactive loaded but paused
  useEffect(() => {
    videoRefs.current.forEach((v, src) => {
      const idx = videos.indexOf(src)
      const isActive = idx === activeIdx
      if (isActive) {
        v.muted = false
        v.volume = 0.12
        v.play().catch(() => {})
      } else {
        v.pause()
        if (v.readyState >= 1) v.currentTime = 0
      }
    })
  }, [activeIdx, videos])

  // Preload all videos so frames are always visible
  useEffect(() => {
    const timer = setTimeout(() => {
      videoRefs.current.forEach((v) => {
        if (v.readyState < 2) {
          v.preload = 'auto'
          v.load()
        }
      })
    }, 500)
    return () => clearTimeout(timer)
  }, [])

  // Auto-advance on video end
  useEffect(() => {
    const activeSrc = videos[activeIdx]
    if (!activeSrc) return
    const video = videoRefs.current.get(activeSrc)
    if (!video) return
    const onEnded = () => {
      if (swiperRef.current && !swiperRef.current.destroyed) swiperRef.current.slideNext()
    }
    video.addEventListener('ended', onEnded)
    return () => { video.removeEventListener('ended', onEnded) }
  }, [activeIdx, videos])

  const onSlideChange = (swiper: any) => {
    userInteracted.current = true
    setActiveIdx(swiper.realIndex)
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center w-full min-h-[50dvh]" style={{ color: 'var(--text-muted)' }} role="status" aria-label="Loading carousel">
        <div className="flex flex-col items-center gap-3">
          <div className="w-6 h-6 rounded-full border-2 border-t-transparent animate-spin"
            style={{ borderColor: 'var(--border)', borderTopColor: 'var(--accent)' }} />
          <span className="text-xs font-sans">Loading…</span>
        </div>
      </div>
    )
  }

  const Swiper = SwiperModule
  const SwiperSlide = SwiperSlideModule

  return (
    <div className="relative w-full flex items-center justify-center" style={{ height: '100%' }}>
      <div className="relative w-full h-full mx-auto flex items-center">
        <Swiper
          modules={[NavigationModule, MousewheelModule, EffectCreativeModule]}
          loop={true}
          centeredSlides={true}
          slidesPerView={isWide ? 5 : isDesktop ? 3.5 : isMobile ? 1.15 : 2.2}
          spaceBetween={isWide ? 2 : isDesktop ? 1 : 0}
          grabCursor={true}
          navigation={true}
          mousewheel={{ forceToAxis: false, sensitivity: 1.5, releaseOnEdges: true }}
          direction="horizontal"
          creativeEffect={{
            prev: { translate: ['-25%', 0, -250], rotate: [0, -12, 0], scale: 0.85, opacity: 0.35 },
            next: { translate: ['25%', 0, -250], rotate: [0, 12, 0], scale: 0.85, opacity: 0.35 },
          }}
          onSwiper={(s: any) => { swiperRef.current = s }}
          onSlideChange={onSlideChange}
          breakpoints={{
            640: { slidesPerView: 2.2, spaceBetween: 3, creativeEffect: { prev: { translate: ['-15%', 0, -160], rotate: [0, -8, 0], scale: 0.92, opacity: 0.35 }, next: { translate: ['15%', 0, -160], rotate: [0, 8, 0], scale: 0.92, opacity: 0.35 } } },
            1024: { slidesPerView: 3.5, spaceBetween: 1, creativeEffect: { prev: { translate: ['-5%', 0, -120], rotate: [0, -2, 0], scale: 0.94, opacity: 0.35 }, next: { translate: ['5%', 0, -120], rotate: [0, 2, 0], scale: 0.94, opacity: 0.35 } } },
            1440: { slidesPerView: 5, spaceBetween: 2, creativeEffect: { prev: { translate: ['-4%', 0, -100], rotate: [0, -1.5, 0], scale: 0.95, opacity: 0.35 }, next: { translate: ['4%', 0, -100], rotate: [0, 1.5, 0], scale: 0.95, opacity: 0.35 } } },
          }}
          className="project-carousel-swiper"
          style={{ paddingBottom: isDesktop ? '4px' : '32px' }}
        >
          {videos.map((src, idx) => (
            <SwiperSlide key={src}>
              {({ isActive: slideActive }: { isActive: boolean }) => (
                <div
                  className="relative rounded-2xl overflow-hidden mx-auto"
                  style={{
                    width: '100%',
                    maxWidth: `${cardWidth}px`,
                    aspectRatio: '9 / 16',
                    background: 'var(--bg-card)',
                    border: `1px solid ${slideActive ? 'var(--accent)' : 'rgba(255,255,255,0.04)'}`,
                    boxShadow: slideActive ? '0 0 0 1px var(--accent), 0 0 20px var(--accent-glow-strong)' : 'var(--card-shadow)',
                    transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
                  }}
                >
                  <video
                    ref={(el) => { if (el) videoRefs.current.set(src, el) }}
                    src={src}
                    loop
                    playsInline
                    preload="auto"
                    className="absolute inset-0 w-full h-full object-cover rounded-2xl"
                    style={{
                      filter: slideActive ? 'none' : 'grayscale(100%)',
                      transition: 'filter 0.5s ease',
                    }}
                    controlsList="nodownload"
                    disablePictureInPicture
                    onContextMenu={(e) => e.preventDefault()}
                  >
                    <source src={src} type="video/webm" />
                  </video>
                </div>
              )}
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  )
}