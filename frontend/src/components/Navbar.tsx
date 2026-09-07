import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Menu, X, ChevronDown } from 'lucide-react'

const solutions = [
  { to: '/transformation', label: 'Transformation', hint: 'Learning that builds roles' },
  { to: '/solution', label: 'Solution', hint: 'From acquire to deploy' },
  { to: '/services', label: 'Services', hint: 'Programs, labs & leadership' },
]

const company = [
  { to: '/about', label: 'About', hint: 'Who we are' },
  { to: '/values', label: 'Values', hint: 'Honesty, integrity, humanity' },
  { to: '/careers', label: 'Careers', hint: 'Join the team' },
  { to: '/faq', label: 'FAQs', hint: 'Common questions' },
]

export function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setOpen(false)
  }, [location.pathname])

  return (
    <header className={`nav ${scrolled ? 'scrolled' : ''}`}>
      <div className="nav-inner">
        <Link to="/" className="brand" aria-label="NATTLABS home">
          <img src="/img/logos/Nattlablogo-png2.png" alt="NATTLABS" />
        </Link>

        <button className="menu-toggle" aria-label="Menu" aria-expanded={open} onClick={() => setOpen((v) => !v)}>
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>

        <nav className={`nav-links ${open ? 'open' : ''}`} aria-label="Primary">
          <NavLink to="/" end onClick={() => setOpen(false)}>
            Home
          </NavLink>

          <div className="nav-dropdown">
            <button type="button" className="nav-drop-trigger" aria-haspopup="true">
              Solutions <ChevronDown size={15} />
            </button>
            <div className="nav-drop-menu">
              {solutions.map((l) => (
                <NavLink key={l.to} to={l.to} onClick={() => setOpen(false)}>
                  {l.label}
                  <small>{l.hint}</small>
                </NavLink>
              ))}
            </div>
          </div>

          <NavLink to="/industries" onClick={() => setOpen(false)}>
            Industries
          </NavLink>
          <NavLink to="/success-stories" onClick={() => setOpen(false)}>
            Success Stories
          </NavLink>

          <div className="nav-dropdown">
            <button type="button" className="nav-drop-trigger" aria-haspopup="true">
              Company <ChevronDown size={15} />
            </button>
            <div className="nav-drop-menu">
              {company.map((l) => (
                <NavLink key={l.to} to={l.to} onClick={() => setOpen(false)}>
                  {l.label}
                  <small>{l.hint}</small>
                </NavLink>
              ))}
            </div>
          </div>

          <Link to="/contact" className="nav-cta" onClick={() => setOpen(false)}>
            Contact
          </Link>
        </nav>
      </div>
    </header>
  )
}
