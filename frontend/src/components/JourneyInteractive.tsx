import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Reveal } from './Reveal'

type Step = {
  num: string
  title: string
  body: string
}

type Props = {
  steps: Step[]
}

export function JourneyInteractive({ steps }: Props) {
  const [active, setActive] = useState(0)

  return (
    <div className="journey-interactive">
      <div className="journey-tabs" role="tablist" aria-label="Student path">
        {steps.map((step, i) => (
          <button
            key={step.num}
            type="button"
            role="tab"
            aria-selected={active === i}
            className={`journey-tab ${active === i ? 'active' : ''}`}
            onMouseEnter={() => setActive(i)}
            onFocus={() => setActive(i)}
            onClick={() => setActive(i)}
          >
            <span className="journey-tab-num">{step.num}</span>
            <span className="journey-tab-title">{step.title}</span>
            {active === i && (
              <motion.span
                className="journey-tab-pill"
                layoutId="journey-pill"
                transition={{ type: 'spring', stiffness: 380, damping: 32 }}
              />
            )}
          </button>
        ))}
      </div>

      <div className="journey-panel" role="tabpanel">
        <AnimatePresence mode="wait">
          <motion.div
            key={steps[active].num}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <Reveal>
              <p className="eyebrow">Step {steps[active].num}</p>
              <h3>{steps[active].title}</h3>
              <p>{steps[active].body}</p>
            </Reveal>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
