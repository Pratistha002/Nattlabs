import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowUpRight,
  Briefcase,
  Building2,
  FlaskConical,
  GraduationCap,
  Handshake,
  Layers,
  Sparkles,
  Target,
  Users,
  Workflow,
} from 'lucide-react'
import { fetchTestimonials } from '../api/client'
import { Hero } from '../components/Hero'
import { Reveal } from '../components/Reveal'
import { CountUp } from '../components/CountUp'
import { JourneyStepper } from '../components/JourneyStepper'
import { StoryCarousel } from '../components/StoryCarousel'
import { AmbientSpace } from '../components/AmbientSpace'
import { TiltCard } from '../components/TiltCard'
import { LATEST_WORK, SUCCESS_INTRO, type Testimonial } from '../data/content'

const STATS = [
  { icon: GraduationCap, value: '6-mo', label: 'BMS intensive track' },
  { icon: Building2, value: 'Siemens', label: 'Placement success story' },
  { icon: Users, value: '500+', label: 'Years mentor experience' },
  { icon: FlaskConical, value: 'Labs', label: 'Lab-as-a-Service model' },
  { icon: Target, value: 'Role', label: 'Skill · Level · Role mapping' },
]

const ECOSYSTEM = [
  {
    title: 'Role-Ready Freshers',
    text: 'We collaborate with institutes to train students in designated technology roles before deployment.',
    href: '/services',
    icon: GraduationCap,
  },
  {
    title: 'Role-Ready Experienced',
    text: 'Hire and upskill talent from underexplored geographies with intensive technical and role labs.',
    href: '/services',
    icon: Briefcase,
  },
  {
    title: 'Enterprises',
    text: 'Build capability and capacity with flexible deployment models and focused governance.',
    href: '/solution',
    icon: Building2,
  },
  {
    title: 'Leadership Development',
    text: 'Transform young managers into capable leaders across customer, ops, people, and finance.',
    href: '/services',
    icon: Sparkles,
  },
  {
    title: 'Bench Talent',
    text: 'Prepare bench resources to be role and production-ready through transformative learning.',
    href: '/services',
    icon: Layers,
  },
  {
    title: 'Lab-as-a-Service',
    text: 'State-of-the-art labs extended to customers for practical, hands-on development.',
    href: '/services',
    icon: FlaskConical,
  },
]

const WHY = [
  { title: 'Role-Ready Learning', text: 'We develop roles — not only skills.', icon: Target },
  { title: 'Hands-on Labs', text: 'Theory meets practice in The Training Factory.', icon: FlaskConical },
  { title: 'Skills Profiling', text: 'SKILL, LEVEL & ROLE mapped for precise growth.', icon: Workflow },
  { title: 'Industry Mentors', text: 'Guided by leaders with deep domain experience.', icon: Users },
  { title: 'Honesty & Integrity', text: 'Transparent, fair, accountable learning culture.', icon: Handshake },
  { title: 'Placement Pathways', text: 'Proven outcomes — including Siemens BMS placements.', icon: Briefcase },
]

const JOURNEY = [
  { title: 'Acquire', text: 'Source talent from high-potential geographies and assess IT proficiency.' },
  { title: 'Profile', text: 'Map SKILL, LEVEL & ROLE to assign tailored learning tracks.' },
  { title: 'Train', text: 'Build through The Training Factory — classrooms, labs, and coaching.' },
  { title: 'Assess', text: 'Continuous evaluation, panel assessments, and certifications.' },
  { title: 'Deploy', text: 'Flexible dedicated, designated, or flexi deployment models.' },
]

const EXPLORE = [
  { title: 'Transformation', href: '/transformation', image: '/img/trans-img.png', text: 'Innovation in learning and talent empowerment.' },
  { title: 'Solution', href: '/solution', image: '/img/solution-banner-img.jpg', text: 'From acquisition to deployment.' },
  { title: 'Services', href: '/services', image: '/img/labs-banner.png', text: 'Freshers to leadership and Lab-as-a-Service.' },
  { title: 'Industries', href: '/industries', image: '/img/industries.jpg', text: 'IT first, expanding across verticals.' },
]

export function HomePage() {
  const [stories, setStories] = useState<Testimonial[]>([])

  useEffect(() => {
    fetchTestimonials().then((list) => setStories(list.slice(0, 6)))
  }, [])

  return (
    <>
      <Hero />

      <section className="stats-bar">
        <div className="container stats-bar-grid">
          {STATS.map((item, i) => (
            <Reveal key={item.label} delay={i * 0.04}>
              <div className="stat-pill">
                <span className="stat-icon">
                  <item.icon size={18} />
                </span>
                <div>
                  <strong>{item.value}</strong>
                  <span>{item.label}</span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="band">
        <div className="container">
          <Reveal>
            <div className="section-intro">
              <p className="eyebrow">Our ecosystem</p>
              <h2 className="display">Who we build for</h2>
              <p className="lead">Clear pathways for students, professionals, and enterprises.</p>
            </div>
          </Reveal>
          <div className="eco-grid">
            {ECOSYSTEM.map((item, i) => (
              <Reveal key={item.title} delay={i * 0.05}>
                <TiltCard>
                  <Link to={item.href} className="eco-card">
                    <span className="icon-bubble">
                      <item.icon size={20} />
                    </span>
                    <h3>{item.title}</h3>
                    <p>{item.text}</p>
                    <span className="card-link">
                      Learn more <ArrowUpRight size={15} />
                    </span>
                  </Link>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="band band-soft band-ambient">
        <AmbientSpace variant="band" />
        <div className="container">
          <Reveal>
            <div className="section-intro">
              <p className="eyebrow">Why NATTLABS</p>
              <h2 className="display">Built for role & production readiness</h2>
            </div>
          </Reveal>
          <div className="why-grid">
            {WHY.map((item, i) => (
              <Reveal key={item.title} delay={i * 0.05}>
                <TiltCard>
                  <article className="why-card">
                    <span className="icon-bubble">
                      <item.icon size={20} />
                    </span>
                    <h3>{item.title}</h3>
                    <p>{item.text}</p>
                  </article>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="band">
        <div className="container">
          <Reveal>
            <div className="section-intro">
              <p className="eyebrow">Learning journey</p>
              <h2 className="display">From potential to production-ready</h2>
              <p className="lead">Hover each step to explore the NATTLABS pathway.</p>
            </div>
          </Reveal>
          <JourneyStepper steps={JOURNEY} />
        </div>
      </section>

      <section className="band band-soft">
        <div className="container factory-grid">
          <Reveal>
            <p className="eyebrow">The Training Factory</p>
            <h2 className="display">Where learning meets real execution</h2>
            <p className="lead">{LATEST_WORK.body.slice(0, 260)}…</p>
            <div className="factory-highlight">
              <div>
                <strong>
                  <CountUp to={6} />
                </strong>
                <span>month BMS intensive</span>
              </div>
              <div>
                <strong>Siemens</strong>
                <span>placement pathway</span>
              </div>
            </div>
            <Link to="/success-stories" className="btn btn-primary" style={{ marginTop: '1rem' }}>
              Explore success stories
            </Link>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="factory-media light">
              <img src="/img/career-section.jpg" alt="NATTLABS training environment" />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="band">
        <div className="container">
          <Reveal>
            <div className="section-intro row">
              <div>
                <p className="eyebrow">Explore</p>
                <h2 className="display">Programs & solutions</h2>
              </div>
              <Link to="/values" className="text-link">
                Our values <ArrowUpRight size={15} />
              </Link>
            </div>
          </Reveal>
          <div className="explore-grid">
            {EXPLORE.map((item, i) => (
              <Reveal key={item.title} delay={i * 0.05}>
                <TiltCard>
                  <Link to={item.href} className="explore-card">
                    <div className="explore-media">
                      <img src={item.image} alt={item.title} loading="lazy" />
                    </div>
                    <div className="explore-card-body">
                      <h3>{item.title}</h3>
                      <p>{item.text}</p>
                      <span className="card-link">
                        Open <ArrowUpRight size={15} />
                      </span>
                    </div>
                  </Link>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="band band-soft">
        <div className="container stories-split">
          <div>
            <Reveal>
              <p className="eyebrow">Success stories</p>
              <h2 className="display">Learners who made the leap</h2>
              <p className="lead">{SUCCESS_INTRO.slice(0, 180)}…</p>
            </Reveal>
            <StoryCarousel stories={stories} />
            <Link to="/success-stories" className="btn btn-ink" style={{ marginTop: '1rem' }}>
              View all stories
            </Link>
          </div>
          <Reveal delay={0.1}>
            <div className="partner-panel">
              <p className="eyebrow">Industry signal</p>
              <h3>Trusted placement outcomes</h3>
              <p>
                Our specialized BMS training has helped students prepare for and secure roles with
                Siemens, a global leader in Building Management Systems.
              </p>
              <div className="partner-logo">SIEMENS</div>
              <div className="partner-chips">
                <span>BMS</span>
                <span>HVAC</span>
                <span>Role-ready</span>
              </div>
              <Link to="/about" className="text-link">
                About NATTLABS <ArrowUpRight size={15} />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="cta-banner light">
        <div className="container cta-banner-inner">
          <Reveal>
            <h2>Ready to start your learning journey?</h2>
            <p>Ask about programs, labs, or careers at NATTLABS.</p>
            <div className="hero-actions">
              <Link to="/contact" className="btn btn-primary">
                Contact NATTLABS
              </Link>
              <Link to="/about" className="btn btn-soft">
                About us
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
