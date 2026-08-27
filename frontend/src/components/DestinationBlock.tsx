import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Reveal } from './Reveal'

type Props = {
  index: number
  id: string
  title: string
  body: string
  image: string
  href: string
}

export function DestinationBlock({ index, id, title, body, image, href }: Props) {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 1], ['-6%', '6%'])
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.08, 1, 1.05])

  return (
    <article ref={ref} className="destination" id={id}>
      <div className="dest-copy">
        <Reveal>
          <div className="dest-index">0{index + 1}</div>
          <h2>{title}</h2>
          {body.split('\n\n').map((para) => (
            <p key={para.slice(0, 36)}>{para}</p>
          ))}
          <Link to={href} className="btn btn-ink link-arrow">
            Explore {title.split(' ')[0]}
            <ArrowUpRight size={18} />
          </Link>
        </Reveal>
      </div>
      <div className="dest-media">
        <motion.img src={image} alt={title} loading="lazy" style={{ y, scale }} />
        <div className="dest-shine" aria-hidden />
      </div>
    </article>
  )
}
