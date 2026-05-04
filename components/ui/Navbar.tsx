'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { navLinks, personalInfo } from '@/lib/data'

const GitHubIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
  </svg>
)

const LinkedInIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
)

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleLinkClick = () => setMenuOpen(false)

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: 1.9 }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        backgroundColor: scrolled ? 'rgba(8,11,20,0.85)' : 'transparent',
        backdropFilter: scrolled ? 'blur(16px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(30,42,58,0.8)' : '1px solid transparent',
        transition: 'all 0.3s ease',
      }}
    >
      <div
        style={{
          maxWidth: '1100px',
          margin: '0 auto',
          padding: '0 1.5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: '64px',
        }}
      >
        {/* Logo */}
        <Link href="/" style={{ textDecoration: 'none' }}>
          <span
            style={{
              fontFamily: '"JetBrains Mono", monospace',
              fontWeight: 700,
              fontSize: '1.25rem',
              color: '#22d3ee',
              letterSpacing: '0.25rem',
              textShadow: '0 0 15px rgba(34,211,238,0.4)',
            }}
          >
            TRA
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              style={{
                fontFamily: '"JetBrains Mono", monospace',
                fontSize: '0.6875rem',
                letterSpacing: '1.5px',
                textTransform: 'uppercase',
                color: '#94a3b8',
                textDecoration: 'none',
                transition: 'color 0.2s',
                position: 'relative',
              }}
              className="hover-nav-link"
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = '#22d3ee' }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = '#94a3b8' }}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Right: socials + CTA */}
        <div className="hidden md:flex items-center gap-4">
          <a
            href={personalInfo.github}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: '#94a3b8', transition: 'color 0.2s' }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = '#22d3ee' }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = '#94a3b8' }}
          >
            <GitHubIcon />
          </a>
          <a
            href={personalInfo.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: '#94a3b8', transition: 'color 0.2s' }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = '#22d3ee' }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = '#94a3b8' }}
          >
            <LinkedInIcon />
          </a>
          <a
            href={`mailto:${personalInfo.email}`}
            className="btn-press"
            style={{
              fontFamily: '"JetBrains Mono", monospace',
              fontSize: '0.6875rem',
              letterSpacing: '1.5px',
              textTransform: 'uppercase',
              color: '#22d3ee',
              border: '1px solid rgba(34,211,238,0.4)',
              padding: '0.4rem 1rem',
              borderRadius: '4px',
              textDecoration: 'none',
              transition: 'all 0.2s',
              backgroundColor: 'rgba(34,211,238,0.05)',
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLElement
              el.style.backgroundColor = 'rgba(34,211,238,0.15)'
              el.style.boxShadow = '0 0 15px rgba(34,211,238,0.2)'
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLElement
              el.style.backgroundColor = 'rgba(34,211,238,0.05)'
              el.style.boxShadow = 'none'
            }}
          >
            Hire Me
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          style={{ background: 'none', border: 'none' }}
          aria-label="Toggle menu"
          id="hamburger-btn"
        >
          <motion.span
            animate={menuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
            style={{ display: 'block', width: 22, height: 2, backgroundColor: '#22d3ee', borderRadius: 2 }}
          />
          <motion.span
            animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
            style={{ display: 'block', width: 22, height: 2, backgroundColor: '#22d3ee', borderRadius: 2 }}
          />
          <motion.span
            animate={menuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
            style={{ display: 'block', width: 22, height: 2, backgroundColor: '#22d3ee', borderRadius: 2 }}
          />
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            style={{
              backgroundColor: 'rgba(8,11,20,0.97)',
              borderTop: '1px solid rgba(30,42,58,0.8)',
              backdropFilter: 'blur(16px)',
              overflow: 'hidden',
            }}
          >
            <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={handleLinkClick}
                  style={{
                    fontFamily: '"JetBrains Mono", monospace',
                    fontSize: '0.875rem',
                    letterSpacing: '1.5px',
                    textTransform: 'uppercase',
                    color: '#94a3b8',
                    textDecoration: 'none',
                  }}
                >
                  {link.label}
                </Link>
              ))}
              <div style={{ display: 'flex', gap: '1rem', paddingTop: '0.5rem' }}>
                <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" style={{ color: '#94a3b8' }}>
                  <GitHubIcon />
                </a>
                <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" style={{ color: '#94a3b8' }}>
                  <LinkedInIcon />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
