import { useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { Clock, Mail, MapPin, MessageCircle, Phone } from 'lucide-react'
import { submitContact } from '../api/client'
import { FaqList } from '../components/FaqList'
import { PageMeta } from '../components/PageMeta'
import { Reveal } from '../components/Reveal'
import { SITE } from '../data/content'

const TOPICS = ['Programs', 'Placements', 'Lab-as-a-Service', 'Careers', 'Other']
const WHATSAPP = `https://wa.me/${SITE.phone.replace(/\D/g, '')}`

export function ContactPage() {
  const [status, setStatus] = useState<'idle' | 'ok' | 'err'>('idle')
  const [message, setMessage] = useState('')
  const [sending, setSending] = useState(false)

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const formEl = e.currentTarget
    const form = new FormData(formEl)
    const topic = String(form.get('topic') || 'Programs')
    const body = String(form.get('message') || '')
    setSending(true)
    setStatus('idle')
    const result = await submitContact({
      name: String(form.get('name') || ''),
      email: String(form.get('email') || ''),
      phone: String(form.get('phone') || ''),
      message: `Topic: ${topic}\n\n${body}`,
    })
    setSending(false)
    if (result.ok) {
      setStatus('ok')
      setMessage('Thanks — we received your message and will get back soon.')
      formEl.reset()
    } else {
      setStatus('err')
      setMessage(result.error || 'Something went wrong.')
    }
  }

  return (
    <>
      <PageMeta
        title="Contact | NATTLABS"
        description="Contact NATTLABS in HSR Layout, Bengaluru about programs, BMS placements, Lab-as-a-Service, or careers."
      />
      <header className="page-hero">
        <div className="container">
          <Reveal>
            <nav className="breadcrumb" aria-label="Breadcrumb">
              <Link to="/">Home</Link>
              <span aria-hidden>/</span>
              <span>Contact</span>
            </nav>
            <p className="eyebrow">Let’s talk</p>
            <h1>Contact Us</h1>
            <p>Ask about programs, placements, Lab-as-a-Service, or careers at our HSR Layout center.</p>
          </Reveal>
        </div>
      </header>
      <section className="band band-fog">
        <div className="container contact-grid">
          <Reveal>
            <div className="contact-panel">
              <h3>Visit NATTLABS</h3>
              <ul className="contact-list">
                <li>
                  <span className="contact-ico" aria-hidden>
                    <MapPin size={18} />
                  </span>
                  <span>{SITE.address}</span>
                </li>
                <li>
                  <span className="contact-ico" aria-hidden>
                    <Phone size={18} />
                  </span>
                  <a href={`tel:${SITE.phone.replace(/\s/g, '')}`}>{SITE.phone}</a>
                </li>
                <li>
                  <span className="contact-ico" aria-hidden>
                    <Mail size={18} />
                  </span>
                  <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
                </li>
                <li>
                  <span className="contact-ico" aria-hidden>
                    <Mail size={18} />
                  </span>
                  <a href={`mailto:${SITE.careersEmail}`}>{SITE.careersEmail}</a>
                </li>
                <li>
                  <span className="contact-ico" aria-hidden>
                    <Clock size={18} />
                  </span>
                  <span>Mon–Sat · 9:30 AM – 6:30 PM IST</span>
                </li>
              </ul>
              <p className="contact-note">We typically respond within one business day.</p>
              <a className="btn btn-ink" href={WHATSAPP} target="_blank" rel="noreferrer">
                <MessageCircle size={16} /> WhatsApp us
              </a>
              <iframe
                className="map-frame"
                src={SITE.mapEmbed}
                title="NATTLABS map"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <form className="contact-form" onSubmit={onSubmit}>
              <h3>Send a message</h3>
              <div className="form-grid">
                <div className="form-row">
                  <label>
                    Name
                    <input name="name" required placeholder="Your name" autoComplete="name" />
                  </label>
                  <label>
                    Phone
                    <input name="phone" placeholder="Phone number" autoComplete="tel" />
                  </label>
                </div>
                <label>
                  Email
                  <input name="email" type="email" required placeholder="you@email.com" autoComplete="email" />
                </label>
                <label>
                  Topic
                  <select name="topic" defaultValue="Programs">
                    {TOPICS.map((topic) => (
                      <option key={topic} value={topic}>
                        {topic}
                      </option>
                    ))}
                  </select>
                </label>
                <label>
                  Message
                  <textarea name="message" required rows={5} placeholder="How can we help?" />
                </label>
                {status !== 'idle' && (
                  <p className={`form-status ${status === 'ok' ? 'ok' : 'err'}`}>{message}</p>
                )}
                <button className="btn btn-primary" type="submit" disabled={sending}>
                  {sending ? 'Sending…' : 'Submit'}
                </button>
                <p className="form-privacy">
                  By submitting, you agree we may use these details to reply.{' '}
                  <Link to="/privacy">Privacy</Link>
                </p>
              </div>
            </form>
          </Reveal>
        </div>
      </section>
      <section className="band">
        <div className="container">
          <Reveal>
            <div className="section-intro">
              <p className="eyebrow">FAQs</p>
              <h2 className="display">Before you write</h2>
            </div>
          </Reveal>
          <FaqList limit={4} />
          <Link to="/faq" className="text-link" style={{ marginTop: '1rem', display: 'inline-flex' }}>
            All questions
          </Link>
        </div>
      </section>
    </>
  )
}
