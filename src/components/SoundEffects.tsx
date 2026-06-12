'use client'

import { useEffect, useRef } from 'react'

export default function SoundEffects() {
  const hoverAudioRef = useRef<HTMLAudioElement | null>(null)
  const clickAudioRef = useRef<HTMLAudioElement | null>(null)
  const lastHoverTargetRef = useRef<EventTarget | null>(null)

  useEffect(() => {
    hoverAudioRef.current = new Audio('/music/tick_001.ogg')
    clickAudioRef.current = new Audio('/music/switch_006.ogg')

    const hoverAudio = hoverAudioRef.current
    const clickAudio = clickAudioRef.current

    hoverAudio.volume = 0.15
    clickAudio.volume = 0.2

    const playHover = () => {
      hoverAudio.currentTime = 0
      hoverAudio.play().catch(() => {})
    }

    const playClick = () => {
      clickAudio.currentTime = 0
      clickAudio.play().catch(() => {})
    }

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const interactive = target.closest('a, button, [role="button"]')
      if (!interactive) {
        lastHoverTargetRef.current = null
        return
      }
      if (interactive === lastHoverTargetRef.current) return
      lastHoverTargetRef.current = interactive
      playHover()
    }

    const onClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (target.closest('a, button, [role="button"]')) {
        playClick()
      }
    }

    document.addEventListener('mouseover', onMouseOver)
    document.addEventListener('click', onClick)

    return () => {
      document.removeEventListener('mouseover', onMouseOver)
      document.removeEventListener('click', onClick)
      hoverAudio.src = ''
      clickAudio.src = ''
    }
  }, [])

  return null
}