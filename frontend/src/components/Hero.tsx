import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { motion, useReducedMotion } from 'framer-motion'
import { SITE } from '../data/content'
import { AmbientSpace } from './AmbientSpace'

export function Hero() {
  const reduce = useReducedMotion()

  return (
    <section className="hero-edu" aria-label="Welcome">
      <div className="hero-edu-bg" aria-hidden />
      <AmbientSpace variant="hero" />

      <div className="container hero-edu-grid">
        <div className="hero-edu-copy">
          <motion.p
            className="edu-kicker"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
          >
            Learning & Development Center · Bengaluru
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          >
            {SITE.name}
          </motion.h1>

          <motion.p
            className="hero-edu-title"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.14, duration: 0.5 }}
          >
            {SITE.tagline}
          </motion.p>

          <motion.p
            className="hero-edu-lead"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Hands-on labs, mentorship, and role-aligned training so students move from campus to
            careers — including BMS placements at Siemens.
          </motion.p>

          <motion.div
            className="hero-actions"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.28, duration: 0.45 }}
          >
            <Link to="/services" className="btn btn-primary">
              Explore programs <ArrowRight size={18} />
            </Link>
            <Link to="/contact" className="btn btn-soft">
              Talk to us
            </Link>
          </motion.div>

          <motion.ul
            className="hero-edu-points"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.38 }}
          >
            {['Role-ready learning', 'Training Factory labs', 'Industry mentorship'].map((label, i) => (
              <motion.li
                key={label}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + i * 0.08 }}
              >
                {label}
              </motion.li>
            ))}
          </motion.ul>
        </div>

        <motion.div
          className="hero-edu-media"
          initial={{ opacity: 0, y: 24, scale: 0.98 }}
          animate={
            reduce
              ? { opacity: 1, y: 0, scale: 1 }
              : { opacity: 1, y: [0, -8, 0], scale: 1 }
          }
          transition={
            reduce
              ? { delay: 0.18, duration: 0.55 }
              : {
                  opacity: { delay: 0.18, duration: 0.55 },
                  scale: { delay: 0.18, duration: 0.55 },
                  y: { delay: 0.7, duration: 5.5, repeat: Infinity, ease: 'easeInOut' },
                }
          }
        >
          <div className="hero-media-ring" aria-hidden />
          <img src="/img/labs-banner.png" alt="NATTLABS hands-on learning labs" />
          <motion.div
            className="hero-edu-badge"
            animate={reduce ? undefined : { y: [0, 6, 0] }}
            transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
          >
            <strong>6-month</strong>
            <span>BMS intensive · Siemens pathway</span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
