'use client'

import { motion } from 'framer-motion'

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}
const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
}

// ── Types ─────────────────────────────────────────────────────────────────────
type SkillDot = { color?: string; level?: number }
type AutomationItem = { emoji: string; name: string; level: 'expert' | 'advanced' }
type DevopsItem = { name: string }
type DbItem = { name: string; dot: string }

// ── Shared card shell ─────────────────────────────────────────────────────────
function CardShell({
  icon, label, labelColor, borderColor, children,
}: {
  icon: string
  label: string
  labelColor: string
  borderColor: string
  children: React.ReactNode
}) {
  return (
    <motion.div
      variants={cardVariants}
      className="card-hover"
      style={{
        backgroundColor: '#0d1520',
        border: `0.5px solid ${borderColor}`,
        borderRadius: '12px',
        padding: '1.5rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <span
          style={{
            width: 32, height: 32, borderRadius: 8,
            backgroundColor: `${labelColor}18`,
            border: `0.5px solid ${labelColor}40`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '1rem', lineHeight: 1, flexShrink: 0,
          }}
        >
          {icon}
        </span>
        <span
          style={{
            fontFamily: '"JetBrains Mono", monospace',
            fontSize: '0.63rem',
            color: labelColor,
            letterSpacing: '2px',
            textTransform: 'uppercase',
          }}
        >
          {label}
        </span>
      </div>
      {children}
    </motion.div>
  )
}

// ── 1. LANGUAGES card — progress bars ────────────────────────────────────────
const languages: { name: string; pct: number; color: string }[] = [
  { name: 'Python', pct: 80, color: '#22d3ee' },
  { name: 'JavaScript', pct: 80, color: '#818cf8' },
  { name: 'C++', pct: 75, color: '#f472b6' },
]

function LanguagesCard() {
  return (
    <CardShell icon="{ }" label="Languages" labelColor="#22d3ee" borderColor="#1e2a3a">
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
        {languages.map((lang) => (
          <div key={lang.name}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
              <span style={{ fontSize: '0.82rem', fontWeight: 600, color: '#f1f5f9' }}>{lang.name}</span>
              <span style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '0.65rem', color: lang.color, fontWeight: 700 }}>
                {lang.pct}%
              </span>
            </div>
            <div style={{ height: 5, backgroundColor: 'rgba(255,255,255,0.06)', borderRadius: 999, overflow: 'hidden' }}>
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${lang.pct}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.2, ease: 'easeOut' }}
                style={{ height: '100%', borderRadius: 999, background: `linear-gradient(90deg, ${lang.color}99, ${lang.color})` }}
              />
            </div>
          </div>
        ))}
      </div>
    </CardShell>
  )
}

// ── 2. AI / LLM card — dot proficiency grid ──────────────────────────────────
const aiSkills: (SkillDot & { name: string })[] = [
  { name: 'RAG Pipelines', level: 5 },
  { name: 'Vector Databases', level: 4 },
  { name: 'LangChain', level: 4 },
  { name: 'OpenAI API', level: 5 },
  { name: 'Prompt Engineering', level: 5 },
  { name: 'Gemini API', level: 4 },
]

function AiCard() {
  return (
    <CardShell icon="🤖" label="AI / LLM Technologies" labelColor="#22d3ee" borderColor="#1e2a3a">
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
        {aiSkills.map((s) => (
          <div key={s.name} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ fontSize: '0.78rem', color: '#94a3b8' }}>{s.name}</span>
            <div style={{ display: 'flex', gap: 3, flexShrink: 0 }}>
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} style={{ width: 7, height: 7, borderRadius: '50%', backgroundColor: i < (s.level ?? 0) ? '#22d3ee' : 'rgba(34,211,238,0.15)' }} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </CardShell>
  )
}

// ── 3. DATABASES card — amber 2-column grid ───────────────────────────────────
const dotColors = ['#fbbf24', '#f59e0b', '#d97706', '#fbbf24', '#f59e0b']
const dbItems: DbItem[] = [
  { name: 'MongoDB', dot: '#fbbf24' },
  { name: 'MySQL', dot: '#f59e0b' },
  { name: 'PostgreSQL', dot: '#d97706' },
  { name: 'MS SQL Server', dot: '#fbbf24' },
  { name: 'Vector DBs', dot: '#f59e0b' },
]

function DbItem({ name, dot }: DbItem) {
  return (
    <motion.div
      whileHover={{ backgroundColor: 'rgba(251,191,36,0.10)', borderColor: 'rgba(251,191,36,0.30)' }}
      style={{
        display: 'flex', alignItems: 'center', gap: '0.5rem',
        backgroundColor: 'rgba(251,191,36,0.05)',
        border: '0.5px solid rgba(251,191,36,0.15)',
        borderRadius: '7px', padding: '0.4rem 0.6rem',
        transition: 'all 0.2s',
      }}
    >
      <div style={{ width: 7, height: 7, borderRadius: '50%', backgroundColor: dot, flexShrink: 0, boxShadow: `0 0 5px ${dot}88` }} />
      <span style={{ fontSize: '11px', fontWeight: 500, color: '#fcd34d', letterSpacing: '0.3px', whiteSpace: 'nowrap' }}>{name}</span>
    </motion.div>
  )
}

function DatabasesCard() {
  const pairs = dbItems.slice(0, 4) // first 4 in 2-col
  const last = dbItems[4] // Vector DBs spans full width

  return (
    <CardShell icon="🗄️" label="Databases" labelColor="#fbbf24" borderColor="rgba(251,191,36,0.2)">
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
        {/* 2-col grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.4rem' }}>
          {pairs.map((db) => <DbItem key={db.name} {...db} />)}
        </div>
        {/* Last item — full width */}
        <DbItem {...last} />
      </div>
    </CardShell>
  )
}

// ── 4. AUTOMATION card — flow node rows ───────────────────────────────────────
const automationItems: AutomationItem[] = [
  { emoji: '🔄', name: 'n8n Workflows', level: 'expert' },
  { emoji: '🔗', name: 'Webhooks', level: 'expert' },
  { emoji: '🌐', name: 'REST APIs', level: 'advanced' },
  { emoji: '📋', name: 'JSON Workflows', level: 'advanced' },
]

function AutomationRow({ emoji, name, level }: AutomationItem) {
  const isExpert = level === 'expert'
  return (
    <motion.div
      whileHover={{ backgroundColor: 'rgba(52,211,153,0.10)', borderColor: 'rgba(52,211,153,0.30)' }}
      style={{
        display: 'flex', alignItems: 'center', gap: '0.65rem',
        backgroundColor: 'rgba(52,211,153,0.05)',
        border: '0.5px solid rgba(52,211,153,0.15)',
        borderRadius: '8px', padding: '0.5rem 0.7rem',
        transition: 'all 0.2s',
      }}
    >
      {/* Icon box */}
      <div style={{
        width: 24, height: 24, borderRadius: 5, flexShrink: 0,
        backgroundColor: 'rgba(52,211,153,0.12)',
        border: '0.5px solid rgba(52,211,153,0.25)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: '0.8rem', lineHeight: 1,
      }}>
        {emoji}
      </div>
      {/* Name */}
      <span style={{ fontSize: '11px', color: '#6ee7b7', fontWeight: 500, flex: 1, letterSpacing: '0.2px' }}>{name}</span>
      {/* Level pill */}
      <span style={{
        fontFamily: '"JetBrains Mono", monospace',
        fontSize: '0.55rem', fontWeight: 700, letterSpacing: '0.8px',
        color: isExpert ? '#34d399' : '#6ee7b7',
        backgroundColor: isExpert ? 'rgba(52,211,153,0.15)' : 'rgba(52,211,153,0.08)',
        border: `0.5px solid ${isExpert ? 'rgba(52,211,153,0.35)' : 'rgba(52,211,153,0.2)'}`,
        borderRadius: '999px', padding: '0.12rem 0.45rem',
        textTransform: 'uppercase',
      }}>
        {level}
      </span>
    </motion.div>
  )
}

function AutomationCard() {
  return (
    <CardShell icon="⚡" label="Automation" labelColor="#34d399" borderColor="rgba(52,211,153,0.2)">
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
        {automationItems.map((item) => <AutomationRow key={item.name} {...item} />)}
      </div>
    </CardShell>
  )
}

// ── 5. DEVOPS card — 2-column pink diamond grid ───────────────────────────────
const devopsItems: DevopsItem[] = [
  { name: 'Git & GitHub' },
  { name: 'Docker' },
  { name: 'Kubernetes' },
  { name: 'GitHub Actions' },
  { name: 'Jenkins' },
  { name: 'Postman' },
  { name: 'AWS' },
  { name: 'Cloud (EC2, S3, IAM)' },
]

function DevopsItem({ name }: DevopsItem) {
  return (
    <motion.div
      whileHover={{ backgroundColor: 'rgba(244,114,182,0.10)', borderColor: 'rgba(244,114,182,0.30)' }}
      style={{
        display: 'flex', alignItems: 'center', gap: '0.5rem',
        backgroundColor: 'rgba(244,114,182,0.05)',
        border: '0.5px solid rgba(244,114,182,0.15)',
        borderRadius: '8px', padding: '0.45rem 0.65rem',
        transition: 'all 0.2s',
      }}
    >
      {/* Diamond indicator */}
      <div style={{
        width: 6, height: 6, flexShrink: 0,
        backgroundColor: '#f472b6',
        borderRadius: '1px',
        transform: 'rotate(45deg)',
        boxShadow: '0 0 4px rgba(244,114,182,0.5)',
      }} />
      <span style={{ fontSize: '11px', fontWeight: 500, color: '#f9a8d4', letterSpacing: '0.2px', whiteSpace: 'nowrap' }}>{name}</span>
    </motion.div>
  )
}

function DevopsCard() {
  return (
    <CardShell icon="🚀" label="DevOps & Tools" labelColor="#f472b6" borderColor="rgba(244,114,182,0.2)">
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.4rem' }}>
        {devopsItems.map((item) => <DevopsItem key={item.name} {...item} />)}
      </div>
    </CardShell>
  )
}

// ── 6. FRAMEWORKS card — indigo chip grid ─────────────────────────────────────
const frameworkItems = [
  { name: 'React.js' },
  { name: 'Next.js' },
  { name: 'Node.js' },
  { name: 'Express.js' },
  { name: 'TailwindCSS' },
  { name: 'REST APIs' },
]

function FrameworkItem({ name }: { name: string }) {
  return (
    <motion.div
      whileHover={{ backgroundColor: 'rgba(129,140,248,0.12)', borderColor: 'rgba(129,140,248,0.35)' }}
      style={{
        display: 'flex', alignItems: 'center', gap: '0.5rem',
        backgroundColor: 'rgba(129,140,248,0.05)',
        border: '0.5px solid rgba(129,140,248,0.15)',
        borderRadius: '8px', padding: '0.45rem 0.65rem',
        transition: 'all 0.2s',
      }}
    >
      <div style={{
        width: 6, height: 6, flexShrink: 0,
        backgroundColor: '#818cf8',
        borderRadius: '50%',
        boxShadow: '0 0 5px rgba(129,140,248,0.55)',
      }} />
      <span style={{ fontSize: '11px', fontWeight: 500, color: '#a5b4fc', letterSpacing: '0.2px', whiteSpace: 'nowrap' }}>{name}</span>
    </motion.div>
  )
}

function FrameworksCard() {
  return (
    <CardShell icon="⚛️" label="Frameworks & Stack" labelColor="#818cf8" borderColor="rgba(129,140,248,0.2)">
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.4rem' }}>
        {frameworkItems.map((item) => <FrameworkItem key={item.name} {...item} />)}
      </div>
    </CardShell>
  )
}

// ── Section ───────────────────────────────────────────────────────────────────
export default function Skills() {
  return (
    <section
      id="skills"
      style={{ padding: '100px 1.5rem', backgroundColor: '#080b14', position: 'relative' }}
    >
      {/* Top divider */}
      <div
        className="section-divider"
        style={{
          position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)',
          width: '600px', height: '1px',
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
          <p className="section-number" style={{ marginBottom: '0.5rem' }}>// 002</p>
          <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 800, color: '#f1f5f9', letterSpacing: '-1px', paddingRight: '0.25rem' }}>
            Tech{' '}
            <span className="gradient-text" style={{ fontStyle: 'italic', paddingRight: '4px' }}>Arsenal</span>
          </h2>
          <p style={{ color: '#475569', fontSize: '0.9rem', marginTop: '0.5rem' }}>
            Tools and technologies I use to build intelligent systems
          </p>
        </motion.div>

        {/* Card grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="skills-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '1.25rem',
          }}
        >
          {/* Row 1: AI/LLM (wide) + Languages */}
          <motion.div
            variants={cardVariants}
            className="card-hover skills-ai-wide"
            style={{
              gridColumn: 'span 2',
              backgroundColor: '#0d1520',
              border: '0.5px solid #1e2a3a',
              borderRadius: '12px',
              padding: '1.5rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
            }}
          >
            {/* AI/LLM wide card inline */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <span style={{ width: 32, height: 32, borderRadius: 8, backgroundColor: 'rgba(34,211,238,0.1)', border: '0.5px solid rgba(34,211,238,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem' }}>🤖</span>
              <span style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '0.63rem', color: '#22d3ee', letterSpacing: '2px', textTransform: 'uppercase' }}>AI / LLM Technologies</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
              {aiSkills.map((s) => (
                <div key={s.name} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{ fontSize: '0.78rem', color: '#94a3b8' }}>{s.name}</span>
                  <div style={{ display: 'flex', gap: 3, flexShrink: 0 }}>
                    {Array.from({ length: 5 }).map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.05 + 0.2 }}
                        style={{ width: 7, height: 7, borderRadius: '50%', backgroundColor: i < (s.level ?? 0) ? '#22d3ee' : 'rgba(34,211,238,0.15)' }}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <LanguagesCard />

          {/* Row 2: Frameworks + Databases + Automation + DevOps */}
          <FrameworksCard />
          <DatabasesCard />
          <AutomationCard />
          <DevopsCard />
        </motion.div>
      </div>
    </section>
  )
}
