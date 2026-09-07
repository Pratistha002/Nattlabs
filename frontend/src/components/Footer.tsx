import { Link } from 'react-router-dom'
import { SITE } from '../data/content'

const cols = [
  {
    title: 'Solutions',
    links: [
      { to: '/transformation', label: 'Transformation' },
      { to: '/solution', label: 'Solution' },
      { to: '/services', label: 'Services' },
      { to: '/industries', label: 'Industries' },
    ],
  },
  {
    title: 'Company',
    links: [
      { to: '/about', label: 'About' },
      { to: '/values', label: 'Values' },
      { to: '/careers', label: 'Careers' },
      { to: '/success-stories', label: 'Success Stories' },
      { to: '/faq', label: 'FAQs' },
      { to: '/contact', label: 'Contact' },
    ],
  },
]

export function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <img src="/img/logos/Nattlablogo-png2.png" alt="NATTLABS" />
          <p>
            NATTLABS builds role and production-ready talent through transformative learning, labs,
            and industry-aligned mentorship.
          </p>
        </div>
        {cols.map((col) => (
          <div key={col.title}>
            <h3>{col.title}</h3>
            {col.links.map((l) => (
              <Link key={l.to} to={l.to}>
                {l.label}
              </Link>
            ))}
          </div>
        ))}
        <div>
          <h3>Visit us</h3>
          <p className="footer-visit">
            {SITE.address}
            <br />
            <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
            <br />
            <a href={`tel:${SITE.phone.replace(/\s/g, '')}`}>{SITE.phone}</a>
          </p>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>© {new Date().getFullYear()} NATT Labs. All rights reserved.</span>
        <span className="footer-legal">
          <Link to="/privacy">Privacy</Link>
          <Link to="/faq">FAQs</Link>
          <span>HSR Layout, Bengaluru</span>
        </span>
      </div>
    </footer>
  )
}
