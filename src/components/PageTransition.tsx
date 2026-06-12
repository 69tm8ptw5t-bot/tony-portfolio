'use client'

import { useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import gsap from 'gsap'

const LOGO_PATH_1 = "m274.47,64.22c5.72-1.73,11.43-3.47,17.15-5.2,10.57-3.21,21.15-6.43,31.73-9.63,2.73-.83,2.87-.7,2.9,2.28.02,1.66.05,3.32.03,4.97-.02,1.86.68,2.38,2.39,1.47,4.99-2.65,10.3-3.39,15.93-3.18,13.6.52,17.43,14.25,13.58,22.43-1.83,3.89-5.05,6.12-9.09,7.29-4.11,1.2-8.1.91-11.87-1.17-3.25-1.79-5.04-4.69-5.95-8.23-.61-2.36-1.3-4.69-2.05-7.01-.29-.89-.81-1.73-1.34-2.51-.19-.28-.79-.55-1.07-.45-.28.1-.39.66-.57,1.03-.03.07-.02.17-.02.26.02,6.98,0,13.96.07,20.94.03,3.3.36,6.6.37,9.89.04,16.05,0,32.11,0,48.16,0,2.52.07,5.05.04,7.57-.02,1.66.6,2.74,2.16,3.5,2.39,1.16,4.66,2.55,7.58,4.18-1.2.08-1.69.15-2.18.15-30.7,0-61.41,0-92.11-.03-7.88,0-11.54-3.06-13-10.65-.34-1.78-.96-1.4-2.04-.53-3.45,2.79-6.75,5.83-10.51,8.14-7.37,4.54-15.42,7.18-24.21,7.24-8.89.06-17.79.54-26.67.31-7.56-.19-15.14-.88-22.65-1.82-7.93-.99-15.8-2.53-23.69-3.85-.67-.11-1.31-.43-1.97-.65.45-.48.86-1,1.36-1.42,3.19-2.71,6.36-5.45,9.61-8.07,9.29-7.49,15.47-17.4,21.5-27.42,1.79-2.98,3.28-6.14,5.04-9.15,4.34-7.41,10.99-12.25,18.31-16.32,7.91-4.4,16.53-6.85,25.15-9.36,8.61-2.5,17.19-5.11,25.77-7.75.78-.24,1.39-1.04,2.08-1.58-.74-.69-1.42-1.87-2.22-1.96-1.95-.22-3.98-.12-5.93.17-8.52,1.24-15.86-.98-21.88-7.23-8.97-9.32-23.83-8.11-30.72,2.6-1.06,1.64-1.87,3.62-2.17,5.54-.93,5.95-4.47,10.09-8.86,13.73-1.37,1.13-2.89,2.09-4.14,2.98,1.65-6.77,3.73-13.43,4.8-20.25.86-5.45,2.66-10.26,6.75-13.73,3.67-3.12,7.78-5.97,12.14-7.99,8.74-4.04,18.13-5.94,27.72-6.96,10.58-1.12,21.09-.88,31.41,1.71,9.75,2.45,19.34,5.43,27.17,12.21,6.75,5.84,10.75,13.26,11.82,22.06.77,6.3,1.1,12.68,1.23,19.03.29,13.69.29,27.38.47,41.08.05,4.18.26,8.35.47,12.52.14,2.74,1.79,5.4,3.26,5.48,1.61.09,3.87-2.45,4.28-5.06.23-1.45.15-2.95.15-4.44.02-24.69-.04-49.39.09-74.08.03-5.62-1.98-9.43-7.65-11.27Zm-91.35,61.61c.08,4.9,1.26,9.02,4.19,12.5,3.56,4.24,9.2,4.92,13.26,1.53,8.25-6.91,7.41-20.83-.17-26.77-3.27-2.56-7.28-2.71-10.67-.38-4.74,3.26-6.39,8.03-6.6,13.12Z"
const LOGO_PATH_2 = "m75.07,125.61c-5.25,4.5-11.25,9.03-16.52,14.3-6.08,6.09-11.58,12.76-17.17,19.32-1.16,1.36-2.28,1.99-3.94,1.98-11.86-.04-23.72-.06-35.58-.12-.62,0-1.24-.31-1.86-.48.49-.34.94-.73,1.46-1.01,2.98-1.63,5.91-3.37,8.98-4.82,2.47-1.16,3.32-2.92,3.29-5.54-.08-6.45.02-12.91.01-19.37-.04-21.2-.12-42.39-.13-63.59,0-12.37.06-24.75.11-37.12.02-6.53.14-13.06.03-19.59-.02-1.27-.71-2.66-1.44-3.76-.76-1.13-1.94-1.99-2.95-2.95-.97-.92-1.95-1.83-2.92-2.75,1.39-.04,2.78-.11,4.17-.11,18.76.01,37.52-.07,56.28.09,13.32.11,26.12,2.6,37.87,9.29,12.84,7.3,21.82,18,27.53,31.48,6.26,14.77,8.34,30.3,8.04,46.22-.06,3.13-.43,6.26-.57,9.39-.09,1.85-.91,2.77-2.77,3.18-4.83,1.08-9.7,2.11-14.41,3.6-6.79,2.14-13.46,4.68-20.19,7.03-.46.16-.96.21-1.44.32.11-.3.18-.62.33-.9,5.02-9.33,5.67-19.19,2.64-29.11-6.57-21.52-20.69-35.63-42.48-41.79-3.31-.93-3.36-.78-3.36,2.6,0,26,0,51.99-.02,77.99,0,3.6-.05,3.83,3.52,4.46,4.6.81,9.28,1.21,13.5,1.74Z"
const LOGO_PATH_3 = "m530.67,44.31c23.06.22,40.63,6.51,54.91,20.66,9.53,9.45,14.9,21,16.15,34.52,2.44,26.21-13.85,50.42-38.64,58.52-1.74.57-3.48,1.13-5.18,1.8-3.01,1.2-6.06.57-8.97-.08-6.96-1.54-13.97-3.01-20.73-5.23-22-7.2-37.29-21.63-45.1-43.52-2.69-7.54-4.01-15.46-4.13-23.53-.07-4.6-.38-9.21-.41-13.81,0-1.03.53-2.19,1.15-3.06,5.54-7.84,12.77-13.73,21.18-18.27,9.58-5.18,22.1-8.25,29.77-8Zm16.35,82.18c.48-3.77-.81-7.23-2.95-10.41-4.3-6.39-11.53-6.72-16.44-.8-4.95,5.96-4.93,16.52.04,22.58,4.45,5.43,10.85,5.63,15.47.32,2.85-3.26,4.27-7.13,3.88-11.7Z"
const LOGO_PATH_4 = "m341.47,160.77c5.91-3.28,11.26-6.37,16.73-9.22,1.92-1,2.5-2.23,2.5-4.31-.06-23.11-.04-46.23-.04-69.34,0-8.71-.11-17.43.05-26.14.09-4.89-.98-8.83-6.15-10.53-.27-.09-.47-.4-.71-.61.46-.23.89-.53,1.37-.69,6.14-1.93,12.28-3.87,18.44-5.75,9.49-2.88,19-5.72,28.5-8.57,2.55-.77,2.66-.71,2.66,1.93,0,12.74,0,25.48,0,38.22,0,5.66.32,5.88,5.69,4.32,11.22-3.26,18.91-10.74,24.63-20.58.09-.15.2-.3.25-.46,1.59-5.47,5.96-5.84,10.56-5.7,6.09.18,12.19.55,18.28.58,2.37.01,3.24.64,3.1,3.08-.2,3.56-.09,7.14-.1,10.72,0,1.35-.37,2.08-1.85,1.22-.52-.3-1.12-.47-1.7-.67-7.17-2.5-12.82-.41-15.61,6.58-2.49,6.23-7.06,10.27-12.36,13.73-3.2,2.09-6.68,3.75-9.96,5.74-.84.51-1.38,1.53-2.06,2.32.92.47,1.81,1.27,2.77,1.37,8.66.95,17.04,2.69,24.39,7.75,7.32,5.04,11.89,12.08,15.09,20.22,3.28,8.34,3.87,17.3,6.29,25.83.9,3.18,1.59,6.43,2.73,9.52,1.67,4.51,4.72,7.68,9.72,8.5.25.04.48.21.69.35.13.08.2.24.54.66-5.17,0-10.1.13-15.02-.03-6.26-.2-12.56-.25-18.76-1.05-10.9-1.41-19.33-6.95-23.11-17.5-2.59-7.23-3.81-14.96-5.57-22.48-1.88-8.02-2.6-16.4-6.87-23.71-1.21-2.08-2.69-4.12-4.47-5.71-3.07-2.76-6.19-1.6-6.6,2.46-.48,4.76-.64,9.57-.67,14.36-.08,13.08.02,26.17-.06,39.25-.02,2.49.49,4.12,2.99,5.38,5.28,2.65,10.34,5.75,16.03,8.97h-82.34Z"

interface PageTransitionProps {
  overlayVisible: boolean
  onTransitionEnd: () => void
  targetHref: string | null
}

export default function PageTransition({ overlayVisible, onTransitionEnd, targetHref }: PageTransitionProps) {
  const router = useRouter()
  const overlayRef = useRef<HTMLDivElement>(null)
  const pathRefs = useRef<(SVGPathElement | null)[]>([null, null, null, null])
  const tlRef = useRef<gsap.core.Timeline | null>(null)

  // ── When overlay becomes visible, start the animation ──
  useEffect(() => {
    if (!overlayVisible) return
    if (!targetHref) return

    if (tlRef.current) tlRef.current.kill()

    const overlay = overlayRef.current
    const p = pathRefs.current as SVGPathElement[]
    if (!overlay || !p[0] || !p[1] || !p[2] || !p[3]) return

    gsap.set(overlay, { x: '0%', visibility: 'visible', opacity: 1 })

    // ── ENTRY: each path starts from a UNIQUE position ──
    // Path 1 (left "T"): flies in from left with rotation
    gsap.set(p[0], { x: -80, rotation: -25, scale: 0.5, opacity: 0, transformOrigin: '50% 50%' })
    // Path 2 (center): starts tiny and rotated
    gsap.set(p[1], { scale: 0, rotation: 180, opacity: 0, transformOrigin: '50% 50%' })
    // Path 3 (right "N"): flies in from right
    gsap.set(p[2], { x: 80, rotation: 25, scale: 0.5, opacity: 0, transformOrigin: '50% 50%' })
    // Path 4 (bottom base): rises from below
    gsap.set(p[3], { y: 60, scale: 0.4, skewX: 15, opacity: 0, transformOrigin: '50% 50%' })

    const tl = gsap.timeline({
      onComplete: () => {
        onTransitionEnd()
        gsap.set(overlay, { visibility: 'hidden' })
        // Clear all inline transforms so paths return to natural CSS state
        p.forEach(path => { if (path) gsap.set(path, { clearProps: 'all' }) })
      },
    })
    tlRef.current = tl

    // ── ANIMATED ENTRY (each path independent) ──
    // Path 1: swoop from left with bounce
    tl.to(p[0], {
      x: 0, rotation: 0, scale: 1, opacity: 1,
      duration: 0.55, ease: 'back.out(2.5)',
    }, 0)

    // Path 2: elastic bounce from center
    tl.to(p[1], {
      scale: 1, rotation: 0, opacity: 1,
      duration: 0.65, ease: 'elastic.out(1, 0.35)',
    }, 0.08)

    // Path 3: swoop from right
    tl.to(p[2], {
      x: 0, rotation: 0, scale: 1, opacity: 1,
      duration: 0.55, ease: 'back.out(2.5)',
    }, 0.18)

    // Path 4: rise from below
    tl.to(p[3], {
      y: 0, scale: 1, skewX: 0, opacity: 1,
      duration: 0.5, ease: 'power3.out',
    }, 0.26)

    // Brief hold — all paths fully assembled
    tl.to({}, { duration: 0.15 }, '+=0.05')

    // ── MIDPOINT: router.push ──
    tl.call(() => { router.push(targetHref) })

    // ── EXIT: all paths return to their NATURAL/REAL position smoothly ──
    // Path 1: returns from entry position to natural (0, 0, 0, 1, 1)
    tl.to(p[0], {
      x: 0, y: 0, rotation: 0, scale: 1, opacity: 1,
      duration: 0.35, ease: 'power2.out',
    }, 0)

    // Path 2: returns to natural
    tl.to(p[1], {
      scale: 1, rotation: 0, opacity: 1,
      duration: 0.35, ease: 'power2.out',
    }, 0)

    // Path 3: returns to natural
    tl.to(p[2], {
      x: 0, y: 0, rotation: 0, scale: 1, opacity: 1,
      duration: 0.35, ease: 'power2.out',
    }, 0)

    // Path 4: returns to natural
    tl.to(p[3], {
      y: 0, scale: 1, skewX: 0, opacity: 1,
      duration: 0.35, ease: 'power2.out',
    }, 0)

    // Brief hold — all paths fully assembled in their real position
    tl.to({}, { duration: 0.1 })

    // ── OVERLAY SLIDE OUT (paths stay in their natural position) ──
    tl.to(overlay, { x: '-100%', duration: 0.9, ease: 'power3.inOut' }, '-=0.1')
  }, [overlayVisible, targetHref, router, onTransitionEnd])

  return (
    <div
      ref={overlayRef}
      className={`fixed inset-0 z-50 flex items-center justify-center pointer-events-none ${
        overlayVisible ? '' : 'invisible'
      }`}
      style={{
        background: '#000',
        transform: overlayVisible ? 'translateX(0%)' : 'translateX(100%)',
      }}
    >
      <svg
        viewBox="0 0 601.98 165.53"
        className="w-[102px] md:w-[180px] h-auto"
        style={{ filter: 'var(--logo-filter)' }}
      >
        <path ref={el => { pathRefs.current[0] = el }} d={LOGO_PATH_1} fill="white" style={{ transformBox: 'fill-box', transformOrigin: 'center' }} />
        <path ref={el => { pathRefs.current[1] = el }} d={LOGO_PATH_2} fill="white" style={{ transformBox: 'fill-box', transformOrigin: 'center' }} />
        <path ref={el => { pathRefs.current[2] = el }} d={LOGO_PATH_3} fill="white" style={{ transformBox: 'fill-box', transformOrigin: 'center' }} />
        <path ref={el => { pathRefs.current[3] = el }} d={LOGO_PATH_4} fill="white" style={{ transformBox: 'fill-box', transformOrigin: 'center' }} />
      </svg>
    </div>
  )
}