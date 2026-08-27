import { motion } from 'framer-motion'

const orbit = [
  { label: 'Learn', x: '12%', y: '22%', delay: 0.15 },
  { label: 'Build', x: '68%', y: '14%', delay: 0.25 },
  { label: 'Assess', x: '78%', y: '58%', delay: 0.35 },
  { label: 'Deploy', x: '42%', y: '76%', delay: 0.45 },
  { label: 'Grow', x: '8%', y: '62%', delay: 0.55 },
]

export function HeroVisual() {
  return (
    <div className="hero-visual" aria-hidden>
      <div className="hv-grid" />
      <div className="hv-glow hv-glow-a" />
      <div className="hv-glow hv-glow-b" />
      <div className="hv-ring" />

      <svg className="hv-lines" viewBox="0 0 100 100" preserveAspectRatio="none">
        <path className="hv-path" d="M20 30 C 34 18, 48 16, 62 22" />
        <path className="hv-path" d="M64 24 C 74 30, 78 42, 76 54" />
        <path className="hv-path" d="M74 58 C 66 68, 54 74, 44 76" />
        <path className="hv-path" d="M42 74 C 28 70, 18 56, 16 42" />
        <path className="hv-path" d="M18 40 C 16 34, 18 30, 22 28" />
      </svg>

      {orbit.map((node) => (
        <motion.div
          key={node.label}
          className="hv-chip"
          style={{ left: node.x, top: node.y }}
          initial={{ opacity: 0, scale: 0.85, y: 8 }}
          animate={{ opacity: 1, scale: 1, y: [0, -6, 0] }}
          transition={{
            opacity: { delay: node.delay, duration: 0.4 },
            scale: { delay: node.delay, duration: 0.4 },
            y: { delay: node.delay + 0.4, duration: 3.6, repeat: Infinity, ease: 'easeInOut' },
          }}
        >
          <span className="hv-chip-dot" />
          {node.label}
        </motion.div>
      ))}

      <motion.div
        className="hv-platform"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.65 }}
      >
        <img src="/img/labs-banner.png" alt="" />
        <div className="hv-platform-body">
          <strong>Training Factory</strong>
          <span>Learn · Lab · Deploy</span>
        </div>
      </motion.div>

      <motion.div
        className="hv-float-card hv-float-a"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: [0, -8, 0] }}
        transition={{ delay: 0.45, duration: 4.2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <small>Focus</small>
        <b>Skill · Level · Role</b>
      </motion.div>

      <motion.div
        className="hv-float-card hv-float-b"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: [0, 7, 0] }}
        transition={{ delay: 0.6, duration: 3.8, repeat: Infinity, ease: 'easeInOut' }}
      >
        <small>Outcome</small>
        <b>Siemens BMS</b>
      </motion.div>
    </div>
  )
}
