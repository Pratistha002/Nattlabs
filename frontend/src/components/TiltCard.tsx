import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'framer-motion'
import type { PointerEvent, ReactNode } from 'react'

type Props = {
  children: ReactNode
  className?: string
}

export function TiltCard({ children, className = '' }: Props) {
  const reduce = useReducedMotion()
  const px = useMotionValue(0.5)
  const py = useMotionValue(0.5)
  const sx = useSpring(px, { stiffness: 220, damping: 20, mass: 0.4 })
  const sy = useSpring(py, { stiffness: 220, damping: 20, mass: 0.4 })
  const rotateX = useTransform(sy, [0, 1], [7, -7])
  const rotateY = useTransform(sx, [0, 1], [-7, 7])
  const glowX = useTransform(sx, [0, 1], ['6%', '94%'])
  const glowY = useTransform(sy, [0, 1], ['6%', '94%'])

  if (reduce) {
    return <div className={`tilt-card ${className}`}>{children}</div>
  }

  function handleMove(e: PointerEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect()
    px.set((e.clientX - rect.left) / rect.width)
    py.set((e.clientY - rect.top) / rect.height)
  }

  function handleLeave() {
    px.set(0.5)
    py.set(0.5)
  }

  return (
    <motion.div
      className={`tilt-card ${className}`}
      style={{ rotateX, rotateY, transformPerspective: 900 }}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
    >
      <motion.span className="tilt-card-glow" style={{ left: glowX, top: glowY }} aria-hidden />
      {children}
    </motion.div>
  )
}
