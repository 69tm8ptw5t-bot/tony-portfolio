'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { useLang } from './LanguageProvider'
import TransitionLink from './TransitionLink'

const socialLinks = [
  {
    name: 'LinkedIn',
    href: 'https://www.linkedin.com/in/antonio-cordero-4b9693235/',
    icon: (
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect width="4" height="12" x="2" y="9" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
  {
    name: 'Telegram',
    href: 'https://t.me/Tonydarko98',
    icon: (
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21.5 2.5L2.5 10.5l7 3 3 7 9-18z" />
        <path d="M12 14l4-4" />
      </svg>
    ),
  },
  {
    name: 'X',
    href: 'https://x.com/TonyDarko_eth',
    icon: (
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4l11.733 16h4.267l-11.733 -16z" />
        <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" />
      </svg>
    ),
  },
  {
    name: 'YouTube',
    href: 'https://youtube.com/@tonydarko2195?si=rAaRnbRfzL0mbfUW',
    icon: (
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.94 2C5.12 20 12 20 12 20s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
        <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" />
      </svg>
    ),
  },
]

const fadeUp = {
  hidden: { opacity: 0, y: 12 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, delay: 0.04 * i, ease: [0.4, 0, 0.2, 1] as const },
  }),
}

export default function Footer() {
  const { t } = useLang()

  return (
    <motion.footer className="border-t" style={{ borderColor: 'var(--border)' }}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}>
      <div className="max-w-full md:max-w-[1400px] mx-auto px-4 md:px-5vw py-3 md:py-5">
        <div className="flex flex-wrap items-start justify-between gap-2 md:gap-4 mb-3 md:mb-4">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" custom={0} viewport={{ once: true }}>
            <TransitionLink href="/" className="block no-underline">
              <Image src="/tonylogo.svg" alt="Tony" width={48} height={16}
                className="h-3.5 md:h-4 w-auto" style={{ filter: 'var(--logo-filter)' }} priority />
            </TransitionLink>
            <p className="font-sans text-[10px] md:text-xs mt-1 max-w-[140px] md:max-w-[180px] leading-[1.4]" style={{ color: 'var(--text-secondary)' }}>
              {t.footer.tagline}
            </p>
          </motion.div>

          <motion.div className="flex flex-col gap-0.5" variants={fadeUp} initial="hidden" whileInView="visible" custom={2} viewport={{ once: true }}>
            <span className="font-sans text-[9px] md:text-[10px] uppercase tracking-[0.14em] font-medium" style={{ color: 'var(--text-muted)' }}>{t.footer.contact}</span>
            <a href="mailto:hello@tonydarko.work" className="font-sans text-[10px] md:text-xs no-underline"
               style={{ color: 'var(--accent-secondary)' }}
               onMouseEnter={(e) => e.currentTarget.style.color = 'var(--accent)'}
               onMouseLeave={(e) => e.currentTarget.style.color = 'var(--accent-secondary)'}>hello@tonydarko.work</a>
            <span className="font-sans text-[10px] md:text-xs" style={{ color: 'var(--text-secondary)' }}>{t.footer.remoteAvailable}</span>
          </motion.div>

          <motion.div className="flex flex-col gap-0.5" variants={fadeUp} initial="hidden" whileInView="visible" custom={3} viewport={{ once: true }}>
            <span className="font-sans text-[9px] md:text-[10px] uppercase tracking-[0.14em] font-medium" style={{ color: 'var(--text-muted)' }}>{t.footer.social}</span>
            <div className="flex gap-1.5 md:gap-2">
              {socialLinks.map(({ name, href, icon }) => (
                <motion.a key={name} href={href} target="_blank" rel="noopener noreferrer"
                  className="w-6 h-6 md:w-7 md:h-7 rounded-md border flex items-center justify-center"
                  style={{ borderColor: 'var(--border)', color: 'var(--text-secondary)' }}
                  whileHover={{ scale: 1.15, borderColor: 'var(--accent)', color: 'var(--accent)' }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                  title={name}>{icon}</motion.a>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div className="border-t pt-2 md:pt-2.5 flex flex-col md:flex-row items-center justify-between gap-2"
          style={{ borderColor: 'var(--border)' }}
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.3 }}>
          <span className="font-sans text-[9px] md:text-[10px]" style={{ color: 'var(--text-muted)' }}>
            © {new Date().getFullYear()} {t.footer.copyright}
          </span>
        </motion.div>
      </div>
    </motion.footer>
  )
}