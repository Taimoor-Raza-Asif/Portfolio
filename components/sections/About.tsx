'use client'

import { useEffect, useState, useRef, useCallback } from 'react'
import { motion } from 'framer-motion'
import { personalInfo } from '@/lib/data'

const sectionVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
}

// ── Role definitions ────────────────────────────────────────────────────────────
const roles = [
  {
    id: 'ai',
    title: 'AI Engineer',
    icon: '🤖',
    color: '#22d3ee',
    glow: 'rgba(34,211,238,0.18)',
    border: 'rgba(34,211,238,0.4)',
    items: [
      { key: 'stack',   val: '["RAG", "LangChain", "OpenAI"]' },
      { key: 'focus',   val: '"Intelligent Automation"' },
      { key: 'tools',   val: '["n8n", "Webhooks", "Agents"]' },
      { key: 'models',  val: '["GPT-4o", "Gemini", "Claude"]' },
      { key: 'status',  val: '"Production-ready pipelines"' },
    ],
  },
  {
    id: 'fullstack',
    title: 'Full Stack Developer',
    icon: '🖥️',
    color: '#818cf8',
    glow: 'rgba(129,140,248,0.18)',
    border: 'rgba(129,140,248,0.4)',
    items: [
      { key: 'frontend', val: '"React · Next.js · Tailwind"' },
      { key: 'backend',  val: '"Node.js · Express · REST"' },
      { key: 'db',       val: '"MongoDB · PostgreSQL · MySQL"' },
      { key: 'auth',     val: '"JWT · RBAC · Sessions"' },
      { key: 'deploy',   val: '"Vercel · GitHub Actions"' },
    ],
  },
  {
    id: 'cloud',
    title: 'Cloud Engineer',
    icon: '☁️',
    color: '#FF9900',
    glow: 'rgba(255,153,0,0.18)',
    border: 'rgba(255,153,0,0.4)',
    items: [
      { key: 'platform',  val: '"AWS (Certified Cloud Practitioner)"' },
      { key: 'compute',   val: '"EC2 · Lambda · Fargate"' },
      { key: 'storage',   val: '"S3 · RDS · DynamoDB"' },
      { key: 'security',  val: '"IAM · VPC · CloudWatch"' },
      { key: 'valid',     val: '"Jun 2029 ✓"' },
    ],
  },
]

// ── useWindowWidth hook ─────────────────────────────────────────────────────────
function useWindowWidth() {
  const [width, setWidth] = useState(1200)
  useEffect(() => {
    const update = () => setWidth(window.innerWidth)
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])
  return width
}

// ── 3-card rotating carousel ────────────────────────────────────────────────────
function RoleCarousel() {
  const [activeIdx, setActiveIdx] = useState(0)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const touchStartX = useRef<number | null>(null)
  const len = roles.length
  const winW = useWindowWidth()
  const isMobile = winW < 640

  const advance = useCallback(() => {
    setActiveIdx((prev) => (prev + 1) % len)
  }, [len])

  const retreat = useCallback(() => {
    setActiveIdx((prev) => (prev - 1 + len) % len)
  }, [len])

  // Auto-advance
  useEffect(() => {
    timerRef.current = setTimeout(advance, 3500)
    return () => { if (timerRef.current) clearTimeout(timerRef.current) }
  }, [activeIdx, advance])

  // Touch swipe
  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
  }
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return
    const delta = touchStartX.current - e.changedTouches[0].clientX
    if (Math.abs(delta) > 40) delta > 0 ? advance() : retreat()
    touchStartX.current = null
  }

  const prevIdx = (activeIdx - 1 + len) % len
  const nextIdx = (activeIdx + 1) % len
  const visibleRoles = [roles[prevIdx], roles[activeIdx], roles[nextIdx]]

  // ── MOBILE: single-card full-width view ─────────────────────────────────────
  if (isMobile) {
    const role = roles[activeIdx]
    return (
      <div
        style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.25rem' }}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <motion.div
          key={role.id}
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -40 }}
          transition={{ duration: 0.4 }}
          style={{ width: '100%' }}
        >
          <div style={{
            backgroundColor: '#0d1520',
            border: `1px solid ${role.border}`,
            borderRadius: 16,
            padding: '1.75rem',
            position: 'relative',
            overflow: 'hidden',
            boxShadow: `0 0 50px ${role.glow}, 0 12px 40px rgba(0,0,0,0.5)`,
          }}>
            {/* Glow orb */}
            <div style={{
              position: 'absolute', top: -40, right: -40, width: 180, height: 180,
              borderRadius: '50%', background: `radial-gradient(circle, ${role.glow} 0%, transparent 70%)`,
              pointerEvents: 'none',
            }} />

            {/* Icon + Title */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', marginBottom: '1.5rem' }}>
              <span style={{
                width: 50, height: 50, borderRadius: 12, flexShrink: 0,
                backgroundColor: role.glow, border: `1px solid ${role.border}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.6rem',
              }}>
                {role.icon}
              </span>
              <span style={{
                fontFamily: '"JetBrains Mono", monospace', fontSize: '0.82rem',
                color: role.color, letterSpacing: '2px', textTransform: 'uppercase', fontWeight: 700,
              }}>
                {role.title}
              </span>
            </div>

            {/* Divider */}
            <div style={{ height: '1px', background: `linear-gradient(90deg, ${role.border}, transparent)`, marginBottom: '1.25rem' }} />

            {/* Items */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              {role.items.map(({ key, val }) => (
                <div key={key} style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                  <span style={{
                    fontFamily: '"JetBrains Mono", monospace', fontSize: '0.75rem',
                    color: '#818cf8', minWidth: 80, flexShrink: 0,
                  }}>{key}:</span>
                  <span style={{
                    fontFamily: '"JetBrains Mono", monospace', fontSize: '0.75rem',
                    color: role.color, wordBreak: 'break-word',
                  }}>{val}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Dots */}
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          {roles.map((r, i) => (
            <motion.div
              key={r.id}
              animate={{ width: i === activeIdx ? 22 : 7, backgroundColor: i === activeIdx ? roles[activeIdx].color : 'rgba(148,163,184,0.3)' }}
              transition={{ duration: 0.3 }}
              style={{ height: 7, borderRadius: 999, cursor: 'pointer' }}
              onClick={() => setActiveIdx(i)}
            />
          ))}
        </div>
        <p style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '0.55rem', color: '#334155', letterSpacing: '1px' }}>
          swipe or tap dots to switch
        </p>
      </div>
    )
  }

  // ── DESKTOP: 3-card perspective carousel ────────────────────────────────────
  // Center card is 400px wide; side cards are visually tiny (scale 0.38)
  const CARD_W = 400
  const SIDE_OFFSET = 260

  return (
    <div
      style={{ position: 'relative', width: '100%', height: 510, display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {/* Fade masks */}
      <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 60, background: 'linear-gradient(to right, #080b14, transparent)', zIndex: 20, pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: 60, background: 'linear-gradient(to left, #080b14, transparent)', zIndex: 20, pointerEvents: 'none' }} />

      {visibleRoles.map((role, i) => {
        const isCenter = i === 1
        const xOffset = (i - 1) * SIDE_OFFSET
        const scale = isCenter ? 1 : 0.38
        const opacity = isCenter ? 1 : 0.25
        const zIndex = isCenter ? 10 : 4

        return (
          <motion.div
            key={`${role.id}-${i}`}
            animate={{ x: xOffset, scale, opacity, filter: isCenter ? 'none' : 'blur(2.5px)' }}
            transition={{ duration: 0.55, ease: [0.4, 0, 0.2, 1] }}
            style={{ position: 'absolute', width: CARD_W, zIndex, pointerEvents: isCenter ? 'auto' : 'none' }}
          >
            <div style={{
              backgroundColor: '#0d1520',
              border: `${isCenter ? '1px' : '0.5px'} solid ${isCenter ? role.border : '#1e2a3a'}`,
              borderRadius: isCenter ? 18 : 12,
              padding: isCenter ? '2.75rem 2.75rem' : '1rem 1.1rem',
              position: 'relative',
              overflow: 'hidden',
              boxShadow: isCenter
                ? `0 0 80px ${role.glow}, 0 0 30px ${role.glow}, 0 20px 60px rgba(0,0,0,0.55)`
                : 'none',
              transition: 'all 0.4s',
            }}>
              {/* Glow orb */}
              {isCenter && (
                <div style={{
                  position: 'absolute', top: -50, right: -50,
                  width: 220, height: 220, borderRadius: '50%',
                  background: `radial-gradient(circle, ${role.glow} 0%, transparent 70%)`,
                  pointerEvents: 'none',
                }} />
              )}

              {/* Icon + Title */}
              <div style={{ display: 'flex', alignItems: 'center', gap: isCenter ? '1rem' : '0.5rem', marginBottom: isCenter ? '1.75rem' : '0.6rem' }}>
                <span style={{
                  width: isCenter ? 56 : 24, height: isCenter ? 56 : 24,
                  borderRadius: isCenter ? 14 : 6, flexShrink: 0,
                  backgroundColor: role.glow, border: `0.5px solid ${role.border}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: isCenter ? '1.75rem' : '0.7rem',
                  transition: 'all 0.4s',
                }}>
                  {role.icon}
                </span>
                <span style={{
                  fontFamily: '"JetBrains Mono", monospace',
                  fontSize: isCenter ? '0.85rem' : '0.5rem',
                  color: role.color,
                  letterSpacing: isCenter ? '2.5px' : '0.5px',
                  textTransform: 'uppercase',
                  fontWeight: 700,
                  lineHeight: 1.3,
                }}>
                  {role.title}
                </span>
              </div>

              {/* Divider — center only */}
              {isCenter && (
                <div style={{
                  height: '1px',
                  background: `linear-gradient(90deg, ${role.border}, transparent)`,
                  marginBottom: '2rem',
                }} />
              )}

              {/* Code rows */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: isCenter ? '1.4rem' : '0.25rem' }}>
                {role.items.map(({ key, val }) => (
                  <div key={key} style={{ display: 'flex', gap: isCenter ? '0.75rem' : '0.3rem', alignItems: 'flex-start' }}>
                    <span style={{
                      fontFamily: '"JetBrains Mono", monospace',
                      fontSize: isCenter ? '0.78rem' : '0.45rem',
                      color: '#818cf8',
                      minWidth: isCenter ? 80 : 38,
                      flexShrink: 0,
                    }}>
                      {key}:
                    </span>
                    <span style={{
                      fontFamily: '"JetBrains Mono", monospace',
                      fontSize: isCenter ? '0.78rem' : '0.45rem',
                      color: role.color,
                      wordBreak: 'break-word',
                    }}>
                      {val}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )
      })}

      {/* Dot indicators */}
      <div style={{ position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: '7px', zIndex: 20 }}>
        {roles.map((r, i) => (
          <motion.div
            key={r.id}
            animate={{ width: i === activeIdx ? 24 : 7, backgroundColor: i === activeIdx ? roles[activeIdx].color : 'rgba(148,163,184,0.3)' }}
            transition={{ duration: 0.3 }}
            style={{ height: 7, borderRadius: 999, cursor: 'pointer' }}
            onClick={() => setActiveIdx(i)}
          />
        ))}
      </div>
    </div>
  )
}

// ── About section ───────────────────────────────────────────────────────────────
export default function About() {
  return (
    <section
      id="about"
      style={{ padding: '60px 1.5rem', backgroundColor: '#080b14', position: 'relative' }}
    >
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        {/* Header */}
        <motion.div
          initial="hidden" whileInView="visible" viewport={{ once: true }}
          variants={sectionVariants} style={{ marginBottom: '1rem' }}
        >
          <p className="section-number" style={{ marginBottom: '0.5rem' }}>// 001</p>
          <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 800, color: '#f1f5f9', letterSpacing: '-1px' }}>
            About Me
          </h2>
        </motion.div>

        {/* Split layout */}
        <div
          className="about-grid"
          style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2.5rem', alignItems: 'start' }}
        >
          {/* Left: Bio */}
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }}
            variants={sectionVariants}
            style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
          >
            <p style={{ fontSize: '1rem', color: '#94a3b8', lineHeight: 1.8 }}>
              {personalInfo.aboutText}
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <InfoRow label="Location"   value={personalInfo.location} />
              <InfoRow label="Email"      value={personalInfo.email}    isLink={`mailto:${personalInfo.email}`} />
              <InfoRow label="Phone"      value={personalInfo.phone}    isLink={`tel:${personalInfo.phone}`} />
              <InfoRow label="University" value="FAST-NUCES Islamabad" />
              <InfoRow label="Graduation" value="Aug 2026" />
            </div>

            {/* Courses */}
            <div>
              <p style={{
                fontFamily: '"JetBrains Mono", monospace', fontSize: '0.65rem',
                color: '#475569', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '0.75rem',
              }}>
                Relevant Courses
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {personalInfo.courses.map((course) => (
                  <span key={course} style={{
                    fontFamily: '"JetBrains Mono", monospace', fontSize: '0.7rem',
                    color: '#818cf8', backgroundColor: 'rgba(129,140,248,0.08)',
                    border: '0.5px solid rgba(129,140,248,0.25)', borderRadius: '999px',
                    padding: '0.3rem 0.8rem', letterSpacing: '0.5px',
                  }}>
                    {course}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right: Role Carousel */}
          <motion.div
            initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.7, ease: 'easeOut', delay: 0.2 }}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', alignSelf: 'stretch', justifyContent: 'flex-start' }}
          >
            <RoleCarousel />
          </motion.div>
        </div>
      </div>

      {/* Mobile-specific overrides */}
      <style>{`
        @media (max-width: 640px) {
          .about-grid {
            grid-template-columns: 1fr !important;
            gap: 2.5rem !important;
          }
        }
      `}</style>
    </section>
  )
}

function InfoRow({ label, value, isLink }: { label: string; value: string; isLink?: string }) {
  return (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
      <span style={{
        fontFamily: '"JetBrains Mono", monospace', fontSize: '0.65rem',
        color: '#475569', letterSpacing: '1px', textTransform: 'uppercase',
        minWidth: '80px', flexShrink: 0,
      }}>
        {label}
      </span>
      {isLink ? (
        <a
          href={isLink}
          style={{ color: '#22d3ee', fontSize: '0.85rem', textDecoration: 'none', transition: 'opacity 0.2s' }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.opacity = '0.7' }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.opacity = '1' }}
        >
          {value}
        </a>
      ) : (
        <span style={{ color: '#94a3b8', fontSize: '0.85rem' }}>{value}</span>
      )}
    </div>
  )
}
