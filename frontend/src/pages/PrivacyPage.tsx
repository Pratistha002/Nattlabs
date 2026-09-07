import { Link } from 'react-router-dom'
import { PageMeta } from '../components/PageMeta'
import { Reveal } from '../components/Reveal'
import { SITE } from '../data/content'

export function PrivacyPage() {
  return (
    <>
      <PageMeta
        title="Privacy | NATTLABS"
        description="How NATTLABS uses contact details submitted through the website contact form."
      />
      <header className="page-hero">
        <div className="container">
          <Reveal>
            <nav className="breadcrumb" aria-label="Breadcrumb">
              <Link to="/">Home</Link>
              <span aria-hidden>/</span>
              <span>Privacy</span>
            </nav>
            <p className="eyebrow">Trust</p>
            <h1>Privacy</h1>
            <p>How we handle information you share with NATTLABS through this website.</p>
          </Reveal>
        </div>
      </header>
      <section className="band">
        <div className="container prose">
          <h2>What we collect</h2>
          <p>
            When you use the contact form, we collect your name, email, phone number if provided,
            the topic you select, and your message so we can respond.
          </p>
          <h2>How we use it</h2>
          <p>
            We use this information only to reply to your enquiry — programs, labs, placements, or
            careers. Messages are emailed to {SITE.email} and {SITE.careersEmail}, and stored so our
            team can follow up.
          </p>
          <h2>Who we share it with</h2>
          <p>
            We do not sell your details. We may use a mail provider to deliver the notification to
            our inboxes.
          </p>
          <h2>Contact</h2>
          <p>
            For any privacy question, write to <a href={`mailto:${SITE.email}`}>{SITE.email}</a> or
            visit us at {SITE.address}.
          </p>
        </div>
      </section>
    </>
  )
}
