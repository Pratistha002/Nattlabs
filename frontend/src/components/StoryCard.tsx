import { motion } from 'framer-motion'
import { Quote } from 'lucide-react'

type Props = {
  name: string
  quote: string
  imageUrl: string
  tag: string
  index: number
  onOpen: () => void
}

export function StoryCard({ name, quote, imageUrl, tag, index, onOpen }: Props) {
  const preview = quote.length > 110 ? `${quote.slice(0, 110).trim()}…` : quote

  return (
    <motion.button
      type="button"
      className="story-portrait"
      onClick={onOpen}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.45, delay: Math.min(index * 0.05, 0.35), ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6 }}
      whileTap={{ scale: 0.985 }}
    >
      <div className="story-portrait-media">
        <img src={imageUrl} alt="" loading="lazy" />
      </div>
      <div className="meta">
        <span className="story-tag">{tag}</span>
        <h3>{name}</h3>
        <p>“{preview}”</p>
        <span className="story-read">
          <Quote size={14} />
          Read full story
        </span>
      </div>
    </motion.button>
  )
}
