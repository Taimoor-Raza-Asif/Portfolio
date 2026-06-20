'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { personalInfo } from '@/lib/data'
import ParticleBackground from '@/components/ui/ParticleBackground'

// ── Typewriter hook ───────────────────────────────────────────────────────────
function useTypewriter(words: string[], speed = 80, pause = 1800) {
  const [index, setIndex] = useState(0)
  const [subIndex, setSubIndex] = useState(0)
  const [deleting, setDeleting] = useState(false)
  const [text, setText] = useState('')

  useEffect(() => {
    if (!deleting && subIndex === words[index].length) {
      const t = setTimeout(() => setDeleting(true), pause)
      return () => clearTimeout(t)
    }
    if (deleting && subIndex === 0) {
      setDeleting(false)
      setIndex((prev) => (prev + 1) % words.length)
      return
    }
    const t = setTimeout(
      () => {
        setText(words[index].substring(0, subIndex + (deleting ? -1 : 1)))
        setSubIndex((prev) => prev + (deleting ? -1 : 1))
      },
      deleting ? speed / 2 : speed
    )
    return () => clearTimeout(t)
  }, [subIndex, deleting, index, words, speed, pause])

  return text
}

// ── Framer variants ───────────────────────────────────────────────────────────
const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
}
const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
}

// ── Profile photo with rotating ring ─────────────────────────────────────────
function ProfilePhoto() {
  const [imgError, setImgError] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, x: 60 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flex: '0 0 40%',
        position: 'relative',
      }}
    >
      {/* Outer rotating dashed ring */}
      <div
        className="spin-slow"
        style={{
          position: 'absolute',
          width: 360,
          height: 360,
          borderRadius: '50%',
          border: '1px dashed rgba(34,211,238,0.2)',
          pointerEvents: 'none',
        }}
      />

      {/* Inner counter-rotating ring */}
      <div
        className="spin-reverse"
        style={{
          position: 'absolute',
          width: 290,
          height: 290,
          borderRadius: '50%',
          border: '0.5px dashed rgba(129,140,248,0.15)',
          pointerEvents: 'none',
        }}
      />

      {/* Outer glow backdrop */}
      <div
        style={{
          position: 'absolute',
          width: 340,
          height: 340,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(34,211,238,0.08) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      {/* Photo container */}
      <motion.div
        whileHover={{ scale: 1.03 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        style={{
          position: 'relative',
          width: 320,
          height: 320,
          borderRadius: '50%',
          overflow: 'hidden',
          border: '2px solid rgba(34,211,238,0.4)',
          boxShadow: '0 0 40px rgba(34,211,238,0.15), 0 0 80px rgba(34,211,238,0.08)',
          flexShrink: 0,
        }}
      >
        {!imgError ? (
          <Image
            src="/images/profile.png"
            alt="Taimoor Raza Asif — AI Engineer"
            width={320}
            height={320}
            priority
            style={{ objectFit: 'cover', width: '100%', height: '100%' }}
            onError={() => setImgError(true)}
          />
        ) : (
          /* Fallback placeholder if image not yet placed */
          <div
            style={{
              width: '100%',
              height: '100%',
              background: 'linear-gradient(135deg, #0d1520 0%, #0a1628 100%)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
            }}
          >
            <span style={{ fontSize: '3rem' }}>👤</span>
            <span
              style={{
                fontFamily: '"JetBrains Mono", monospace',
                fontSize: '0.6rem',
                color: '#475569',
                letterSpacing: '1px',
                textAlign: 'center',
                padding: '0 1rem',
              }}
            >
              Place photo at
              <br />
              /public/images/portfolio_pic.png
            </span>
          </div>
        )}

        {/* Cyan overlay gradient at bottom */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '40%',
            background: 'linear-gradient(to bottom, transparent, rgba(8,11,20,0.3))',
            pointerEvents: 'none',
          }}
        />
      </motion.div>

      {/* Floating dot decorations */}
      {[
        { top: '10%', right: '8%', size: 6, delay: 0 },
        { top: '75%', left: '5%', size: 4, delay: 1.5 },
        { top: '40%', right: '2%', size: 5, delay: 0.8 },
      ].map((dot, i) => (
        <motion.div
          key={i}
          animate={{ y: [0, -8, 0], opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 3 + i, delay: dot.delay, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            position: 'absolute',
            top: dot.top,
            right: (dot as { right?: string }).right,
            left: (dot as { left?: string }).left,
            width: dot.size,
            height: dot.size,
            borderRadius: '50%',
            backgroundColor: '#22d3ee',
            boxShadow: '0 0 8px rgba(34,211,238,0.6)',
            pointerEvents: 'none',
          }}
        />
      ))}
    </motion.div>
  )
}

// ── Hero ──────────────────────────────────────────────────────────────────────
export default function Hero() {
  const role = useTypewriter(personalInfo.roles)

  return (
    <section
      id="hero"
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
        backgroundColor: '#080b14',
      }}
    >
      {/* Grid background */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'linear-gradient(rgba(34,211,238,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(34,211,238,0.04) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
          zIndex: 0,
        }}
      />

      {/* Radial glow */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(34,211,238,0.1) 0%, transparent 65%)',
          zIndex: 0,
        }}
      />

      {/* Particles */}
      <ParticleBackground />

      {/* Scanline sweep */}
      <div className="scanline" />

      {/* Content wrapper — 2-column layout */}
      <div
        className="hero-content-wrapper"
        style={{
          position: 'relative',
          zIndex: 1,
          maxWidth: '1100px',
          margin: '0 auto',
          padding: '8rem 1.5rem 6rem',
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          gap: '2rem',
        }}
      >
        {/* ── LEFT COLUMN: 60% — all existing hero content ──────────────── */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="hero-left-col"
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1.5rem',
            flex: '0 0 58%',
            minWidth: 0,
          }}
        >
          {/* Available badge */}
          <motion.div variants={itemVariants}>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.6rem',
                backgroundColor: 'rgba(34,211,238,0.06)',
                border: '0.5px solid rgba(34,211,238,0.25)',
                borderRadius: '999px',
                padding: '0.35rem 0.9rem',
              }}
            >
              <span style={{ position: 'relative', display: 'flex' }}>
                <span
                  className="ping-slow"
                  style={{
                    position: 'absolute',
                    inset: 0,
                    borderRadius: '50%',
                    backgroundColor: '#22c55e',
                    opacity: 0.75,
                  }}
                />
                <span style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: '#22c55e', display: 'block' }} />
              </span>
              <span
                style={{
                  fontFamily: '"JetBrains Mono", monospace',
                  fontSize: '0.7rem',
                  color: '#22d3ee',
                  letterSpacing: '1.5px',
                }}
              >
                AVAILABLE FOR WORK
              </span>
            </div>
          </motion.div>

          {/* Greeting + Name */}
          <motion.div variants={itemVariants} style={{ position: 'relative' }}>
            {/* Large watermark monogram behind the name */}
            <div
              aria-hidden="true"
              style={{
                position: 'absolute',
                top: '50%',
                left: '-0.5rem',
                transform: 'translateY(-50%)',
                fontSize: 'clamp(6rem, 14vw, 10rem)',
                fontWeight: 900,
                fontFamily: '"JetBrains Mono", monospace',
                color: 'transparent',
                WebkitTextStroke: '1px rgba(34,211,238,0.08)',
                letterSpacing: '-4px',
                lineHeight: 1,
                pointerEvents: 'none',
                userSelect: 'none',
                whiteSpace: 'nowrap',
                zIndex: 0,
              }}
            >
              TRA
            </div>

            <p
              style={{
                position: 'relative',
                zIndex: 1,
                fontFamily: '"JetBrains Mono", monospace',
                fontSize: '0.85rem',
                color: '#22d3ee',
                letterSpacing: '2px',
                marginBottom: '0.25rem',
              }}
            >
              // Hi, I&apos;m
            </p>
            <h1
              style={{
                position: 'relative',
                zIndex: 1,
                fontSize: 'clamp(2.4rem, 5.5vw, 4.25rem)',
                fontWeight: 800,
                lineHeight: 1.05,
                letterSpacing: '-2px',
                color: '#f1f5f9',
              }}
            >
              Taimoor{' '}
              <motion.span
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8, duration: 0.5 }}
                className="flicker"
                style={{ color: '#22d3ee', textShadow: '0 0 30px rgba(34,211,238,0.4)', display: 'inline-block' }}
              >
                Raza
              </motion.span>{' '}
              Asif
            </h1>
          </motion.div>

          {/* Typewriter role */}
          <motion.div variants={itemVariants} style={{ height: '2rem' }}>
            <span
              style={{
                fontFamily: '"JetBrains Mono", monospace',
                fontSize: 'clamp(0.9rem, 2vw, 1.2rem)',
                color: '#94a3b8',
              }}
            >
              &gt;{' '}
              <span style={{ color: '#22d3ee' }}>{role}</span>
              <span
                style={{
                  display: 'inline-block',
                  width: '2px',
                  height: '1.1em',
                  backgroundColor: '#22d3ee',
                  marginLeft: '2px',
                  verticalAlign: 'text-bottom',
                  animation: 'blink 1s step-end infinite',
                }}
              />
            </span>
          </motion.div>

          {/* Bio */}
          <motion.p
            variants={itemVariants}
            style={{ fontSize: '1rem', color: '#94a3b8', lineHeight: 1.75, maxWidth: '520px' }}
          >
            {personalInfo.bio}
          </motion.p>

          {/* CTA buttons */}
          <motion.div variants={itemVariants} style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <a
              href="#projects"
              id="hero-view-projects"
              className="btn-press"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                backgroundColor: '#22d3ee', color: '#080b14',
                fontWeight: 700, fontSize: '0.85rem', letterSpacing: '0.5px',
                padding: '0.75rem 2rem', borderRadius: '6px', textDecoration: 'none',
                transition: 'all 0.2s', boxShadow: '0 0 20px rgba(34,211,238,0.3)',
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement
                el.style.boxShadow = '0 0 35px rgba(34,211,238,0.5)'
                el.style.transform = 'translateY(-2px)'
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement
                el.style.boxShadow = '0 0 20px rgba(34,211,238,0.3)'
                el.style.transform = 'translateY(0)'
              }}
            >
              View Projects →
            </a>
            <a
              href="/assets/TaimoorRazaAsif_AI_Engineer_Resume.pdf"
              id="hero-download-cv"
              className="btn-press"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                backgroundColor: 'transparent', color: '#22d3ee',
                fontWeight: 600, fontSize: '0.85rem', letterSpacing: '0.5px',
                padding: '0.75rem 2rem', borderRadius: '6px',
                border: '1px solid rgba(34,211,238,0.4)', textDecoration: 'none',
                transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement
                el.style.backgroundColor = 'rgba(34,211,238,0.08)'
                el.style.borderColor = 'rgba(34,211,238,0.7)'
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement
                el.style.backgroundColor = 'transparent'
                el.style.borderColor = 'rgba(34,211,238,0.4)'
              }}
            >
              Download CV
            </a>
          </motion.div>

          {/* Stats */}
          <motion.div
            variants={itemVariants}
            style={{ display: 'flex', gap: '2.5rem', paddingTop: '1rem', flexWrap: 'wrap' }}
          >
            {personalInfo.stats.map((stat) => (
              <div key={stat.label} style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                <span
                  style={{
                    fontSize: '1.75rem', fontWeight: 800, color: '#22d3ee',
                    fontFamily: '"JetBrains Mono", monospace',
                    textShadow: '0 0 20px rgba(34,211,238,0.4)',
                  }}
                >
                  {stat.value}
                </span>
                <span
                  style={{
                    fontSize: '0.75rem', color: '#475569', letterSpacing: '1px',
                    textTransform: 'uppercase', fontFamily: '"JetBrains Mono", monospace',
                  }}
                >
                  {stat.label}
                </span>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* ── RIGHT COLUMN: 40% — profile photo ─────────────────────────── */}
        <div
          className="hero-photo-col"
          style={{ flex: '0 0 42%', display: 'flex', justifyContent: 'center' }}
        >
          <ProfilePhoto />
        </div>
      </div>

      {/* Bottom fade */}
      <div
        style={{
          position: 'absolute', bottom: 0, left: 0, right: 0,
          height: '160px',
          background: 'linear-gradient(to bottom, transparent, #080b14)',
          zIndex: 1, pointerEvents: 'none',
        }}
      />

      <style>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }

        /* Mobile: stack photo above text, smaller */
        @media (max-width: 768px) {
          .hero-photo-col {
            display: none !important;
          }
        }
        @media (max-width: 640px) {
          .hero-photo-col { display: none !important; }
        }
      `}</style>
    </section>
  )
}
