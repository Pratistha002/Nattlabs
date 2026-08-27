import { Link } from 'react-router-dom'
import { Reveal } from './Reveal'

type Props = {
  title: string
  body: string
  image: string
  href: string
  reverse?: boolean
}

export function ContentSplit({ title, body, image, href, reverse }: Props) {
  return (
    <section className={`section ${reverse ? 'section-alt' : ''}`}>
      <div className="container">
        <Reveal>
          <div className={`split ${reverse ? 'reverse' : ''}`}>
            <div>
              <h2 className="section-title">{title}</h2>
              {body.split('\n\n').map((para) => (
                <p key={para.slice(0, 32)} className="section-lead" style={{ marginBottom: '1rem' }}>
                  {para}
                </p>
              ))}
              <Link to={href} className="btn btn-outline" style={{ marginTop: '0.5rem' }}>
                Read More
              </Link>
            </div>
            <div className="split-media">
              <img src={image} alt={title} loading="lazy" />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
