'use client'

import { useEffect, useRef } from 'react'
import { motion, useSpring, useMotionValue } from 'framer-motion'

export default function CustomCursor() {
  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)

  const springConfig = { damping: 25, stiffness: 300 }
  const springX = useSpring(cursorX, springConfig)
  const springY = useSpring(cursorY, springConfig)

  useEffect(() => {
    const move = (e: MouseEvent) => {
      cursorX.set(e.clientX - 6)
      cursorY.set(e.clientY - 6)
    }
    window.addEventListener('mousemove', move)
    return () => window.removeEventListener('mousemove', move)
  }, [cursorX, cursorY])

  return (
    <>
      {/* Main dot */}
      <motion.div
        style={{ x: springX, y: springY }}
        className="fixed top-0 left-0 z-[9999] pointer-events-none"
      >
        <div
          style={{
            width: 12,
            height: 12,
            borderRadius: '50%',
            backgroundColor: '#22d3ee',
            boxShadow: '0 0 10px rgba(34,211,238,0.8), 0 0 20px rgba(34,211,238,0.4)',
          }}
        />
      </motion.div>

      {/* Outer ring */}
      <motion.div
        style={{
          x: springX,
          y: springY,
          translateX: -14,
          translateY: -14,
        }}
        className="fixed top-0 left-0 z-[9998] pointer-events-none"
      >
        <div
          style={{
            width: 40,
            height: 40,
            borderRadius: '50%',
            border: '1px solid rgba(34,211,238,0.3)',
          }}
        />
      </motion.div>
    </>
  )
}
