import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Menu, X, ChevronDown } from 'lucide-react'

const solutions = [
  { to: '/transformation', label: 'Transformation' },
  { to: '/solution', label: 'Solution' },
  { to: '/services', label: 'Services' },
]

const more = [
  { to: '/industries', label: 'Industries' },
  { to: '/values', label: 'Values' },
  { to: '/careers', label: 'Careers' },
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

        <button className="menu-toggle" aria-label="Menu" onClick={() => setOpen((v) => !v)}>
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>

        <nav className={`nav-links ${open ? 'open' : ''}`}>
          <NavLink to="/" end onClick={() => setOpen(false)}>
            Home
          </NavLink>

          <div className="nav-dropdown">
            <button type="button" className="nav-drop-trigger">
              Solutions <ChevronDown size={15} />
            </button>
            <div className="nav-drop-menu">
              {solutions.map((l) => (
                <NavLink key={l.to} to={l.to} onClick={() => setOpen(false)}>
                  {l.label}
                </NavLink>
              ))}
            </div>
          </div>

          <div className="nav-dropdown">
            <button type="button" className="nav-drop-trigger">
              More <ChevronDown size={15} />
            </button>
            <div className="nav-drop-menu">
              {more.map((l) => (
                <NavLink key={l.to} to={l.to} onClick={() => setOpen(false)}>
                  {l.label}
                </NavLink>
              ))}
            </div>
          </div>

          <NavLink to="/success-stories" onClick={() => setOpen(false)}>
            Success Stories
          </NavLink>
          <NavLink to="/about" onClick={() => setOpen(false)}>
            About
          </NavLink>
          <Link to="/contact" className="nav-cta" onClick={() => setOpen(false)}>
            Contact
          </Link>
        </nav>
      </div>
    </header>
  )
}
