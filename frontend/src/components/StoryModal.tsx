import { useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import type { Testimonial } from '../data/content'

type Props = {
  stories: Testimonial[]
  index: number | null
  onClose: () => void
  onChange: (index: number) => void
  tagFor: (story: Testimonial) => string
}

export function StoryModal({ stories, index, onClose, onChange, tagFor }: Props) {
  const open = index !== null && stories[index]
  const story = open ? stories[index!] : null

  useEffect(() => {
    if (index === null) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') onChange((index + 1) % stories.length)
      if (e.key === 'ArrowLeft') onChange((index - 1 + stories.length) % stories.length)
    }
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [index, stories.length, onClose, onChange])

  return (
    <AnimatePresence>
      {story && (
        <motion.div
          className="story-modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="story-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="story-modal-title"
            initial={{ opacity: 0, y: 28, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 320, damping: 28 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button type="button" className="story-modal-close" aria-label="Close" onClick={onClose}>
              <X size={18} />
            </button>

            <div className="story-modal-media">
              <img src={encodeURI(story.imageUrl)} alt={story.name} />
            </div>

            <div className="story-modal-body">
              <span className="story-tag">{tagFor(story)}</span>
              <div className="stars" aria-hidden>
                ★★★★★
              </div>
              <p className="story-modal-quote">“{story.quote}”</p>
              <h2 id="story-modal-title">{story.name}</h2>
              <p className="story-modal-role">NATTLABS learner · BMS pathway</p>

              <div className="story-modal-nav">
                <button
                  type="button"
                  aria-label="Previous story"
                  onClick={() => onChange((index! - 1 + stories.length) % stories.length)}
                >
                  <ChevronLeft size={18} />
                  Prev
                </button>
                <span>
                  {index! + 1} / {stories.length}
                </span>
                <button
                  type="button"
                  aria-label="Next story"
                  onClick={() => onChange((index! + 1) % stories.length)}
                >
                  Next
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
