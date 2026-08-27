import { useState, type FormEvent } from 'react'
import { Mail, MapPin, Phone } from 'lucide-react'
import { submitContact } from '../api/client'
import { Reveal } from '../components/Reveal'
import { SITE } from '../data/content'

export function ContactPage() {
  const [status, setStatus] = useState<'idle' | 'ok' | 'err'>('idle')
  const [message, setMessage] = useState('')
  const [sending, setSending] = useState(false)

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = new FormData(e.currentTarget)
    setSending(true)
    setStatus('idle')
    const result = await submitContact({
      name: String(form.get('name') || ''),
      email: String(form.get('email') || ''),
      phone: String(form.get('phone') || ''),
      message: String(form.get('message') || ''),
    })
    setSending(false)
    if (result.ok) {
      setStatus('ok')
      setMessage('Thanks — we received your message and will get back soon.')
      e.currentTarget.reset()
    } else {
      setStatus('err')
      setMessage(result.error || 'Something went wrong.')
    }
  }

  return (
    <>
      <header className="page-hero">
        <div className="container">
          <Reveal>
            <p className="eyebrow">Let’s talk</p>
            <h1>Contact Us</h1>
            <p>Ask about programs, placements, Lab-as-a-Service, or careers at NATTLABS.</p>
          </Reveal>
        </div>
      </header>
      <section className="band band-fog">
        <div className="container contact-grid">
          <Reveal>
            <div className="contact-panel">
              <h3>Get In Touch</h3>
              <ul className="contact-list">
                <li>
                  <MapPin size={18} />
                  <span>{SITE.address}</span>
                </li>
                <li>
                  <Phone size={18} />
                  <a href={`tel:${SITE.phone.replace(/\s/g, '')}`}>{SITE.phone}</a>
                </li>
                <li>
                  <Mail size={18} />
                  <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
                </li>
                <li>
                  <Mail size={18} />
                  <a href={`mailto:${SITE.careersEmail}`}>{SITE.careersEmail}</a>
                </li>
              </ul>
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
                    <input name="name" required placeholder="Your name" />
                  </label>
                  <label>
                    Phone
                    <input name="phone" placeholder="Phone number" />
                  </label>
                </div>
                <label>
                  Email
                  <input name="email" type="email" required placeholder="you@email.com" />
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
              </div>
            </form>
          </Reveal>
        </div>
      </section>
    </>
  )
}
