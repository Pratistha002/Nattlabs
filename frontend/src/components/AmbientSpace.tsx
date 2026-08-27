import { useEffect, useMemo } from 'react'
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'framer-motion'

type Props = {
  variant?: 'hero' | 'band'
  className?: string
}

const PARTICLE_SEED = [
  { x: 8, y: 18, s: 3, d: 0 },
  { x: 18, y: 72, s: 2, d: 0.4 },
  { x: 28, y: 34, s: 4, d: 0.8 },
  { x: 42, y: 12, s: 2, d: 1.1 },
  { x: 55, y: 68, s: 3, d: 0.2 },
  { x: 66, y: 28, s: 2, d: 1.4 },
  { x: 74, y: 54, s: 5, d: 0.6 },
  { x: 86, y: 16, s: 2, d: 1.8 },
  { x: 92, y: 78, s: 3, d: 0.9 },
  { x: 12, y: 48, s: 2, d: 1.6 },
  { x: 48, y: 86, s: 3, d: 0.3 },
  { x: 78, y: 42, s: 2, d: 1.2 },
  { x: 34, y: 58, s: 2, d: 2.1 },
  { x: 62, y: 8, s: 3, d: 0.5 },
  { x: 6, y: 62, s: 2, d: 1.9 },
]

const SHOOTING_STARS = [
  { top: '14%', left: '58%', delay: 1.4, duration: 1.6, repeatDelay: 7 },
  { top: '34%', left: '84%', delay: 5.2, duration: 1.4, repeatDelay: 9 },
  { top: '70%', left: '18%', delay: 8.6, duration: 1.8, repeatDelay: 8 },
]

export function AmbientSpace({ variant = 'hero', className = '' }: Props) {
  const reduce = useReducedMotion()
  const particles = useMemo(() => PARTICLE_SEED, [])

  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const px = useSpring(mx, { stiffness: 55, damping: 18, mass: 0.5 })
  const py = useSpring(my, { stiffness: 55, damping: 18, mass: 0.5 })

  const orbitAX = useTransform(px, [-1, 1], [-16, 16])
  const orbitAY = useTransform(py, [-1, 1], [-12, 12])
  const orbitBX = useTransform(px, [-1, 1], [12, -12])
  const orbitBY = useTransform(py, [-1, 1], [9, -9])
  const orbAX = useTransform(px, [-1, 1], [-22, 22])
  const orbAY = useTransform(py, [-1, 1], [-18, 18])
  const orbBX = useTransform(px, [-1, 1], [16, -16])
  const orbBY = useTransform(py, [-1, 1], [-12, 12])

  useEffect(() => {
    if (reduce) return
    function handlePointer(e: PointerEvent) {
      const relX = e.clientX / window.innerWidth
      const relY = e.clientY / window.innerHeight
      mx.set((relX - 0.5) * 2)
      my.set((relY - 0.5) * 2)
    }
    window.addEventListener('pointermove', handlePointer, { passive: true })
    return () => window.removeEventListener('pointermove', handlePointer)
  }, [reduce, mx, my])

  if (reduce) {
    return <div className={`ambient-space ambient-${variant} ${className}`} aria-hidden />
  }

  return (
    <div className={`ambient-space ambient-${variant} ${className}`} aria-hidden>
      <motion.div className="ambient-orbit ambient-orbit-a" style={{ x: orbitAX, y: orbitAY }} />
      <motion.div className="ambient-orbit ambient-orbit-b" style={{ x: orbitBX, y: orbitBY }} />
      <motion.div className="ambient-orb ambient-orb-a" style={{ x: orbAX, y: orbAY }} />
      <motion.div className="ambient-orb ambient-orb-b" style={{ x: orbBX, y: orbBY }} />
      <div className="ambient-orb ambient-orb-c" />

      {particles.map((p, i) => (
        <motion.span
          key={i}
          className="ambient-dot"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.s,
            height: p.s,
          }}
          animate={{
            y: [0, -10 - (i % 4) * 3, 0],
            opacity: [0.25, 0.85, 0.25],
            scale: [1, 1.35, 1],
          }}
          transition={{
            duration: 4.5 + (i % 5) * 0.55,
            delay: p.d,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}

      {SHOOTING_STARS.map((s, i) => (
        <motion.span
          key={`shoot-${i}`}
          className="ambient-shooting-star"
          style={{ top: s.top, left: s.left }}
          initial={{ opacity: 0, x: 0, y: 0, rotate: 28 }}
          animate={{ opacity: [0, 1, 0], x: [0, 110, 160], y: [0, 55, 80], rotate: 28 }}
          transition={{
            duration: s.duration,
            delay: s.delay,
            repeat: Infinity,
            repeatDelay: s.repeatDelay,
            ease: 'easeIn',
          }}
        />
      ))}
    </div>
  )
}
