'use client'

import { useState, useMemo, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { projects, TAB_CATEGORIES } from '@/lib/data'
import ProjectCard from '@/components/ui/ProjectCard'
import Modal from '@/components/ui/Modal'

const FAVORITES_KEY = 'portfolio_favorites'

// ── Favourites hook (persisted in localStorage) ───────────────────────────────
function useFavorites() {
  const [favorites, setFavorites] = useState<Set<string>>(new Set())

  // Load from localStorage on mount (client only)
  useEffect(() => {
    try {
      const stored = localStorage.getItem(FAVORITES_KEY)
      if (stored) setFavorites(new Set(JSON.parse(stored)))
    } catch {}
  }, [])

  const toggle = (id: string) => {
    setFavorites((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      // Persist
      try { localStorage.setItem(FAVORITES_KEY, JSON.stringify(Array.from(next))) } catch {}
      return next
    })
  }

  return { favorites, toggle }
}

// ── Sort helper: favourites always float to the top ───────────────────────────
function sortWithFavorites<T extends { id: string }>(items: T[], favorites: Set<string>) {
  return [...items].sort((a, b) => {
    const af = favorites.has(a.id) ? 0 : 1
    const bf = favorites.has(b.id) ? 0 : 1
    return af - bf
  })
}

// ── Main Projects Section ─────────────────────────────────────────────────────
export default function Projects() {
  const [activeTab, setActiveTab] = useState(0)
  const [activeId, setActiveId] = useState<string | null>(null)
  const { favorites, toggle: toggleFavorite } = useFavorites()

  const activeProject = projects.find((p) => p.id === activeId)

  // Filter by active tab, then sort favorites first
  const filtered = useMemo(() => {
    const tab = TAB_CATEGORIES[activeTab]
    const base = tab.ids === 'all' ? projects : projects.filter((p) => (tab.ids as string[]).includes(p.id))
    return sortWithFavorites(base, favorites)
  }, [activeTab, favorites])

  return (
    <section id="projects" style={{ padding: '100px 1.5rem', backgroundColor: '#080b14', position: 'relative' }}>
      {/* Section top divider */}
      <div
        style={{
          position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)',
          width: '600px', height: '1px',
          background: 'linear-gradient(90deg, transparent, rgba(34,211,238,0.3), transparent)',
        }}
      />

      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>

        {/* ── Header ────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: '2.5rem' }}
        >
          <p className="section-number" style={{ marginBottom: '0.5rem' }}>// 003</p>
          <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 800, color: '#f1f5f9', letterSpacing: '-1px' }}>
            Projects
          </h2>
          <p style={{ color: '#475569', fontSize: '0.9rem', marginTop: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
            Real systems. Real problems. Click any card to watch the demo.
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem', fontFamily: '"JetBrains Mono", monospace', fontSize: '0.68rem', color: '#f59e0b' }}>
              <svg viewBox="0 0 24 24" width="12" height="12" fill="#f59e0b"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>
              Star to favourite — floats to top
            </span>
          </p>
          {favorites.size > 0 && (
            <motion.div
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              style={{ marginTop: '0.75rem', display: 'inline-flex', alignItems: 'center', gap: '0.4rem', backgroundColor: 'rgba(245,158,11,0.08)', border: '0.5px solid rgba(245,158,11,0.25)', borderRadius: '999px', padding: '0.25rem 0.75rem' }}
            >
              <svg viewBox="0 0 24 24" width="11" height="11" fill="#f59e0b"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>
              <span style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '0.62rem', color: '#f59e0b', letterSpacing: '0.5px' }}>
                {favorites.size} favourite{favorites.size > 1 ? 's' : ''} — pinned to top in each tab
              </span>
            </motion.div>
          )}
        </motion.div>

        {/* ── Tab bar ───────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="tabs-scroll"
          style={{ display: 'flex', gap: '0.5rem', overflowX: 'auto', paddingBottom: '0.25rem', marginBottom: '2.5rem' }}
        >
          {TAB_CATEGORIES.map((tab, i) => {
            const count = tab.ids === 'all' ? projects.length : (tab.ids as string[]).length
            const favCount = tab.ids === 'all'
              ? projects.filter((p) => favorites.has(p.id)).length
              : (tab.ids as string[]).filter((id) => favorites.has(id)).length
            const active = i === activeTab
            return (
              <motion.button
                key={tab.label}
                onClick={() => setActiveTab(i)}
                whileTap={{ scale: 0.96 }}
                id={`tab-${tab.label.toLowerCase().replace(/\s/g, '-')}`}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
                  whiteSpace: 'nowrap', flexShrink: 0,
                  fontFamily: '"JetBrains Mono", monospace',
                  fontSize: '0.68rem', letterSpacing: '0.8px',
                  padding: '0.45rem 0.9rem', borderRadius: '999px',
                  border: active ? 'none' : '0.5px solid rgba(34,211,238,0.35)',
                  backgroundColor: active ? '#22d3ee' : 'transparent',
                  color: active ? '#080b14' : '#22d3ee',
                  fontWeight: active ? 700 : 400,
                  transition: 'all 0.2s ease',
                  boxShadow: active ? '0 0 18px rgba(34,211,238,0.3)' : 'none',
                }}
                onMouseEnter={(e) => { if (!active) (e.currentTarget as HTMLElement).style.backgroundColor = 'rgba(34,211,238,0.1)' }}
                onMouseLeave={(e) => { if (!active) (e.currentTarget as HTMLElement).style.backgroundColor = 'transparent' }}
              >
                {tab.label}
                {/* Project count */}
                <span style={{ backgroundColor: active ? 'rgba(8,11,20,0.25)' : 'rgba(34,211,238,0.12)', borderRadius: '999px', padding: '0.05rem 0.4rem', fontSize: '0.58rem' }}>
                  {count}
                </span>
                {/* Favourite count badge */}
                {favCount > 0 && (
                  <span style={{ backgroundColor: active ? 'rgba(8,11,20,0.25)' : 'rgba(245,158,11,0.15)', color: active ? '#080b14' : '#f59e0b', borderRadius: '999px', padding: '0.05rem 0.4rem', fontSize: '0.58rem', display: 'flex', alignItems: 'center', gap: '2px' }}>
                    ★{favCount}
                  </span>
                )}
              </motion.button>
            )
          })}
        </motion.div>

        {/* ── Project grid ──────────────────────────────── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="project-grid-responsive"
            style={{ gap: '1.1rem' }}
          >
            {filtered.map((project, i) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                style={{ display: 'flex', flexDirection: 'column' }}
              >
                <ProjectCard
                  project={project}
                  onPlay={setActiveId}
                  isFavorite={favorites.has(project.id)}
                  onToggleFavorite={toggleFavorite}
                />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Video Modal */}
      {activeProject?.youtubeId && (
        <Modal
          isOpen={!!activeId}
          youtubeId={activeProject.youtubeId}
          title={activeProject.title}
          onClose={() => setActiveId(null)}
        />
      )}
    </section>
  )
}
