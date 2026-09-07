import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { FAQS } from '../data/faq'

export function FaqList({ limit }: { limit?: number }) {
  const items = limit ? FAQS.slice(0, limit) : FAQS
  const [open, setOpen] = useState(0)

  return (
    <div className="faq-list">
      {items.map((item, i) => {
        const isOpen = open === i
        return (
          <div key={item.q} className={`faq-item ${isOpen ? 'open' : ''}`}>
            <button
              type="button"
              className="faq-q"
              aria-expanded={isOpen}
              onClick={() => setOpen(isOpen ? -1 : i)}
            >
              <span>{item.q}</span>
              <ChevronDown size={18} />
            </button>
            {isOpen && <p className="faq-a">{item.a}</p>}
          </div>
        )
      })}
    </div>
  )
}
