'use client'

import { FormEvent, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { personalInfo } from '@/lib/data'
import emailjs from '@emailjs/browser'

// ── EmailJS config ────────────────────────────────────────────────────────────
// 1. Sign up FREE at https://www.emailjs.com
// 2. Add Email Service (Gmail) → copy your Service ID
// 3. Create Email Template with variables: {{from_name}}, {{from_email}}, {{message}}
//    Set "To Email" in the template to: taimoorrazaasif581@gmail.com
// 4. Go to Account → API Keys → copy your Public Key
// Then replace the three values below:
const EMAILJS_SERVICE_ID  = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID  || 'YOUR_SERVICE_ID'
const EMAILJS_TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || 'YOUR_TEMPLATE_ID'
const EMAILJS_PUBLIC_KEY  = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY  || 'YOUR_PUBLIC_KEY'

// ── Icons ─────────────────────────────────────────────────────────────────────
const EnvelopeIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="20" height="20">
    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
  </svg>
)
const PhoneIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="20" height="20">
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25z" />
  </svg>
)
const LinkedInIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
)
const SpinnerIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
    style={{ animation: 'spin-slow 0.8s linear infinite' }}>
    <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
  </svg>
)
const CheckIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
  </svg>
)
const ErrorIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="8" x2="12" y2="12" />
    <line x1="12" y1="16" x2="12.01" y2="16" />
  </svg>
)

const inputStyle: React.CSSProperties = {
  width: '100%',
  backgroundColor: 'rgba(13,21,32,0.8)',
  border: '0.5px solid #1e2a3a',
  borderRadius: '8px',
  padding: '0.75rem 1rem',
  color: '#f1f5f9',
  fontSize: '0.875rem',
  fontFamily: 'Inter, sans-serif',
  outline: 'none',
  transition: 'border-color 0.2s, box-shadow 0.2s',
}

type Status = 'idle' | 'sending' | 'success' | 'error'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState<Status>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  const isConfigured =
    EMAILJS_SERVICE_ID !== 'YOUR_SERVICE_ID' &&
    EMAILJS_TEMPLATE_ID !== 'YOUR_TEMPLATE_ID' &&
    EMAILJS_PUBLIC_KEY !== 'YOUR_PUBLIC_KEY'

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!isConfigured) {
      // Fallback to mailto if EmailJS not yet configured
      const subject = encodeURIComponent(`Portfolio Contact from ${form.name}`)
      const body = encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\n\nMessage:\n${form.message}`)
      window.open(`mailto:${personalInfo.email}?subject=${subject}&body=${body}`, '_blank')
      setStatus('success')
      setTimeout(() => setStatus('idle'), 4000)
      return
    }

    setStatus('sending')
    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name: form.name,
          from_email: form.email,
          message: form.message,
          to_email: personalInfo.email,
          reply_to: form.email,
        },
        EMAILJS_PUBLIC_KEY
      )
      setStatus('success')
      setForm({ name: '', email: '', message: '' })
      setTimeout(() => setStatus('idle'), 5000)
    } catch (err: unknown) {
      // EmailJS returns an object with status and text
      type EJSError = { status?: number; text?: string; message?: string }
      const ejsErr = err as EJSError
      const detail = ejsErr?.text || ejsErr?.message || 'Unknown error'
      const code = ejsErr?.status ? ` (${ejsErr.status})` : ''
      console.error('EmailJS error:', ejsErr)
      setErrorMsg(`Send failed${code}: ${detail}. Email directly: taimoorrazaasif581@gmail.com`)
      setStatus('error')
      setTimeout(() => setStatus('idle'), 8000)
    }
  }

  const btnLabel = {
    idle: 'Send Message →',
    sending: 'Sending...',
    success: '✓ Message Sent!',
    error: '✗ Failed — try again',
  }[status]

  const btnColor = {
    idle: '#22d3ee',
    sending: '#475569',
    success: '#22c55e',
    error: '#ef4444',
  }[status]

  return (
    <section
      id="contact"
      style={{
        padding: '100px 1.5rem',
        backgroundColor: '#080b14',
        position: 'relative',
        overflow: 'hidden',
      }}
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

      {/* Background glow */}
      <div
        style={{
          position: 'absolute', bottom: '-100px', left: '50%', transform: 'translateX(-50%)',
          width: '500px', height: '300px',
          background: 'radial-gradient(ellipse, rgba(34,211,238,0.05) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <div style={{ maxWidth: '1100px', margin: '0 auto', position: 'relative' }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: '4rem' }}
        >
          <p className="section-number" style={{ marginBottom: '0.5rem' }}>// 005</p>
          <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 800, color: '#f1f5f9', letterSpacing: '-1px' }}>
            Get In Touch
          </h2>
          <p style={{ color: '#475569', fontSize: '0.9rem', marginTop: '0.5rem' }}>
            Have a project in mind? Let&apos;s build something intelligent together.
          </p>
        </motion.div>

        {/* EmailJS setup banner (only shows when not configured) */}
        {!isConfigured && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              marginBottom: '2rem',
              padding: '0.85rem 1.2rem',
              backgroundColor: 'rgba(234,179,8,0.06)',
              border: '0.5px solid rgba(234,179,8,0.3)',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
            }}
          >
            <span style={{ fontSize: '1rem' }}>⚠️</span>
            <p style={{ fontSize: '0.78rem', color: '#fbbf24', lineHeight: 1.5 }}>
              <strong>EmailJS not configured.</strong> Set <code style={{ backgroundColor: 'rgba(251,191,36,0.1)', padding: '0 4px', borderRadius: 3 }}>NEXT_PUBLIC_EMAILJS_SERVICE_ID</code>, <code style={{ backgroundColor: 'rgba(251,191,36,0.1)', padding: '0 4px', borderRadius: 3 }}>NEXT_PUBLIC_EMAILJS_TEMPLATE_ID</code>, and <code style={{ backgroundColor: 'rgba(251,191,36,0.1)', padding: '0 4px', borderRadius: 3 }}>NEXT_PUBLIC_EMAILJS_PUBLIC_KEY</code> in your <code style={{ backgroundColor: 'rgba(251,191,36,0.1)', padding: '0 4px', borderRadius: 3 }}>.env.local</code> file. Until then, the button will open your mail client.
            </p>
          </motion.div>
        )}

        {/* Split layout */}
        <div className="contact-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem' }}>

          {/* Left: Contact form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label htmlFor="contact-name" style={labelStyle}>Name</label>
                <input
                  id="contact-name"
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Your name"
                  className="input-glow"
                  style={inputStyle}
                  disabled={status === 'sending'}
                />
              </div>

              <div>
                <label htmlFor="contact-email" style={labelStyle}>Email</label>
                <input
                  id="contact-email"
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="your@email.com"
                  className="input-glow"
                  style={inputStyle}
                  disabled={status === 'sending'}
                />
              </div>

              <div>
                <label htmlFor="contact-message" style={labelStyle}>Message</label>
                <textarea
                  id="contact-message"
                  required
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="Tell me about your project..."
                  rows={5}
                  className="input-glow"
                  style={{ ...inputStyle, resize: 'vertical' }}
                  disabled={status === 'sending'}
                />
              </div>

              {/* Error message */}
              <AnimatePresence>
                {status === 'error' && (
                  <motion.p
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    style={{ fontSize: '0.78rem', color: '#f87171', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                  >
                    <ErrorIcon /> {errorMsg}
                  </motion.p>
                )}
              </AnimatePresence>

              <motion.button
                type="submit"
                id="contact-submit"
                whileTap={{ scale: 0.98 }}
                disabled={status === 'sending'}
                style={{
                  width: '100%',
                  backgroundColor: btnColor,
                  color: status === 'idle' ? '#080b14' : '#fff',
                  fontWeight: 700,
                  fontSize: '0.8rem',
                  letterSpacing: '2px',
                  textTransform: 'uppercase',
                  padding: '0.875rem',
                  borderRadius: '8px',
                  border: 'none',
                  marginTop: '0.5rem',
                  transition: 'all 0.3s',
                  boxShadow: status === 'idle' ? '0 0 20px rgba(34,211,238,0.2)' : 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                }}
                onMouseEnter={(e) => {
                  if (status === 'idle') {
                    const el = e.currentTarget as HTMLElement
                    el.style.boxShadow = '0 0 35px rgba(34,211,238,0.4)'
                    el.style.transform = 'translateY(-1px)'
                  }
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement
                  el.style.boxShadow = status === 'idle' ? '0 0 20px rgba(34,211,238,0.2)' : 'none'
                  el.style.transform = 'translateY(0)'
                }}
              >
                {status === 'sending' && <SpinnerIcon />}
                {status === 'success' && <CheckIcon />}
                {btnLabel}
              </motion.button>
            </form>
          </motion.div>

          {/* Right: Contact info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
          >
            <ContactCard icon={<EnvelopeIcon />} label="Email" value={personalInfo.email} href={`mailto:${personalInfo.email}`} />
            <ContactCard icon={<PhoneIcon />} label="Phone" value={personalInfo.phone} href={`tel:${personalInfo.phone}`} />
            <ContactCard icon={<LinkedInIcon />} label="LinkedIn" value="taimoor-raza-asif-05b333264" href={personalInfo.linkedin} />

            <div
              style={{
                marginTop: '1rem',
                padding: '1rem 1.25rem',
                backgroundColor: 'rgba(34,211,238,0.04)',
                border: '0.5px solid rgba(34,211,238,0.15)',
                borderRadius: '8px',
              }}
            >
              <p style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '0.65rem', color: '#22d3ee', letterSpacing: '1px', marginBottom: '0.4rem' }}>
                // response_time
              </p>
              <p style={{ fontSize: '0.85rem', color: '#94a3b8', lineHeight: 1.6 }}>
                I typically respond within 24 hours. For urgent matters, reach out on{' '}
                <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" style={{ color: '#22d3ee', textDecoration: 'underline' }}>
                  LinkedIn
                </a>.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

const labelStyle: React.CSSProperties = {
  display: 'block',
  fontFamily: '"JetBrains Mono", monospace',
  fontSize: '0.65rem',
  color: '#475569',
  letterSpacing: '1.5px',
  textTransform: 'uppercase',
  marginBottom: '0.4rem',
}

function ContactCard({ icon, label, value, href }: { icon: React.ReactNode; label: string; value: string; href: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="card-hover"
      style={{
        display: 'flex', alignItems: 'center', gap: '1rem',
        padding: '1rem 1.25rem',
        backgroundColor: '#0d1520',
        border: '0.5px solid #1e2a3a',
        borderRadius: '10px',
        textDecoration: 'none',
      }}
    >
      <div
        style={{
          width: 40, height: 40, borderRadius: '8px',
          backgroundColor: 'rgba(34,211,238,0.08)',
          border: '0.5px solid rgba(34,211,238,0.2)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: '#22d3ee', flexShrink: 0,
        }}
      >
        {icon}
      </div>
      <div>
        <p style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '0.6rem', color: '#475569', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '0.2rem' }}>
          {label}
        </p>
        <p style={{ fontSize: '0.85rem', color: '#f1f5f9', fontWeight: 500 }}>{value}</p>
      </div>
    </a>
  )
}
