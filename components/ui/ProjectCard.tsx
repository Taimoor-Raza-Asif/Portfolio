'use client'

import { motion } from 'framer-motion'
import { Project } from '@/lib/data'

interface ProjectCardProps {
  project: Project
  onPlay: (id: string) => void
  isFavorite: boolean
  onToggleFavorite: (id: string) => void
}

const GitHubIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="13" height="13">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
  </svg>
)
const ExternalIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="13" height="13">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    <polyline points="15 3 21 3 21 9" />
    <line x1="10" y1="14" x2="21" y2="3" />
  </svg>
)
const LockIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="13" height="13">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
)
const PlayIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="26" height="26">
    <path d="M8 5v14l11-7z" />
  </svg>
)

// Star icon — filled gold when fav, outline when not
const StarIcon = ({ filled }: { filled: boolean }) => (
  <svg
    viewBox="0 0 24 24"
    width="16"
    height="16"
    fill={filled ? '#f59e0b' : 'none'}
    stroke={filled ? '#f59e0b' : 'rgba(148,163,184,0.6)'}
    strokeWidth="1.8"
    style={{ display: 'block', transition: 'all 0.2s' }}
  >
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
)

export default function ProjectCard({ project, onPlay, isFavorite, onToggleFavorite }: ProjectCardProps) {
  // Prefer local thumbnail; fall back to YouTube API thumbnail
  const thumbnailUrl = project.thumbnail
    ? project.thumbnail
    : project.youtubeId
    ? `https://img.youtube.com/vi/${project.youtubeId}/maxresdefault.jpg`
    : null

  const hasVideo = !!project.youtubeId
  const hasDrive = !!project.driveLink

  const renderThumbnailBadge = () => {
    if (project.liveDemo) {
      return (
        <span style={{
          position: 'absolute', top: 8, left: 8,
          backgroundColor: 'rgba(34,197,94,0.9)', color: '#fff',
          fontFamily: '"JetBrains Mono", monospace', fontSize: '0.58rem',
          fontWeight: 700, letterSpacing: '1px', padding: '0.18rem 0.55rem',
          borderRadius: '999px', backdropFilter: 'blur(4px)', zIndex: 2,
        }}>
          Live ↗
        </span>
      )
    }
    if (project.privateRepo) {
      return (
        <span title="Private Repository" style={{
          position: 'absolute', top: 8, left: 8,
          backgroundColor: 'rgba(129,140,248,0.85)', color: '#fff',
          fontFamily: '"JetBrains Mono", monospace', fontSize: '0.58rem',
          fontWeight: 700, letterSpacing: '1px', padding: '0.18rem 0.55rem',
          borderRadius: '999px', backdropFilter: 'blur(4px)', zIndex: 2,
          display: 'flex', alignItems: 'center', gap: '0.25rem',
        }}>
          <LockIcon /> Private
        </span>
      )
    }
    if (project.github && !project.privateRepo) {
      return (
        <span style={{
          position: 'absolute', top: 8, left: 8,
          backgroundColor: 'rgba(71,85,105,0.85)', color: '#cbd5e1',
          fontFamily: '"JetBrains Mono", monospace', fontSize: '0.58rem',
          fontWeight: 700, letterSpacing: '1px', padding: '0.18rem 0.55rem',
          borderRadius: '999px', backdropFilter: 'blur(4px)', zIndex: 2,
        }}>
          GitHub
        </span>
      )
    }
    return null
  }

  return (
    <div
      className="card-hover"
      style={{
        backgroundColor: '#0d1520',
        border: isFavorite ? '0.5px solid rgba(245,158,11,0.4)' : '0.5px solid #1e2a3a',
        borderRadius: '12px',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        position: 'relative',
        boxShadow: isFavorite ? '0 0 20px rgba(245,158,11,0.06)' : 'none',
        transition: 'border-color 0.3s, box-shadow 0.3s',
      }}
    >
      {/* ── Favorite star button ─────────────────────────── */}
      <motion.button
        onClick={(e) => { e.stopPropagation(); onToggleFavorite(project.id) }}
        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 0.9 }}
        title={isFavorite ? 'Remove from favourites' : 'Add to favourites'}
        id={`fav-${project.id}`}
        style={{
          position: 'absolute',
          top: 8,
          right: 8,
          zIndex: 10,
          backgroundColor: isFavorite ? 'rgba(245,158,11,0.15)' : 'rgba(8,11,20,0.65)',
          backdropFilter: 'blur(6px)',
          border: isFavorite ? '0.5px solid rgba(245,158,11,0.4)' : '0.5px solid rgba(148,163,184,0.2)',
          borderRadius: '50%',
          width: 30,
          height: 30,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'all 0.2s',
        }}
      >
        <StarIcon filled={isFavorite} />
      </motion.button>

      {/* ── Thumbnail / Media area ─────────────────────────── */}
      <div
        style={{
          position: 'relative',
          aspectRatio: '16/9',
          overflow: 'hidden',
          backgroundColor: '#080b14',
          flexShrink: 0,
          cursor: hasVideo ? 'pointer' : 'default',
        }}
        onClick={() => hasVideo && onPlay(project.id)}
        role={hasVideo ? 'button' : undefined}
        tabIndex={hasVideo ? 0 : undefined}
        onKeyDown={(e) => hasVideo && e.key === 'Enter' && onPlay(project.id)}
        aria-label={hasVideo ? `Play demo for ${project.title}` : undefined}
      >
        {thumbnailUrl ? (
          <>
            <img
              src={thumbnailUrl}
              alt={`${project.title} demo`}
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 0.4s ease' }}
              onMouseEnter={(e) => { if (hasVideo) (e.currentTarget as HTMLElement).style.transform = 'scale(1.05)' }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.transform = 'scale(1)' }}
              onError={(e) => {
                const img = e.currentTarget as HTMLImageElement
                // Only retry with hqdefault for YouTube thumbnails (not local images)
                if (project.youtubeId && img.src.includes('maxresdefault')) {
                  img.src = `https://img.youtube.com/vi/${project.youtubeId}/hqdefault.jpg`
                }
              }}
            />
            {hasVideo && (
              <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(to bottom, transparent 30%, rgba(8,11,20,0.65) 100%)' }}>
                <div
                  style={{ width: 48, height: 48, borderRadius: '50%', backgroundColor: 'rgba(34,211,238,0.92)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#080b14', boxShadow: '0 0 28px rgba(34,211,238,0.5)', transition: 'transform 0.2s, box-shadow 0.2s' }}
                  onMouseEnter={(e) => { const el = e.currentTarget as HTMLElement; el.style.transform = 'scale(1.12)'; el.style.boxShadow = '0 0 50px rgba(34,211,238,0.8)' }}
                  onMouseLeave={(e) => { const el = e.currentTarget as HTMLElement; el.style.transform = 'scale(1)'; el.style.boxShadow = '0 0 28px rgba(34,211,238,0.5)' }}
                >
                  <PlayIcon />
                </div>
              </div>
            )}
          </>
        ) : hasDrive ? (
          <a
            href={project.driveLink}
            target="_blank"
            rel="noopener noreferrer"
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%', gap: '0.75rem', textDecoration: 'none', background: 'linear-gradient(135deg, #080b14 0%, #0d1a2a 100%)' }}
          >
            <div style={{ width: 48, height: 48, borderRadius: '50%', backgroundColor: 'rgba(34,211,238,0.1)', border: '1px solid rgba(34,211,238,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#22d3ee' }}>
              <PlayIcon />
            </div>
            <span style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '0.62rem', color: '#22d3ee', letterSpacing: '1.5px' }}>
              WATCH DEMO ↗
            </span>
          </a>
        ) : (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%', background: 'linear-gradient(135deg, #080b14 0%, #0d1a2a 100%)' }}>
            <span style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '1.75rem', color: 'rgba(34,211,238,0.12)' }}>{'{ }'}</span>
          </div>
        )}

        {renderThumbnailBadge()}
      </div>

      {/* ── Card Body ──────────────────────────────────────── */}
      <div style={{ padding: '1.1rem 1.2rem', display: 'flex', flexDirection: 'column', gap: '0.55rem', flex: 1 }}>
        {/* Favourite label */}
        {isFavorite && (
          <motion.div
            initial={{ opacity: 0, x: -6 }}
            animate={{ opacity: 1, x: 0 }}
            style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}
          >
            <StarIcon filled />
            <span style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '0.55rem', color: '#f59e0b', letterSpacing: '1.5px', textTransform: 'uppercase' }}>
              Favourite
            </span>
          </motion.div>
        )}

        {/* Category */}
        <span style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '0.6rem', color: '#22d3ee', letterSpacing: '2px', textTransform: 'uppercase' }}>
          // {project.category}
        </span>

        {/* Title */}
        <h3 style={{ fontSize: '0.925rem', fontWeight: 700, color: '#f1f5f9', lineHeight: 1.4 }}>
          {project.title}
        </h3>

        {/* Description — 2 lines clamped */}
        <p style={{ fontSize: '0.78rem', color: '#94a3b8', lineHeight: 1.6, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', flex: 1 }}>
          {project.description}
        </p>

        {/* Tech chips */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem', marginTop: '0.1rem' }}>
          {project.tech.slice(0, 4).map((t) => (
            <motion.span key={t} whileHover={{ scale: 1.05 }} transition={{ type: 'spring', stiffness: 400, damping: 20 }} style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '0.58rem', color: '#22d3ee', backgroundColor: 'rgba(34,211,238,0.05)', border: '0.5px solid rgba(34,211,238,0.2)', borderRadius: '4px', padding: '0.18rem 0.5rem', letterSpacing: '0.5px', display: 'inline-block' }}>
              {t}
            </motion.span>
          ))}
          {project.tech.length > 4 && (
            <span style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '0.58rem', color: '#475569', padding: '0.18rem 0.4rem' }}>+{project.tech.length - 4}</span>
          )}
        </div>

        {/* Links row */}
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', paddingTop: '0.4rem', borderTop: '0.5px solid rgba(30,42,58,0.6)', marginTop: '0.25rem' }}>
          {project.youtubeId && (
            <button onClick={() => onPlay(project.id)} id={`play-${project.id}`} style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontFamily: '"JetBrains Mono", monospace', fontSize: '0.6rem', color: '#22d3ee', background: 'none', border: 'none', letterSpacing: '1px', textTransform: 'uppercase', transition: 'opacity 0.2s' }} onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.opacity = '0.7' }} onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.opacity = '1' }}>
              <ExternalIcon /> Demo
            </button>
          )}
          {project.driveLink && (
            <a href={project.driveLink} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontFamily: '"JetBrains Mono", monospace', fontSize: '0.6rem', color: '#22d3ee', textDecoration: 'none', letterSpacing: '1px', textTransform: 'uppercase', transition: 'opacity 0.2s' }} onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.opacity = '0.7' }} onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.opacity = '1' }}>
              <ExternalIcon /> Demo
            </a>
          )}
          {project.liveDemo && (
            <a href={project.liveDemo} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontFamily: '"JetBrains Mono", monospace', fontSize: '0.6rem', color: '#22c55e', textDecoration: 'none', letterSpacing: '1px', textTransform: 'uppercase', transition: 'opacity 0.2s' }} onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.opacity = '0.7' }} onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.opacity = '1' }}>
              <ExternalIcon /> Live
            </a>
          )}
          {project.github && !project.privateRepo && (
            <a href={project.github} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontFamily: '"JetBrains Mono", monospace', fontSize: '0.6rem', color: '#94a3b8', textDecoration: 'none', letterSpacing: '1px', textTransform: 'uppercase', transition: 'color 0.2s', marginLeft: 'auto' }} onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = '#f1f5f9' }} onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = '#94a3b8' }}>
              <GitHubIcon /> Code
            </a>
          )}
          {project.privateRepo && (
            <span title="Private Repository" style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', fontFamily: '"JetBrains Mono", monospace', fontSize: '0.6rem', color: '#475569', marginLeft: 'auto', letterSpacing: '1px' }}>
              <LockIcon /> Private
            </span>
          )}
        </div>
      </div>
    </div>
  )
}
