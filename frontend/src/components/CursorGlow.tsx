import { useEffect } from 'react'
import { motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion'

export function CursorGlow() {
  const reduce = useReducedMotion()
  const x = useMotionValue(-500)
  const y = useMotionValue(-500)
  const sx = useSpring(x, { stiffness: 55, damping: 20, mass: 0.6 })
  const sy = useSpring(y, { stiffness: 55, damping: 20, mass: 0.6 })

  useEffect(() => {
    if (reduce) return
    function handleMove(e: PointerEvent) {
      if (e.pointerType === 'touch') return
      x.set(e.clientX)
      y.set(e.clientY)
    }
    window.addEventListener('pointermove', handleMove, { passive: true })
    return () => window.removeEventListener('pointermove', handleMove)
  }, [reduce, x, y])

  if (reduce) return null

  return <motion.div className="cursor-glow" style={{ translateX: sx, translateY: sy }} aria-hidden />
}
