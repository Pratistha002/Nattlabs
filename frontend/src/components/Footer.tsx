import { Link } from 'react-router-dom'
import { SITE } from '../data/content'

const cols = [
  {
    title: 'Solutions',
    links: [
      { to: '/transformation', label: 'Transformation' },
      { to: '/solution', label: 'Solution' },
      { to: '/services', label: 'Services' },
    ],
  },
  {
    title: 'Company',
    links: [
      { to: '/about', label: 'About' },
      { to: '/values', label: 'Values' },
      { to: '/careers', label: 'Careers' },
      { to: '/success-stories', label: 'Success Stories' },
      { to: '/contact', label: 'Contact' },
    ],
  },
]

export function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div>
          <img
            src="/img/logos/Nattlablogo-png2.png"
            alt="NATTLABS"
            style={{ height: 38, marginBottom: 10, filter: 'brightness(1.1)' }}
          />
          <p>
            NATTLABS builds role & production ready talent through transformative learning, labs,
            and industry-aligned mentorship.
          </p>
          <p style={{ marginTop: 10 }}>
            <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
            <br />
            <a href={`tel:${SITE.phone.replace(/\s/g, '')}`}>{SITE.phone}</a>
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
      </div>
      <div className="container footer-bottom">
        © {new Date().getFullYear()} NATT Labs, All Right Reserved. · {SITE.address}
      </div>
    </footer>
  )
}
