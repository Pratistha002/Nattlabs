import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { motion, useReducedMotion } from 'framer-motion'
import { SITE } from '../data/content'
import { AmbientSpace } from './AmbientSpace'
import { HighlightCarousel, type HighlightSlide } from './HighlightCarousel'

const HERO_SLIDES: HighlightSlide[] = [
  {
    image: '/img/labs-banner.png',
    kicker: 'Training Factory',
    title: 'Hands-on labs, not only theory',
    text: 'Practice BMS, HVAC, and role-ready work in NATTLABS labs.',
    href: '/services',
    cta: 'Explore labs',
  },
  {
    image: '/img/career-section.jpg',
    kicker: 'BMS pathway',
    title: '6-month intensive · Siemens placements',
    text: 'Role-aligned BMS training that has helped learners join Siemens.',
    href: '/success-stories',
    cta: 'See outcomes',
  },
  {
    image: '/img/solution-banner-img.jpg',
    kicker: 'Solutions',
    title: 'From acquire to deploy',
    text: 'Profile, train, assess, and deploy talent with a clear pathway.',
    href: '/solution',
    cta: 'View solution',
  },
  {
    image: '/img/industries.jpg',
    kicker: 'Industries',
    title: 'IT first, expanding across verticals',
    text: 'Programs built around real industry roles and production needs.',
    href: '/industries',
    cta: 'See industries',
  },
  {
    image: '/img/trans-img.png',
    kicker: 'Transformation',
    title: 'Role-ready learning, not generic courses',
    text: 'We map SKILL, LEVEL, and ROLE so learners train for the job they will do.',
    href: '/transformation',
    cta: 'Our approach',
  },
  {
    image: '/img/value-banner.jpg',
    kicker: 'Our culture',
    title: 'Honesty, integrity, and humanity',
    text: 'The values behind every classroom, lab, and placement at NATTLABS.',
    href: '/values',
    cta: 'Our values',
  },
]

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
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          >
            {SITE.name}
          </motion.h1>

          <motion.p
            className="hero-edu-title"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.14, duration: 0.5 }}
          >
            {SITE.tagline}
          </motion.p>

          <motion.p
            className="hero-edu-lead"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Hands-on labs, mentorship, and role-aligned training so students move from campus to
            careers — including BMS placements at Siemens.
          </motion.p>

          <motion.div
            className="hero-actions"
            initial={{ opacity: 0, y: 10 }}
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
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.18, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          {!reduce && <div className="hero-media-ring" aria-hidden />}
          <HighlightCarousel slides={HERO_SLIDES} />
        </motion.div>
      </div>
    </section>
  )
}
