import { useState, type CSSProperties } from 'react'
import { motion } from 'framer-motion'
import { Reveal } from './Reveal'

type Step = { title: string; text: string }

const STEP_COLORS = ['#7e2cb1', '#a556d4', '#641f8f', '#eeb111', '#c084fc']

export function JourneyStepper({ steps }: { steps: Step[] }) {
  const [active, setActive] = useState(0)
  const accent = STEP_COLORS[active % STEP_COLORS.length]
  const accentVar = { '--accent': accent } as CSSProperties

  return (
    <div className="journey-stepper" style={accentVar}>
      <div className="journey-track" role="tablist" aria-label="Learning journey">
        {steps.map((step, i) => (
          <button
            key={step.title}
            type="button"
            role="tab"
            aria-selected={active === i}
            className={`journey-step-btn ${active === i ? 'active' : ''}`}
            style={active === i ? undefined : ({ '--accent': STEP_COLORS[i % STEP_COLORS.length] } as CSSProperties)}
            onMouseEnter={() => setActive(i)}
            onFocus={() => setActive(i)}
            onClick={() => setActive(i)}
          >
            <span className="journey-step-index">{i + 1}</span>
            <span className="journey-step-title">{step.title}</span>
            {i < steps.length - 1 && <span className="journey-connector" aria-hidden />}
          </button>
        ))}
        <motion.div
          className="journey-progress"
          animate={{ width: `${((active + 1) / steps.length) * 100}%`, background: accent }}
          transition={{ type: 'spring', stiffness: 220, damping: 28 }}
        />
      </div>

      <Reveal>
        <div className="journey-detail" style={accentVar}>
          <p className="eyebrow">Step {active + 1}</p>
          <h3>{steps[active].title}</h3>
          <p>{steps[active].text}</p>
        </div>
      </Reveal>
    </div>
  )
}
