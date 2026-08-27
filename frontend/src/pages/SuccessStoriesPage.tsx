import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react'
import { StoryCard } from '../components/StoryCard'
import { StoryModal } from '../components/StoryModal'
import { fetchTestimonials } from '../api/client'
import { Reveal } from '../components/Reveal'
import { SUCCESS_INTRO, type Testimonial } from '../data/content'

const FILTERS = ['All', 'BMS', 'HVAC', 'Mentorship', 'Hands-on'] as const
type Filter = (typeof FILTERS)[number]

function tagFor(story: Testimonial): string {
  const q = story.quote.toLowerCase()
  if (q.includes('hvac')) return 'HVAC'
  if (q.includes('bms')) return 'BMS'
  if (q.includes('mentor')) return 'Mentorship'
  if (q.includes('hands-on') || q.includes('practical') || q.includes('labs')) return 'Hands-on'
  return 'Learner'
}

function matchesFilter(story: Testimonial, filter: Filter) {
  if (filter === 'All') return true
  return tagFor(story) === filter
}

export function SuccessStoriesPage() {
  const [stories, setStories] = useState<Testimonial[]>([])
  const [filter, setFilter] = useState<Filter>('All')
  const [featured, setFeatured] = useState(0)
  const [modalIndex, setModalIndex] = useState<number | null>(null)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    fetchTestimonials().then((data) => {
      setStories(data)
      setFeatured(0)
    })
  }, [])

  const filtered = useMemo(() => stories.filter((s) => matchesFilter(s, filter)), [stories, filter])

  useEffect(() => {
    if (stories.length < 2 || paused || modalIndex !== null) return
    const id = window.setInterval(() => {
      setFeatured((v) => (v + 1) % stories.length)
    }, 5200)
    return () => window.clearInterval(id)
  }, [stories.length, paused, modalIndex])

  const active = stories[featured]

  return (
    <>
      <header className="page-hero stories-hero">
        <div className="container">
          <Reveal>
            <p className="eyebrow">Placements & voices</p>
            <h1>Success Stories</h1>
            <p className="stories-hero-lead">{SUCCESS_INTRO}</p>
            <div className="stories-hero-chips">
              <span>Siemens outcomes</span>
              <span>BMS pathway</span>
              <span>Hands-on training</span>
            </div>
          </Reveal>
        </div>
      </header>

      {active && (
        <section className="band">
          <div className="container">
            <Reveal>
              <div className="stories-spot-head">
                <div>
                  <p className="eyebrow">Featured voice</p>
                  <h2 className="display">Meet a Nattlabs learner</h2>
                </div>
                <p className="stories-count">
                  <Sparkles size={16} />
                  {stories.length} stories
                </p>
              </div>
            </Reveal>

            <div
              className="stories-spotlight"
              onMouseEnter={() => setPaused(true)}
              onMouseLeave={() => setPaused(false)}
            >
              <AnimatePresence mode="wait">
                <motion.article
                  key={active.name}
                  className="stories-spotlight-card"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                >
                  <button
                    type="button"
                    className="stories-spotlight-media"
                    onClick={() => setModalIndex(featured)}
                    aria-label={`Read ${active.name}'s full story`}
                  >
                    <img src={active.imageUrl} alt={active.name} />
                    <span className="stories-spotlight-hint">View story</span>
                  </button>
                  <div className="stories-spotlight-copy">
                    <span className="story-tag">{tagFor(active)}</span>
                    <div className="stars" aria-hidden>
                      ★★★★★
                    </div>
                    <p>“{active.quote}”</p>
                    <h3>{active.name}</h3>
                    <span className="stories-spotlight-role">NATTLABS learner · BMS pathway</span>
                    <div className="stories-spotlight-actions">
                      <button type="button" className="btn btn-primary" onClick={() => setModalIndex(featured)}>
                        Read full story
                      </button>
                      <div className="story-carousel-nav stories-spotlight-nav">
                        <button
                          type="button"
                          aria-label="Previous"
                          onClick={() => setFeatured((v) => (v - 1 + stories.length) % stories.length)}
                        >
                          <ChevronLeft size={18} />
                        </button>
                        <div className="story-dots">
                          {stories.map((s, i) => (
                            <button
                              key={s.name}
                              type="button"
                              className={i === featured ? 'active' : ''}
                              aria-label={`Show story ${i + 1}`}
                              onClick={() => setFeatured(i)}
                            />
                          ))}
                        </div>
                        <button
                          type="button"
                          aria-label="Next"
                          onClick={() => setFeatured((v) => (v + 1) % stories.length)}
                        >
                          <ChevronRight size={18} />
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.article>
              </AnimatePresence>
            </div>
          </div>
        </section>
      )}

      <section className="band band-soft">
        <div className="container">
          <Reveal>
            <div className="stories-gallery-head">
              <div>
                <p className="eyebrow">All voices</p>
                <h2 className="display">Browse every success story</h2>
                <p className="lead">Filter by theme, then open any card to read the full journey.</p>
              </div>
            </div>
          </Reveal>

          <div className="stories-filters" role="tablist" aria-label="Filter stories">
            {FILTERS.map((item) => (
              <button
                key={item}
                type="button"
                role="tab"
                aria-selected={filter === item}
                className={filter === item ? 'active' : ''}
                onClick={() => setFilter(item)}
              >
                {item}
              </button>
            ))}
          </div>

          <AnimatePresence mode="popLayout">
            <motion.div className="story-grid-page" layout>
              {filtered.map((story) => {
                const globalIndex = stories.findIndex((s) => s.name === story.name)
                return (
                  <StoryCard
                    key={story.name}
                    name={story.name}
                    quote={story.quote}
                    imageUrl={story.imageUrl}
                    tag={tagFor(story)}
                    index={globalIndex}
                    onOpen={() => setModalIndex(globalIndex)}
                  />
                )
              })}
            </motion.div>
          </AnimatePresence>

          {!filtered.length && (
            <p className="stories-empty">No stories match this filter yet. Try another theme.</p>
          )}
        </div>
      </section>

      <section className="band">
        <div className="container">
          <Reveal>
            <div className="stories-cta">
              <div>
                <p className="eyebrow">Your turn</p>
                <h2 className="display">Ready to write the next success story?</h2>
                <p>Join a role-ready BMS pathway built around mentorship, labs, and placement outcomes.</p>
              </div>
              <Link to="/contact" className="btn btn-primary">
                Talk to us <ArrowRight size={16} />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <StoryModal
        stories={stories}
        index={modalIndex}
        onClose={() => setModalIndex(null)}
        onChange={setModalIndex}
        tagFor={tagFor}
      />
    </>
  )
}
