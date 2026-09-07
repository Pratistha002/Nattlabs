import { Link } from 'react-router-dom'
import { PageMeta } from '../components/PageMeta'

export function NotFoundPage() {
  return (
    <>
      <PageMeta
        title="Page not found | NATTLABS"
        description="This page does not exist. Return to NATTLABS programs, success stories, or contact."
      />
      <header className="page-hero">
        <div className="container">
          <p className="eyebrow">404</p>
          <h1>Page not found</h1>
          <p>That link does not match a NATTLABS page. Try one of these instead.</p>
          <div className="hero-actions" style={{ marginTop: '1.1rem' }}>
            <Link to="/" className="btn btn-primary">
              Back home
            </Link>
            <Link to="/services" className="btn btn-soft">
              Explore programs
            </Link>
            <Link to="/contact" className="btn btn-soft">
              Contact us
            </Link>
          </div>
        </div>
      </header>
    </>
  )
}
