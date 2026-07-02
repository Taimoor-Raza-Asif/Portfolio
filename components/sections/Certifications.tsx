'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
}

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

// AWS Cloud icon SVG inline
function AwsIcon({ size = 48 }: { size?: number }) {
  return (
    <svg
      viewBox="0 0 80 48"
      width={size}
      height={size * 0.6}
      xmlns="http://www.w3.org/2000/svg"
      aria-label="AWS Logo"
    >
      <text
        x="0"
        y="40"
        fontFamily="'Amazon Ember', Arial Black, sans-serif"
        fontWeight="900"
        fontSize="40"
        fill="#FF9900"
        letterSpacing="-1"
      >
        aws
      </text>
    </svg>
  )
}

// Google wordmark SVG inline
function GoogleIcon({ size = 28 }: { size?: number }) {
  return (
    <svg
      viewBox="0 0 272 92"
      width={size * 3.5}
      height={size}
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Google Logo"
    >
      <path
        d="M115.75 47.18c0 12.77-9.99 22.18-22.25 22.18s-22.25-9.41-22.25-22.18C71.25 34.32 81.24 25 93.5 25s22.25 9.32 22.25 22.18zm-9.74 0c0-7.98-5.79-13.44-12.51-13.44S80.99 39.2 80.99 47.18c0 7.9 5.79 13.44 12.51 13.44s12.51-5.55 12.51-13.44z"
        fill="#EA4335"
      />
      <path
        d="M163.75 47.18c0 12.77-9.99 22.18-22.25 22.18s-22.25-9.41-22.25-22.18c0-12.85 9.99-22.18 22.25-22.18s22.25 9.32 22.25 22.18zm-9.74 0c0-7.98-5.79-13.44-12.51-13.44s-12.51 5.46-12.51 13.44c0 7.9 5.79 13.44 12.51 13.44s12.51-5.55 12.51-13.44z"
        fill="#FBBC05"
      />
      <path
        d="M209.75 26.34v39.82c0 16.38-9.66 23.07-21.08 23.07-10.75 0-17.22-7.19-19.66-13.07l8.48-3.53c1.51 3.61 5.21 7.87 11.17 7.87 7.31 0 11.84-4.51 11.84-13v-3.19h-.34c-2.18 2.69-6.38 5.04-11.68 5.04-11.09 0-21.25-9.66-21.25-22.09 0-12.52 10.16-22.26 21.25-22.26 5.29 0 9.49 2.35 11.68 4.96h.34v-3.61h9.25zm-8.56 20.92c0-7.81-5.21-13.52-11.84-13.52-6.72 0-12.35 5.71-12.35 13.52 0 7.73 5.63 13.36 12.35 13.36 6.63 0 11.84-5.63 11.84-13.36z"
        fill="#4285F4"
      />
      <path d="M225 3v65h-9.5V3h9.5z" fill="#34A853" />
      <path
        d="M262.02 54.48l7.56 5.04c-2.44 3.61-8.32 9.83-18.48 9.83-12.6 0-22.01-9.74-22.01-22.18 0-13.19 9.49-22.18 20.92-22.18 11.51 0 17.14 9.16 18.98 14.11l1.01 2.52-29.65 12.28c2.27 4.45 5.8 6.72 10.75 6.72 4.96 0 8.4-2.44 10.92-6.14zm-23.27-7.98l19.82-8.23c-1.09-2.77-4.37-4.7-8.23-4.7-4.95 0-11.84 4.37-11.59 12.93z"
        fill="#EA4335"
      />
      <path
        d="M35.29 41.41V32H67c.31 1.64.47 3.58.47 5.68 0 7.06-1.93 15.79-8.15 22.01-6.05 6.3-13.78 9.66-24.02 9.66C16.32 69.35.36 53.89.36 34.91.36 15.93 16.32.47 35.3.47c10.5 0 17.98 4.12 23.6 9.49l-6.64 6.64c-4.03-3.78-9.49-6.72-16.97-6.72-13.86 0-24.7 11.17-24.7 25.03 0 13.86 10.84 25.03 24.7 25.03 8.99 0 14.11-3.61 17.39-6.89 2.66-2.66 4.41-6.46 5.1-11.65l-22.49.01z"
        fill="#4285F4"
      />
    </svg>
  )
}

// ── Featured AWS cert badge ────────────────────────────────────────────────────
function FeaturedAwsCertCard() {
  return (
    <motion.a
      href="https://www.credly.com/badges/d0b361b2-98ac-4b5b-806d-bb48a7b17c31"
      target="_blank"
      rel="noopener noreferrer"
      variants={cardVariants}
      whileHover={{ y: -6, boxShadow: '0 0 60px rgba(255,153,0,0.25), 0 16px 48px rgba(0,0,0,0.5)' }}
      style={{
        display: 'flex',
        gap: '2rem',
        alignItems: 'center',
        backgroundColor: '#0d1520',
        border: '1px solid rgba(255,153,0,0.35)',
        borderRadius: '16px',
        padding: '2rem 2.5rem',
        textDecoration: 'none',
        position: 'relative',
        overflow: 'hidden',
        cursor: 'pointer',
        transition: 'border-color 0.3s',
      }}
      className="featured-cert-card"
    >
      <div
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: 220,
          height: 220,
          background: 'radial-gradient(circle at top right, rgba(255,153,0,0.12) 0%, transparent 65%)',
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          flexShrink: 0,
          width: 120,
          height: 120,
          borderRadius: '50%',
          border: '2px solid rgba(255,153,0,0.4)',
          boxShadow: '0 0 30px rgba(255,153,0,0.2)',
          overflow: 'hidden',
          background: '#141f2e',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Image
          src="/assets/cloud practitioner certificate.png"
          alt="AWS Certified Cloud Practitioner Badge"
          width={120}
          height={120}
          style={{ objectFit: 'cover', width: '100%', height: '100%' }}
        />
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ marginBottom: '0.6rem' }}>
          <AwsIcon size={52} />
        </div>
        <h3
          style={{
            fontSize: 'clamp(1.1rem, 2.5vw, 1.45rem)',
            fontWeight: 800,
            color: '#f1f5f9',
            letterSpacing: '-0.5px',
            marginBottom: '0.35rem',
          }}
        >
          AWS Certified Cloud Practitioner
        </h3>
        <p
          style={{
            fontFamily: '"JetBrains Mono", monospace',
            fontSize: '0.72rem',
            color: '#FF9900',
            letterSpacing: '1.5px',
            marginBottom: '0.75rem',
          }}
        >
          Valid through Jun 2029
        </p>
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.45rem',
            backgroundColor: 'rgba(255,153,0,0.1)',
            border: '0.5px solid rgba(255,153,0,0.35)',
            borderRadius: '999px',
            padding: '0.3rem 0.85rem',
          }}
        >
          <svg viewBox="0 0 12 12" width={10} height={10} fill="none">
            <circle cx="6" cy="6" r="5.5" stroke="#FF9900" strokeWidth="1" />
            <path d="M3.5 6l1.8 1.8L8.5 4.5" stroke="#FF9900" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span
            style={{
              fontFamily: '"JetBrains Mono", monospace',
              fontSize: '0.62rem',
              color: '#FF9900',
              letterSpacing: '1px',
              fontWeight: 600,
            }}
          >
            VERIFIED · CLICK TO VERIFY
          </span>
        </div>
      </div>
      <div
        style={{
          flexShrink: 0,
          color: 'rgba(255,153,0,0.4)',
          fontSize: '1.5rem',
          fontWeight: 200,
        }}
      >
        →
      </div>
    </motion.a>
  )
}

// ── Featured Google AI Professional Certificate card ───────────────────────────
function FeaturedGoogleCertCard() {
  return (
    <motion.a
      href="https://www.credly.com/users/taimoor-raza-asif/badges?source=linked_in_profile"
      target="_blank"
      rel="noopener noreferrer"
      variants={cardVariants}
      whileHover={{ y: -6, boxShadow: '0 0 60px rgba(66,133,244,0.25), 0 16px 48px rgba(0,0,0,0.5)' }}
      style={{
        display: 'flex',
        gap: '2rem',
        alignItems: 'center',
        backgroundColor: '#0d1520',
        border: '1px solid rgba(66,133,244,0.35)',
        borderRadius: '16px',
        padding: '2rem 2.5rem',
        textDecoration: 'none',
        position: 'relative',
        overflow: 'hidden',
        cursor: 'pointer',
        transition: 'border-color 0.3s',
      }}
      className="featured-cert-card"
    >
      <div
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: 220,
          height: 220,
          background: 'radial-gradient(circle at top right, rgba(66,133,244,0.12) 0%, rgba(52,168,83,0.06) 40%, transparent 65%)',
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          flexShrink: 0,
          width: 120,
          height: 120,
          borderRadius: '50%',
          border: '2px solid rgba(66,133,244,0.4)',
          boxShadow: '0 0 30px rgba(66,133,244,0.2)',
          overflow: 'hidden',
          background: '#ffffff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '6px',
          boxSizing: 'border-box',
        }}
      >
        <Image
          src="/assets/google certificates/AI Professional Certificate.png"
          alt="Google AI Professional Certificate"
          width={120}
          height={120}
          style={{ objectFit: 'contain', width: '100%', height: '100%' }}
        />
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ marginBottom: '0.6rem' }}>
          <GoogleIcon size={28} />
        </div>
        <h3
          style={{
            fontSize: 'clamp(1.1rem, 2.5vw, 1.45rem)',
            fontWeight: 800,
            color: '#f1f5f9',
            letterSpacing: '-0.5px',
            marginBottom: '0.35rem',
          }}
        >
          Google AI Professional Certificate
        </h3>
        <p
          style={{
            fontFamily: '"JetBrains Mono", monospace',
            fontSize: '0.72rem',
            color: '#4285F4',
            letterSpacing: '1.5px',
            marginBottom: '0.75rem',
          }}
        >
          Issued on 2 July 2026
        </p>
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.45rem',
            backgroundColor: 'rgba(66,133,244,0.1)',
            border: '0.5px solid rgba(66,133,244,0.35)',
            borderRadius: '999px',
            padding: '0.3rem 0.85rem',
          }}
        >
          <svg viewBox="0 0 12 12" width={10} height={10} fill="none">
            <circle cx="6" cy="6" r="5.5" stroke="#4285F4" strokeWidth="1" />
            <path d="M3.5 6l1.8 1.8L8.5 4.5" stroke="#4285F4" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span
            style={{
              fontFamily: '"JetBrains Mono", monospace',
              fontSize: '0.62rem',
              color: '#4285F4',
              letterSpacing: '1px',
              fontWeight: 600,
            }}
          >
            CERTIFICATE COMPLETION
          </span>
        </div>
      </div>
      <div
        style={{
          flexShrink: 0,
          color: 'rgba(66,133,244,0.4)',
          fontSize: '1.5rem',
          fontWeight: 200,
        }}
      >
        →
      </div>
    </motion.a>
  )
}

// ── Badge data ─────────────────────────────────────────────────────────────────
const trainingBadges = [
  { img: '/assets/badge 1.png', title: 'AWS Cloud Quest: Generative AI Practitioner' },
  { img: '/assets/badge 2.png', title: 'AWS Educate: Introduction to Generative AI' },
  { img: '/assets/badge 3.png', title: 'AWS Academy Graduate: Cloud Web Application Builder' },
  { img: '/assets/badge 4.png', title: 'AWS Academy Graduate: Cloud Foundations' },
  { img: '/assets/badge 5.png', title: 'AWS Cloud Quest: Cloud Practitioner' },
  { img: '/assets/badge 6.png', title: 'Microsoft AI Skills Fest 2026' },
]

const googleBadges = [
  { img: '/assets/google certificates/AI fundamentals badge.png', title: 'Google AI Fundamentals' },
  { img: '/assets/google certificates/Ai contenet creation badge.png', title: 'AI for Content Creation' },
  { img: '/assets/google certificates/Ai for Writing and communication badge.png', title: 'AI for Writing & Communication' },
  { img: '/assets/google certificates/Ai for app building badge.png', title: 'AI for App Building' },
  { img: '/assets/google certificates/Ai for brainstorming and Planning badge.png', title: 'AI for Brainstorming & Planning' },
  { img: '/assets/google certificates/Ai for research and Insights badge.png', title: 'AI for Research & Insights' },
  { img: '/assets/google certificates/AI Data Analysis Badge.png', title: 'AI for Data Analysis' },
]

// ── Single badge card ──────────────────────────────────────────────────────────
function TrainingCard({
  img,
  title,
  href = 'https://www.credly.com/users/taimoor-raza-asif',
  accentColor = 'rgba(34,211,238,0.25)',
  glowColor = 'rgba(34,211,238,0.09)',
  hoverBorderColor = 'rgba(34,211,238,0.45)',
  bgColor = '#ffffffff',
}: {
  img: string
  title: string
  href?: string
  accentColor?: string
  glowColor?: string
  hoverBorderColor?: string
  bgColor?: string
}) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      variants={cardVariants}
      whileHover={{ y: -4, borderColor: hoverBorderColor }}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '0.85rem',
        backgroundColor: '#0d1520',
        border: '1px solid #1e2a3a',
        borderRadius: '14px',
        padding: '1.4rem 0.85rem 1.25rem',
        textDecoration: 'none',
        transition: 'all 0.25s',
        cursor: 'pointer',
        /* fill the grid cell fully — fixes right-side cut-off */
        width: '100%',
        boxSizing: 'border-box',
      }}
    >
      {/* Circle image container */}
      <div
        style={{
          width: 150,
          height: 150,
          maxWidth: '100%',
          borderRadius: '50%',
          border: `2.5px solid ${accentColor}`,
          boxShadow: `0 0 20px ${glowColor}`,
          background: bgColor,
          flexShrink: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '8px',
          boxSizing: 'border-box',
        }}
      >
        <Image
          src={img}
          alt={title}
          width={100}
          height={100}
          style={{ objectFit: 'contain', width: '100%', height: '100%' }}
        />
      </div>
      <p
        style={{
          fontSize: '0.7rem',
          color: '#94a3b8',
          textAlign: 'center',
          lineHeight: 1.45,
          fontWeight: 500,
          width: '100%',
        }}
      >
        {title}
      </p>
    </motion.a>
  )
}

// ── "View More" button ─────────────────────────────────────────────────────────
function ViewMoreButton({
  expanded,
  onToggle,
  remaining,
}: {
  expanded: boolean
  onToggle: () => void
  remaining: number
}) {
  return (
    <motion.button
      onClick={onToggle}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        margin: '1.25rem auto 0',
        background: 'rgba(34,211,238,0.07)',
        border: '1px solid rgba(34,211,238,0.25)',
        borderRadius: '999px',
        padding: '0.55rem 1.4rem',
        color: 'rgba(34,211,238,0.85)',
        fontFamily: '"JetBrains Mono", monospace',
        fontSize: '0.68rem',
        letterSpacing: '1.2px',
        fontWeight: 600,
        cursor: 'pointer',
        textTransform: 'uppercase',
        transition: 'all 0.25s',
      }}
    >
      {expanded ? (
        <>
          <span>Show Less</span>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M2 8l4-4 4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </>
      ) : (
        <>
          <span>View {remaining} More</span>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </>
      )}
    </motion.button>
  )
}

// ── Badge grid with mobile collapse ───────────────────────────────────────────
const MOBILE_INITIAL = 2 // badges shown before "View More" on mobile

function BadgeGrid({
  badges,
  googleStyle = false,
}: {
  badges: typeof trainingBadges
  googleStyle?: boolean
}) {
  const [expanded, setExpanded] = useState(false)

  const accentColor = googleStyle ? 'rgba(66,133,244,0.3)' : 'rgba(34,211,238,0.25)'
  const glowColor = googleStyle ? 'rgba(66,133,244,0.1)' : 'rgba(34,211,238,0.09)'
  const hoverBorderColor = googleStyle ? 'rgba(66,133,244,0.5)' : 'rgba(34,211,238,0.45)'
  const bgColor = googleStyle ? '#ffffff' : '#ffffffff'
  const href = googleStyle
    ? 'https://www.credly.com/users/taimoor-raza-asif/badges?source=linked_in_profile'
    : 'https://www.credly.com/users/taimoor-raza-asif'

  return (
    <>
      {/* Desktop: always show all in CSS grid — hidden on mobile */}
      <div className="badges-grid-desktop">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="badges-grid"
        >
          {badges.map((b) => (
            <TrainingCard
              key={b.title}
              img={b.img}
              title={b.title}
              href={href}
              accentColor={accentColor}
              glowColor={glowColor}
              hoverBorderColor={hoverBorderColor}
              bgColor={bgColor}
            />
          ))}
        </motion.div>
      </div>

      {/* Mobile: show 2 initially, expand on button press */}
      <div className="badges-grid-mobile">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="badges-grid-2col"
        >
          {/* Always-visible first 2 */}
          {badges.slice(0, MOBILE_INITIAL).map((b) => (
            <TrainingCard
              key={b.title}
              img={b.img}
              title={b.title}
              href={href}
              accentColor={accentColor}
              glowColor={glowColor}
              hoverBorderColor={hoverBorderColor}
              bgColor={bgColor}
            />
          ))}

          {/* Expandable remaining */}
          <AnimatePresence>
            {expanded &&
              badges.slice(MOBILE_INITIAL).map((b) => (
                <motion.div
                  key={b.title}
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.92 }}
                  transition={{ duration: 0.3 }}
                  style={{ display: 'contents' }}
                >
                  <TrainingCard
                    img={b.img}
                    title={b.title}
                    href={href}
                    accentColor={accentColor}
                    glowColor={glowColor}
                    hoverBorderColor={hoverBorderColor}
                    bgColor={bgColor}
                  />
                </motion.div>
              ))}
          </AnimatePresence>
        </motion.div>

        {/* View More / Show Less button — only needed if there are more than 2 */}
        {badges.length > MOBILE_INITIAL && (
          <ViewMoreButton
            expanded={expanded}
            onToggle={() => setExpanded((v) => !v)}
            remaining={badges.length - MOBILE_INITIAL}
          />
        )}
      </div>
    </>
  )
}

// ── Section ────────────────────────────────────────────────────────────────────
export default function Certifications() {
  return (
    <section
      id="certifications"
      style={{ padding: '100px 1.5rem', backgroundColor: '#060910', position: 'relative' }}
    >
      {/* Top divider */}
      <div
        className="section-divider"
        style={{
          position: 'absolute',
          top: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: '600px',
          height: '1px',
          background: 'linear-gradient(90deg, transparent, rgba(255,153,0,0.3), transparent)',
        }}
      />

      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: '3rem' }}
        >
          <p className="section-number" style={{ marginBottom: '0.5rem' }}>
            // 003
          </p>
          <h2
            style={{
              fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
              fontWeight: 800,
              color: '#f1f5f9',
              letterSpacing: '-1px',
            }}
          >
            Certifi
            <span className="gradient-text" style={{ fontStyle: 'italic' }}>
              cations
            </span>
          </h2>
          <p style={{ color: '#475569', fontSize: '0.9rem', marginTop: '0.5rem' }}>
            Verified credentials and completed training programs
          </p>
        </motion.div>

        {/* Featured Cards — AWS + Google side-by-side on large screens */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="featured-certs-grid"
          style={{ marginBottom: '2.5rem' }}
        >
          <FeaturedAwsCertCard />
          <FeaturedGoogleCertCard />
        </motion.div>

        {/* AWS Training & Workshops */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          style={{
            fontFamily: '"JetBrains Mono", monospace',
            fontSize: '0.62rem',
            color: '#475569',
            letterSpacing: '2px',
            textTransform: 'uppercase',
            marginBottom: '1.25rem',
          }}
        >
          AWS &amp; Microsoft — Training &amp; Workshops
        </motion.p>

        <div style={{ marginBottom: '2.5rem' }}>
          <BadgeGrid badges={trainingBadges} />
        </div>

        {/* Google AI Course Badges */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          style={{
            fontFamily: '"JetBrains Mono", monospace',
            fontSize: '0.62rem',
            color: '#475569',
            letterSpacing: '2px',
            textTransform: 'uppercase',
            marginBottom: '1.25rem',
          }}
        >
          Google AI — Course Badges
        </motion.p>

        <BadgeGrid badges={googleBadges} googleStyle />
      </div>

      <style>{`
        /* ── Featured cards ── */
        .featured-certs-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1.25rem;
        }
        @media (min-width: 860px) {
          .featured-certs-grid {
            grid-template-columns: 1fr 1fr;
          }
        }
        @media (max-width: 640px) {
          .featured-cert-card {
            flex-direction: column !important;
            text-align: center;
            padding: 1.5rem !important;
          }
        }

        /* ── Desktop badge grid (hidden on mobile) ── */
        .badges-grid-desktop { display: block; }
        .badges-grid-mobile  { display: none;  }

        .badges-grid {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 1rem;
        }
        @media (max-width: 900px) {
          .badges-grid { grid-template-columns: repeat(4, 1fr); }
        }
        @media (max-width: 680px) {
          .badges-grid { grid-template-columns: repeat(3, 1fr); }
        }

        /* ── Mobile: switch to 2-column layout with View More ── */
        @media (max-width: 480px) {
          .badges-grid-desktop { display: none;  }
          .badges-grid-mobile  { display: block; }

          .badges-grid-2col {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 0.75rem;
          }
        }
      `}</style>
    </section>
  )
}