'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function LoadingScreen() {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), 1800)
    return () => clearTimeout(timer)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.5 } }}
          className="fixed inset-0 z-[10000] flex items-center justify-center"
          style={{ backgroundColor: '#080b14' }}
        >
          {/* Grid background */}
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                'linear-gradient(rgba(34,211,238,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(34,211,238,0.04) 1px, transparent 1px)',
              backgroundSize: '40px 40px',
            }}
          />

          {/* Logo */}
          <div className="relative flex flex-col items-center gap-6">
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            >
              <span
                style={{
                  fontFamily: '"JetBrains Mono", monospace',
                  fontSize: '4rem',
                  fontWeight: 700,
                  color: '#22d3ee',
                  letterSpacing: '0.3rem',
                  textShadow: '0 0 30px rgba(34,211,238,0.6)',
                }}
              >
                TRA
              </span>
            </motion.div>

            {/* Progress bar */}
            <motion.div
              className="h-px w-48 rounded-full overflow-hidden"
              style={{ backgroundColor: 'rgba(34,211,238,0.15)' }}
            >
              <motion.div
                className="h-full rounded-full"
                style={{ backgroundColor: '#22d3ee' }}
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: 1.4, ease: 'easeInOut' }}
              />
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              transition={{ delay: 0.4 }}
              style={{
                fontFamily: '"JetBrains Mono", monospace',
                fontSize: '0.75rem',
                color: '#22d3ee',
                letterSpacing: '3px',
              }}
            >
              INITIALIZING...
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
