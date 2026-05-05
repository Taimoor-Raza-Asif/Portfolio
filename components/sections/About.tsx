'use client'

import { motion } from 'framer-motion'
import { personalInfo } from '@/lib/data'

const sectionVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
}

export default function About() {
  return (
    <section
      id="about"
      style={{
        padding: '100px 1.5rem',
        backgroundColor: '#080b14',
        position: 'relative',
      }}
    >
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        {/* Section header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={sectionVariants}
          style={{ marginBottom: '4rem' }}
        >
          <p className="section-number" style={{ marginBottom: '0.5rem' }}>// 001</p>
          <h2
            style={{
              fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
              fontWeight: 800,
              color: '#f1f5f9',
              letterSpacing: '-1px',
            }}
          >
            About Me
          </h2>
        </motion.div>

        {/* Split layout */}
        <div
          className="about-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '4rem',
            alignItems: 'start',
          }}
        >
          {/* Left: Bio */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={sectionVariants}
            style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
          >
            <p style={{ fontSize: '1rem', color: '#94a3b8', lineHeight: 1.8 }}>
              {personalInfo.aboutText}
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <InfoRow label="Location" value={personalInfo.location} />
              <InfoRow label="Email" value={personalInfo.email} isLink={`mailto:${personalInfo.email}`} />
              <InfoRow label="Phone" value={personalInfo.phone} isLink={`tel:${personalInfo.phone}`} />
              <InfoRow label="University" value="FAST-NUCES Islamabad" />
              <InfoRow label="Graduation" value="Aug 2026" />
            </div>

            {/* Courses */}
            <div>
              <p
                style={{
                  fontFamily: '"JetBrains Mono", monospace',
                  fontSize: '0.65rem',
                  color: '#475569',
                  letterSpacing: '2px',
                  textTransform: 'uppercase',
                  marginBottom: '0.75rem',
                }}
              >
                Relevant Courses
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {personalInfo.courses.map((course) => (
                  <span
                    key={course}
                    style={{
                      fontFamily: '"JetBrains Mono", monospace',
                      fontSize: '0.7rem',
                      color: '#818cf8',
                      backgroundColor: 'rgba(129,140,248,0.08)',
                      border: '0.5px solid rgba(129,140,248,0.25)',
                      borderRadius: '999px',
                      padding: '0.3rem 0.8rem',
                      letterSpacing: '0.5px',
                    }}
                  >
                    {course}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right: Visual card */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: 'easeOut', delay: 0.2 }}
          >
            <div
              style={{
                backgroundColor: '#0d1520',
                border: '0.5px solid #1e2a3a',
                borderRadius: '12px',
                padding: '2rem',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {/* Glow accent */}
              <div
                style={{
                  position: 'absolute',
                  top: '-40px',
                  right: '-40px',
                  width: '150px',
                  height: '150px',
                  borderRadius: '50%',
                  background: 'radial-gradient(circle, rgba(34,211,238,0.08) 0%, transparent 70%)',
                  pointerEvents: 'none',
                }}
              />

              <p
                style={{
                  fontFamily: '"JetBrains Mono", monospace',
                  fontSize: '0.65rem',
                  color: '#22d3ee',
                  letterSpacing: '2px',
                  marginBottom: '1.25rem',
                }}
              >
                // taimoor.profile
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {[
                  { key: 'name', val: '"Taimoor Raza Asif"' },
                  { key: 'role', val: '"AI Engineer"' },
                  { key: 'location', val: '"Islamabad, PK"' },
                  { key: 'focus', val: '["RAG", "AI Agents", "Automation"]' },
                  { key: 'status', val: '"Open to work"' },
                  { key: 'coffee', val: 'Infinity + 1' },
                ].map(({ key, val }) => (
                  <div key={key} style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                    <span
                      style={{
                        fontFamily: '"JetBrains Mono", monospace',
                        fontSize: '0.78rem',
                        color: '#818cf8',
                        minWidth: '80px',
                        flexShrink: 0,
                      }}
                    >
                      {key}:
                    </span>
                    <span
                      style={{
                        fontFamily: '"JetBrains Mono", monospace',
                        fontSize: '0.78rem',
                        color: '#22d3ee',
                      }}
                    >
                      {val}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function InfoRow({ label, value, isLink }: { label: string; value: string; isLink?: string }) {
  return (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
      <span
        style={{
          fontFamily: '"JetBrains Mono", monospace',
          fontSize: '0.65rem',
          color: '#475569',
          letterSpacing: '1px',
          textTransform: 'uppercase',
          minWidth: '80px',
          flexShrink: 0,
        }}
      >
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
