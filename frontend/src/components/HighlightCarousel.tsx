import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'

export type HighlightSlide = {
  image: string
  kicker: string
  title: string
  text: string
  href: string
  cta: string
}

type Props = {
  slides: HighlightSlide[]
  intervalMs?: number
}

export function HighlightCarousel({ slides, intervalMs = 5200 }: Props) {
  const reduce = useReducedMotion()
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (reduce || paused || slides.length < 2) return
    const id = window.setInterval(() => {
      setIndex((v) => (v + 1) % slides.length)
    }, intervalMs)
    return () => window.clearInterval(id)
  }, [reduce, paused, slides.length, intervalMs])

  if (!slides.length) return null
  const slide = slides[index]
  const go = (next: number) => setIndex((next + slides.length) % slides.length)
  const fade = reduce
    ? { initial: { opacity: 1 }, animate: { opacity: 1 }, exit: { opacity: 1 } }
    : {
        initial: { opacity: 0, scale: 1.02 },
        animate: { opacity: 1, scale: 1 },
        exit: { opacity: 0, scale: 0.995 },
      }

  return (
    <div
      className="hl-carousel hero"
      role="region"
      aria-roledescription="carousel"
      aria-label="NATTLABS highlights"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <AnimatePresence mode="wait">
        <motion.article
          key={slide.image + slide.title}
          className="hl-slide"
          initial={fade.initial}
          animate={fade.animate}
          exit={fade.exit}
          transition={{ duration: reduce ? 0 : 0.45, ease: [0.22, 1, 0.36, 1] }}
        >
          <img src={slide.image} alt="" />
          <div className="hl-copy">
            <p className="hl-kicker">{slide.kicker}</p>
            <h3>{slide.title}</h3>
            <p>{slide.text}</p>
            <Link to={slide.href} className="hl-link">
              {slide.cta} <ArrowRight size={16} />
            </Link>
          </div>
        </motion.article>
      </AnimatePresence>

      <div className="hl-controls">
        <button type="button" aria-label="Previous slide" onClick={() => go(index - 1)}>
          <ChevronLeft size={18} />
        </button>
        <div className="hl-dots">
          {slides.map((item, i) => (
            <button
              key={item.title}
              type="button"
              className={i === index ? 'active' : ''}
              aria-label={`Show ${item.title}`}
              aria-current={i === index}
              onClick={() => setIndex(i)}
            />
          ))}
        </div>
        <button type="button" aria-label="Next slide" onClick={() => go(index + 1)}>
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  )
}
