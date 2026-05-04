'use client'

import { motion } from 'framer-motion'
import { experiences, ExperienceEntry } from '@/lib/data'

function TimelineItem({ entry, index }: { entry: ExperienceEntry; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: 'easeOut' }}
      style={{
        display: 'flex',
        gap: '1.5rem',
        position: 'relative',
      }}
    >
      {/* Left: dot + line */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          flexShrink: 0,
          paddingTop: '4px',
        }}
      >
        {/* Dot */}
        <div
          style={{
            width: 12,
            height: 12,
            borderRadius: '50%',
            backgroundColor: entry.type === 'education' ? '#818cf8' : '#22d3ee',
            boxShadow:
              entry.type === 'education'
                ? '0 0 12px rgba(129,140,248,0.7)'
                : '0 0 12px rgba(34,211,238,0.7)',
            flexShrink: 0,
            zIndex: 1,
            border: '2px solid #080b14',
          }}
        />
        {/* Vertical line segment */}
        <div
          style={{
            width: 1,
            flex: 1,
            background: 'linear-gradient(to bottom, rgba(34,211,238,0.3), transparent)',
            minHeight: 40,
            marginTop: 4,
          }}
        />
      </div>

      {/* Right: content */}
      <div
        style={{
          paddingBottom: '2.5rem',
          flex: 1,
        }}
      >
        {/* Date */}
        <p
          style={{
            fontFamily: '"JetBrains Mono", monospace',
            fontSize: '0.65rem',
            color: entry.type === 'education' ? '#818cf8' : '#22d3ee',
            letterSpacing: '2px',
            marginBottom: '0.5rem',
            textTransform: 'uppercase',
          }}
        >
          {entry.date}
        </p>

        {/* Title */}
        <h3
          style={{
            fontSize: '1rem',
            fontWeight: 700,
            color: '#f1f5f9',
            marginBottom: entry.company ? '0.25rem' : '0.5rem',
          }}
        >
          {entry.title}
        </h3>

        {/* Company */}
        {entry.company && (
          <p
            style={{
              fontSize: '0.8rem',
              color: '#22d3ee',
              marginBottom: '0.5rem',
              opacity: 0.8,
            }}
          >
            {entry.company}
          </p>
        )}

        {/* Description */}
        <p style={{ fontSize: '0.85rem', color: '#94a3b8', lineHeight: 1.7 }}>
          {entry.description}
        </p>

        {/* Type badge */}
        <span
          style={{
            display: 'inline-block',
            marginTop: '0.75rem',
            fontFamily: '"JetBrains Mono", monospace',
            fontSize: '0.6rem',
            letterSpacing: '1px',
            textTransform: 'uppercase',
            color: entry.type === 'education' ? '#818cf8' : '#22d3ee',
            backgroundColor:
              entry.type === 'education'
                ? 'rgba(129,140,248,0.08)'
                : 'rgba(34,211,238,0.06)',
            border:
              entry.type === 'education'
                ? '0.5px solid rgba(129,140,248,0.2)'
                : '0.5px solid rgba(34,211,238,0.2)',
            borderRadius: '4px',
            padding: '0.2rem 0.6rem',
          }}
        >
          {entry.type}
        </span>
      </div>
    </motion.div>
  )
}

export default function Experience() {
  return (
    <section
      id="experience"
      style={{
        padding: '100px 1.5rem',
        backgroundColor: '#080b14',
        position: 'relative',
      }}
    >
      {/* Top divider */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: '600px',
          height: '1px',
          background: 'linear-gradient(90deg, transparent, rgba(34,211,238,0.3), transparent)',
        }}
      />

      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: '4rem' }}
        >
          <p className="section-number" style={{ marginBottom: '0.5rem' }}>// 004</p>
          <h2
            style={{
              fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
              fontWeight: 800,
              color: '#f1f5f9',
              letterSpacing: '-1px',
            }}
          >
            Experience
          </h2>
          <p style={{ color: '#475569', fontSize: '0.9rem', marginTop: '0.5rem' }}>
            Building, shipping, and learning — in that order.
          </p>
        </motion.div>

        {/* Timeline */}
        <div style={{ maxWidth: '660px' }}>
          {experiences.map((entry, i) => (
            <TimelineItem key={i} entry={entry} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
