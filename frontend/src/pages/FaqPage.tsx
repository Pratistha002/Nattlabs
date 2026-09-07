import { Link } from 'react-router-dom'
import { FaqList } from '../components/FaqList'
import { PageMeta } from '../components/PageMeta'
import { Reveal } from '../components/Reveal'

export function FaqPage() {
  return (
    <>
      <PageMeta
        title="FAQs | NATTLABS"
        description="Answers about NATTLABS programs, the BMS intensive, Siemens placements, labs, and how to apply in Bengaluru."
      />
      <header className="page-hero">
        <div className="container">
          <Reveal>
            <nav className="breadcrumb" aria-label="Breadcrumb">
              <Link to="/">Home</Link>
              <span aria-hidden>/</span>
              <span>FAQs</span>
            </nav>
            <p className="eyebrow">Help</p>
            <h1>Frequently asked questions</h1>
            <p>Quick answers about programs, labs, placements, and how to reach NATTLABS.</p>
          </Reveal>
        </div>
      </header>
      <section className="band">
        <div className="container faq-wrap">
          <FaqList />
        </div>
      </section>
      <section className="cta-banner light">
        <div className="container cta-banner-inner">
          <h2>Still have a question?</h2>
          <p>Write to us and we will get back within one business day.</p>
          <div className="hero-actions">
            <Link to="/contact" className="btn btn-primary">
              Contact NATTLABS
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
