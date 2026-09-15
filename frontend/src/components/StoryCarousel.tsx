import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import type { Testimonial } from '../data/content'

export function StoryCarousel({ stories }: { stories: Testimonial[] }) {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (stories.length < 2) return
    const id = window.setInterval(() => {
      setIndex((v) => (v + 1) % stories.length)
    }, 4500)
    return () => window.clearInterval(id)
  }, [stories.length])

  if (!stories.length) return null
  const story = stories[index]

  return (
    <div className="story-carousel">
      <AnimatePresence mode="wait">
        <motion.article
          key={story.name}
          className="story-feature"
          initial={{ opacity: 0, x: 18 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -18 }}
          transition={{ duration: 0.35 }}
        >
          <img src={encodeURI(story.imageUrl)} alt={story.name} />
          <div>
            <div className="stars">★★★★★</div>
            <p>“{story.quote}”</p>
            <h3>{story.name}</h3>
            <span>NATTLABS learner · BMS pathway</span>
          </div>
        </motion.article>
      </AnimatePresence>

      <div className="story-carousel-nav">
        <button type="button" aria-label="Previous" onClick={() => setIndex((v) => (v - 1 + stories.length) % stories.length)}>
          <ChevronLeft size={18} />
        </button>
        <div className="story-dots">
          {stories.map((s, i) => (
            <button
              key={s.name}
              type="button"
              className={i === index ? 'active' : ''}
              aria-label={`Show story ${i + 1}`}
              onClick={() => setIndex(i)}
            />
          ))}
        </div>
        <button type="button" aria-label="Next" onClick={() => setIndex((v) => (v + 1) % stories.length)}>
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  )
}
