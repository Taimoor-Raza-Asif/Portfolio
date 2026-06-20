'use client'

import { motion } from 'framer-motion'
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

// ── Featured cert badge ────────────────────────────────────────────────────────
function FeaturedCertCard() {
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
      {/* Amber glow corner */}
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

      {/* Badge image */}
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

      {/* Text */}
      <div style={{ flex: 1, minWidth: 0 }}>
        {/* AWS wordmark */}
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

      {/* Right arrow indicator */}
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

// ── Training & Workshop badge cards ───────────────────────────────────────────
const trainingBadges = [
  {
    img: '/assets/badge 1.png',
    title: 'AWS Cloud Quest: Generative AI Practitioner',
  },
  {
    img: '/assets/badge 2.png',
    title: 'AWS Educate: Introduction to Generative AI',
  },
  {
    img: '/assets/badge 3.png',
    title: 'AWS Academy Graduate: Cloud Web Application Builder',
  },
  {
    img: '/assets/badge 4.png',
    title: 'AWS Academy Graduate: Cloud Foundations',
  },
  {
    img: '/assets/badge 5.png',
    title: 'AWS Cloud Quest: Cloud Practitioner',
  },
  {
    img: '/assets/badge 6.png',
    title: 'Microsoft AI Skills Fest 2026',
  },
]

function TrainingCard({ img, title }: { img: string; title: string }) {
  return (
    <motion.a
      href="https://www.credly.com/users/taimoor-raza-asif"
      target="_blank"
      rel="noopener noreferrer"
      variants={cardVariants}
      whileHover={{ y: -4, borderColor: 'rgba(34,211,238,0.45)' }}
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
        flex: '0 0 auto',
        width: 155,
      }}
    >
      {/* Circle with padding so badge is not cropped 34,211,238,0.25 */}
      <div
        style={{
          width: 120,
          height: 120,
          borderRadius: '50%',
          border: '2.5px solid rgba(34,211,238,0.25)',
          boxShadow: '0 0 20px rgba(34,211,238,0.09)',
          background: '#ffffffff',
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
          width={80}
          height={80}
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

        {/* Featured Card */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          style={{ marginBottom: '2.5rem' }}
        >
          <FeaturedCertCard />
        </motion.div>

        {/* Training & Workshops sub-heading */}
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
          Training &amp; Workshops
        </motion.p>

        {/* Training row — all 6 badges in one row, scrollable on small screens */}
        <div className="certs-scroll-wrapper">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            style={{
              display: 'flex',
              flexDirection: 'row',
              gap: '1rem',
              justifyContent: 'space-between',
            }}
            className="certs-row"
          >
            {trainingBadges.map((b) => (
              <TrainingCard key={b.title} {...b} />
            ))}
          </motion.div>
        </div>
      </div>

      <style>{`
        .certs-scroll-wrapper {
          width: 100%;
          overflow-x: auto;
          -webkit-overflow-scrolling: touch;
          /* hide scrollbar but keep functionality */
          scrollbar-width: thin;
          scrollbar-color: rgba(34,211,238,0.15) transparent;
        }
        .certs-scroll-wrapper::-webkit-scrollbar {
          height: 4px;
        }
        .certs-scroll-wrapper::-webkit-scrollbar-thumb {
          background: rgba(34,211,238,0.15);
          border-radius: 999px;
        }
        .certs-row {
          min-width: max-content;
        }
        @media (min-width: 1100px) {
          .certs-row {
            min-width: unset !important;
            justify-content: space-between !important;
          }
        }
        @media (max-width: 640px) {
          .featured-cert-card {
            flex-direction: column !important;
            text-align: center;
            padding: 1.5rem !important;
          }
        }
      `}</style>
    </section>
  )
}
