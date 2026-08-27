import { FALLBACK_PAGES, FALLBACK_TESTIMONIALS, type PageContent, type Testimonial } from '../data/content'

const API_BASE = import.meta.env.VITE_API_URL ?? ''

async function getJson<T>(path: string): Promise<T | null> {
  try {
    const res = await fetch(`${API_BASE}${path}`)
    if (!res.ok) return null
    return (await res.json()) as T
  } catch {
    return null
  }
}

export async function fetchTestimonials(): Promise<Testimonial[]> {
  const data = await getJson<Testimonial[]>('/api/testimonials')
  if (data && Array.isArray(data) && data.length) {
    return [...data].sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
  }
  return FALLBACK_TESTIMONIALS
}

export async function fetchPage(slug: string): Promise<PageContent> {
  const data = await getJson<PageContent>(`/api/pages/${slug}`)
  if (data?.slug) return data
  return FALLBACK_PAGES[slug] ?? {
    slug,
    title: slug,
    summary: '',
    pillars: [],
    sections: [],
  }
}

export async function submitContact(payload: {
  name: string
  email: string
  phone?: string
  message: string
}): Promise<{ ok: boolean; error?: string }> {
  try {
    const res = await fetch(`${API_BASE}/api/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
    if (!res.ok) {
      const text = await res.text()
      try {
        const data = JSON.parse(text) as { error?: string; message?: string }
        return { ok: false, error: data.error || data.message || 'Unable to send message right now.' }
      } catch {
        return { ok: false, error: text || 'Unable to send message right now.' }
      }
    }
    return { ok: true }
  } catch {
    return {
      ok: false,
      error: 'Backend is offline. Email us at support@nattlabs.com meanwhile.',
    }
  }
}
