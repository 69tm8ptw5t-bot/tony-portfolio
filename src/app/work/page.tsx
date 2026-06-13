'use client'

import ProjectCarouselSwiper from '@/components/ProjectCarouselSwiper'
import { useLang } from '@/components/LanguageProvider'

export default function WorkPage() {
  const { t } = useLang()
  return (
    <div style={{ minHeight: '100vh' }}>
      <h2
        className="font-heading text-[22px] md:text-[22px] uppercase tracking-[0.2em] text-center"
        style={{ color: 'var(--text-muted)', paddingTop: 'clamp(72px, 12vh, 120px)', margin: 0 }}
      >
        {t.work.title}
      </h2>
      <div style={{ height: 'calc(100dvh - clamp(100px, 15vh, 155px))' }}>
        <ProjectCarouselSwiper />
      </div>
    </div>
  )
}
