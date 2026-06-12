'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import type { Project } from '@/data/projects'

export default function ProjectDetail({ project }: { project: Project }) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    setTimeout(() => setVisible(true), 40)
    window.scrollTo(0, 0)
  }, [])

  const processSteps = ['Blockout / Pre-viz', 'Lighting Test', 'Final Composite']

  return (
    <div
      className="min-h-screen pt-14 md:pt-16"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'none' : 'translateY(16px)',
        transition: 'all 0.4s ease',
      }}
    >
      <div className="max-w-full md:max-w-[920px] mx-auto px-4 md:px-6 py-8 md:py-12">
        <Link
          href="/work"
          className="inline-block border rounded-md px-3 md:px-[18px] py-1.5 md:py-2 font-sans text-xs md:text-sm no-underline mb-8 md:mb-12"
          style={{ borderColor: 'var(--border)', color: 'var(--text-secondary)' }}
        >
          ← Back to work
        </Link>

        <div className="flex justify-center mb-3 md:mb-4">
          <div
            className="inline-block rounded px-2 md:px-3 py-0.5 md:py-1 text-[11px] md:text-xs uppercase tracking-[0.12em]"
            style={{
              background: `${project.color}1A`,
              border: `1px solid ${project.color}44`,
              color: project.color,
            }}
          >
            {project.category}
          </div>
        </div>

        <h1 className="font-heading text-[clamp(22px,5vw,44px)] font-bold m-0 mb-2 md:mb-3 leading-[1.07]"
            style={{ color: 'var(--text)' }}>
          {project.title}
        </h1>
        <p className="font-sans text-xs md:text-sm mb-8 md:mb-11"
           style={{ color: 'var(--accent)' }}>{project.metric}</p>

        {/* Main video — hidden for michicanos (moved into vertical grid) */}
        {project.videoIndex !== 1 && (
          <div
            className="w-full aspect-video rounded-xl mb-6 md:mb-8 relative overflow-hidden border"
            style={{
              background: `linear-gradient(135deg, ${project.color}18 0%, #111 100%)`,
              borderColor: 'var(--border)',
            }}
          >
            <video
              src={`/videos/video${project.videoIndex}.mp4`}
              controls
              muted
              autoPlay
              loop
              playsInline
              preload="metadata"
              className="absolute inset-0 w-full h-full object-cover"
              style={{ background: '#000' }}
            />
          </div>
        )}

        {/* Vertical videos — michicanos uses the horizontal video in slot 1 */}
        {(project.videoIndex === 1) && (
          <div className="grid grid-cols-3 gap-3 md:gap-4 mb-8 md:mb-11">
            {[0, 1, 2].map((i) => (
              <div key={i}
                className="aspect-[9/16] rounded-xl relative overflow-hidden border"
                style={{ background: '#000', borderColor: 'var(--border)' }}
              >
                <video
                  src={i === 0 ? `/videos/video${project.videoIndex}.mp4` : `/videos/video${project.videoIndex}-${i}.mp4`}
                  controls
                  muted
                  autoPlay
                  loop
                  playsInline
                  preload="metadata"
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        )}

        {/* Description + Tools */}
        <div className="grid grid-cols-1 md:grid-cols-[1fr_240px] gap-8 md:gap-11 mb-10 md:mb-12">
          <div>
            <h2 className="font-heading text-base md:text-lg mb-3 md:mb-3.5"
                style={{ color: 'var(--text)' }}>
              About this project
            </h2>
            <p className="font-sans text-sm md:text-[15px] leading-[1.7] md:leading-[1.78] m-0"
               style={{ color: 'var(--text-secondary)' }}>
              {project.desc}
            </p>
            {project.aiDisclosure && (
              <div className="mt-4 md:mt-5 px-4 md:px-[18px] py-3 md:py-3.5 rounded-r-lg"
                style={{ borderLeft: '3px solid var(--accent)', background: 'var(--accent-dim)' }}>
                <p className="font-sans text-xs md:text-sm m-0 leading-[1.6] md:leading-[1.65]"
                   style={{ color: 'var(--text-secondary)' }}>
                  <span style={{ color: 'var(--accent)' }}>AI disclosure: </span>
                  AI-assisted texture generation via Midjourney — all modeling, lighting, rigging, and compositing by me.
                </p>
              </div>
            )}
          </div>

          <div>
            <h2 className="font-heading text-xs md:text-sm mb-3 md:mb-4 uppercase tracking-[0.14em]"
                style={{ color: 'var(--text-muted)' }}>
              Tools used
            </h2>
            <div className="flex flex-col gap-2 md:gap-2.5">
              {project.tools.map((tool) => (
                <div key={tool} className="flex items-center gap-2 md:gap-2.5 font-sans text-sm"
                     style={{ color: 'var(--text)' }}>
                  <div className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                       style={{ background: project.color }} />
                  {tool}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* BREAKDOWN */}
        {project.breakdown && project.breakdown.length > 0 && (
          <>
            <div className="mb-10 md:mb-12">
              <div className="flex items-center gap-3 md:gap-4 mb-6 md:mb-8">
                <h2 className="font-heading text-base md:text-lg m-0"
                    style={{ color: 'var(--text)' }}>
                  Process Breakdown
                </h2>
                <div className="flex-1 h-px" style={{ background: 'var(--border)' }} />
              </div>

              <div className="flex flex-col gap-8 md:gap-10">
                {project.breakdown.map((item, i) => (
                  <div key={i} className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-start">
                    <div className={`relative w-full aspect-[4/3] rounded-lg overflow-hidden border ${
                      i % 2 === 1 ? 'md:order-last' : ''
                    }`}
                      style={{ background: 'var(--bg-card)', borderColor: 'var(--border)' }}>
                      <div className="absolute inset-0 flex items-center justify-center flex-col gap-2 md:gap-3">
                        <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg"
                             style={{ background: `${project.color}22` }} />
                        <span className="font-sans text-xs" style={{ color: 'var(--text-muted)' }}>
                          {item.alt}
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-col gap-2 md:gap-3">
                      <div className="flex items-center gap-2 md:gap-3">
                        <span className="w-6 h-6 md:w-7 md:h-7 rounded-full flex items-center justify-center text-[10px] md:text-[11px] font-bold font-heading"
                              style={{ background: project.color, color: 'var(--button-text)' }}>
                          {i + 1}
                        </span>
                        <h3 className="font-heading text-sm md:text-base m-0"
                            style={{ color: 'var(--text)' }}>
                          {item.title}
                        </h3>
                      </div>
                      <p className="font-sans text-xs md:text-sm leading-[1.6] md:leading-[1.7] m-0"
                         style={{ color: 'var(--text-secondary)' }}>
                        {item.text}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="h-px mb-8 md:mb-12" style={{ background: 'var(--border)' }} />
          </>
        )}

        {/* Process */}
        <h2 className="font-heading text-base md:text-lg mb-4 md:mb-[18px]"
            style={{ color: 'var(--text)' }}>Process</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-12 md:mb-16">
          {processSteps.map((step) => (
            <div key={step} className="h-[140px] md:h-[160px] rounded-lg flex flex-col items-center justify-center gap-2 border"
              style={{ background: 'var(--bg-card)', borderColor: 'var(--border)' }}>
              <div className="w-6 h-6 md:w-7 md:h-7 rounded" style={{ background: 'var(--border)' }} />
              <span className="font-sans text-xs md:text-sm" style={{ color: 'var(--text-muted)' }}>{step}</span>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="border-t pt-8 md:pt-10 flex flex-col md:flex-row items-center justify-between gap-4 md:gap-5"
          style={{ borderColor: 'var(--border)' }}>
          <div className="text-center md:text-left">
            <p className="font-heading text-lg md:text-[22px] m-0 mb-1"
               style={{ color: 'var(--text)' }}>
              Available for work
            </p>
            <p className="font-sans text-sm m-0"
               style={{ color: 'var(--text-secondary)' }}>
              Remote
            </p>
          </div>
          <a href="/showreel"
            className="rounded-md px-6 md:px-7 py-3 md:py-3.5 font-heading font-bold text-sm no-underline"
            style={{ background: 'var(--accent)', color: 'var(--button-text)' }}>
            Let's talk →
          </a>
        </div>
      </div>
    </div>
  )
}