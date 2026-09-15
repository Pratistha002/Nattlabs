import { useEffect, useState } from 'react'
import { HeartHandshake, Scale, ShieldCheck } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import { fetchPage } from '../api/client'
import { PageMeta } from '../components/PageMeta'
import { Reveal } from '../components/Reveal'
import { TiltCard } from '../components/TiltCard'
import type { PageContent } from '../data/content'

const VALUE_CARDS = [
  {
    t: 'Honesty',
    d: 'Transparency and reliability in every interaction.',
    icon: ShieldCheck,
    tone: 'honesty',
  },
  {
    t: 'Integrity',
    d: 'Fairness and accountability in every decision.',
    icon: Scale,
    tone: 'integrity',
  },
  {
    t: 'Humanity',
    d: 'Diversity, collaboration, and people who feel valued.',
    icon: HeartHandshake,
    tone: 'humanity',
  },
] as const

type Props = { slug?: string }

const PAGE_KICKER: Record<string, string> = {
  transformation: 'Our approach',
  solution: 'Solutions',
  services: 'Programs',
  industries: 'Sectors we serve',
  values: 'Our culture',
  careers: 'Join the team',
  about: 'Who we are',
}

export function ContentPage({ slug: slugProp }: Props) {
  const params = useParams()
  const slug = slugProp ?? params.slug ?? ''
  const [page, setPage] = useState<PageContent | null>(null)

  useEffect(() => {
    fetchPage(slug).then(setPage)
  }, [slug])

  if (!page) {
    return <div className="loading">Loading…</div>
  }

  const kicker = PAGE_KICKER[slug] ?? 'NATTLABS'

  const summary = page.summary.replace(/\s+/g, ' ').slice(0, 160)

  return (
    <>
      <PageMeta title={`${page.title} | NATTLABS`} description={summary} />
      <header className="page-hero">
        <div className="container">
          <Reveal>
            <nav className="breadcrumb" aria-label="Breadcrumb">
              <Link to="/">Home</Link>
              <span aria-hidden>/</span>
              <span>{page.title}</span>
            </nav>
            <p className="eyebrow">{kicker}</p>
            <h1>{page.title}</h1>
            {page.summary.split('\n\n').map((p) => (
              <p key={p.slice(0, 40)}>{p}</p>
            ))}
            {page.pillars?.length > 0 && (
              <div className="pillars">
                {page.pillars.map((p) => (
                  <span key={p} className="pillar">
                    {p}
                  </span>
                ))}
              </div>
            )}
          </Reveal>
        </div>
      </header>

      {slug === 'careers' && (
        <section className="band" style={{ paddingBottom: 0 }}>
          <div className="container">
            <Reveal>
              <div className="stories-cta">
                <div>
                  <p className="eyebrow">Apply</p>
                  <h2 className="display">Tell us how you want to grow</h2>
                  <p>Write to careers@nattlabs.com or send a Careers enquiry through the contact form.</p>
                </div>
                <Link to="/contact" className="btn btn-primary">
                  Apply / enquire
                </Link>
              </div>
            </Reveal>
          </div>
        </section>
      )}

      {slug === 'values' && (
        <section className="band" style={{ paddingBottom: 0 }}>
          <div className="container">
            <div className="values-row">
              {VALUE_CARDS.map((v, i) => (
                <Reveal key={v.t} delay={i * 0.08} className="value-reveal">
                  <TiltCard>
                    <article className={`value-panel ${v.tone}`}>
                      <span className="value-icon" aria-hidden>
                        <v.icon size={22} />
                      </span>
                      <strong>{v.t}</strong>
                      <span className="value-copy">{v.d}</span>
                    </article>
                  </TiltCard>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="band">
        <div className="container">
          {page.sections.map((section, index) =>
            section.imageUrl ? (
              <Reveal key={`${section.heading}-${index}`}>
                <article className="content-slab">
                  <div>
                    <h2>{section.heading}</h2>
                    {section.body.split('\n\n').map((para) => (
                      <p key={para.slice(0, 48)}>{para}</p>
                    ))}
                  </div>
                  <div className="slab-media">
                    <img src={section.imageUrl} alt={section.heading} loading="lazy" />
                  </div>
                </article>
              </Reveal>
            ) : (
              <Reveal key={`${section.heading}-${index}`}>
                <article className="prose">
                  <h2>{section.heading}</h2>
                  {section.body.split('\n\n').map((para) => (
                    <p key={para.slice(0, 48)}>{para}</p>
                  ))}
                </article>
              </Reveal>
            ),
          )}
        </div>
      </section>

      <section className="cta-banner light">
        <div className="container cta-banner-inner">
          <Reveal>
            <h2>Ready to talk with NATTLABS?</h2>
            <p>Ask about programs, labs, placements, or careers at our Bengaluru center.</p>
            <div className="hero-actions">
              <Link to="/contact" className="btn btn-primary">
                Contact us
              </Link>
              <Link to="/success-stories" className="btn btn-soft">
                Success stories
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
