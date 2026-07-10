import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { PageHero, Section } from '../components/Section.jsx'
import Reveal from '../components/Reveal.jsx'
import { STUDIO } from '../data/content.js'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const field =
  'w-full rounded-lg border border-white/10 bg-white/[0.03] px-4 py-3 text-ink placeholder:text-muted/70 outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/30'

const CHANNELS = [
  { label: 'Call / text', value: STUDIO.phone, href: `tel:${STUDIO.phone.replace(/\s/g, '')}` },
  { label: 'Email', value: STUDIO.email, href: `mailto:${STUDIO.email}` },
  { label: 'Instagram', value: STUDIO.handle, href: STUDIO.instagram, ext: true },
  { label: 'Studio', value: STUDIO.address },
]

export default function Contact() {
  const [v, setV] = useState({ name: '', email: '', message: '' })
  const [err, setErr] = useState({})
  const [sent, setSent] = useState(false)
  const set = (k) => (e) => { setV((s) => ({ ...s, [k]: e.target.value })); if (err[k]) setErr((x) => ({ ...x, [k]: undefined })) }

  const submit = (e) => {
    e.preventDefault()
    const er = {}
    if (!v.name.trim()) er.name = 'Please enter your name.'
    if (!v.email.trim()) er.email = 'Please enter your email.'
    else if (!EMAIL_RE.test(v.email)) er.email = 'Enter a valid email.'
    if (!v.message.trim()) er.message = 'Please write a short message.'
    setErr(er)
    if (Object.keys(er).length) return
    /* TODO: BACKEND — send to email / form service. Front-end only for now. */
    setSent(true)
  }

  return (
    <>
      <PageHero eyebrow="Contact" title="Let’s talk" lead="Questions, briefs, or just saying hello — we read every message." />
      <Section className="!pt-4">
        <div className="grid gap-12 lg:grid-cols-2">
          <Reveal>
            <h2 className="text-2xl">Reach us directly</h2>
            <ul className="mt-6 space-y-5">
              {CHANNELS.map((c) => (
                <li key={c.label}>
                  <div className="font-mono text-xs uppercase tracking-wider text-muted">{c.label}</div>
                  {c.href ? (
                    <a href={c.href} {...(c.ext ? { target: '_blank', rel: 'noopener' } : {})} className="text-lg text-ink transition-colors hover:text-accent">{c.value}{c.ext ? ' ↗' : ''}</a>
                  ) : (
                    <span className="text-lg text-ink">{c.value}</span>
                  )}
                </li>
              ))}
            </ul>
            {/* REPLACE: embed a real Google Map for the studio address if there's a walk-in location */}
            <div className="mt-8 aspect-[16/9] overflow-hidden rounded-2xl border border-white/8">
              <iframe
                title="Studio location"
                src="https://www.google.com/maps?q=Indiranagar,Bengaluru&output=embed"
                className="h-full w-full grayscale invert-[0.9] contrast-[0.9]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="glass rounded-2xl p-6 sm:p-8">
              <AnimatePresence mode="wait">
                {sent ? (
                  <motion.div key="ok" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="py-8 text-center">
                    <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-accent/15 text-accent">
                      <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
                    </div>
                    <h3 className="mt-4 text-2xl">Message sent</h3>
                    <p className="mx-auto mt-2 max-w-sm text-muted">Thanks — we’ll reply soon.</p>
                  </motion.div>
                ) : (
                  <motion.form key="form" onSubmit={submit} noValidate className="grid gap-4">
                    <h3 className="text-xl">Send a message</h3>
                    <div>
                      <label htmlFor="c-name" className="mb-1.5 block text-sm font-medium">Name <span className="text-accent">*</span></label>
                      <input id="c-name" className={field} value={v.name} onChange={set('name')} autoComplete="name" />
                      {err.name && <p className="mt-1 text-sm text-red-400">{err.name}</p>}
                    </div>
                    <div>
                      <label htmlFor="c-email" className="mb-1.5 block text-sm font-medium">Email <span className="text-accent">*</span></label>
                      <input id="c-email" type="email" className={field} value={v.email} onChange={set('email')} autoComplete="email" />
                      {err.email && <p className="mt-1 text-sm text-red-400">{err.email}</p>}
                    </div>
                    <div>
                      <label htmlFor="c-msg" className="mb-1.5 block text-sm font-medium">Message <span className="text-accent">*</span></label>
                      <textarea id="c-msg" rows={5} className={`${field} resize-y`} value={v.message} onChange={set('message')} />
                      {err.message && <p className="mt-1 text-sm text-red-400">{err.message}</p>}
                    </div>
                    <button type="submit" className="btn-primary w-full">Send Message</button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </Reveal>
        </div>
      </Section>
    </>
  )
}
