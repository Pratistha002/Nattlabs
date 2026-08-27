import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { fetchPage } from '../api/client'
import { Reveal } from '../components/Reveal'
import type { PageContent } from '../data/content'

type Props = { slug?: string }

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

  return (
    <>
      <header className="page-hero">
        <div className="container">
          <Reveal>
            <p className="eyebrow">{page.slug}</p>
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

      {slug === 'values' && (
        <section className="band" style={{ paddingBottom: 0 }}>
          <div className="container">
            <div className="values-row">
              {[
                { t: 'Honesty', d: 'Transparency and reliability in every interaction.' },
                { t: 'Integrity', d: 'Fairness and accountability in every decision.' },
                { t: 'Humanity', d: 'Diversity, collaboration, and people who feel valued.' },
              ].map((v, i) => (
                <Reveal key={v.t} delay={i * 0.08}>
                  <div className="value-panel">
                    <strong>{v.t}</strong>
                    <span>{v.d}</span>
                  </div>
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
    </>
  )
}
