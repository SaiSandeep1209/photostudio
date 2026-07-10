import { Link } from 'react-router-dom'
import { PageHero, Section } from '../components/Section.jsx'
import Reveal from '../components/Reveal.jsx'
import { PACKAGES } from '../data/content.js'

export default function Services() {
  return (
    <>
      <PageHero
        eyebrow="Services & packages"
        title="Clear packages, no guesswork"
        lead="What’s included, how long it takes, and where pricing starts. Custom scopes always welcome."
      />
      <Section className="!pt-4">
        <div className="grid gap-6 lg:grid-cols-3">
          {PACKAGES.map((p, i) => (
            <Reveal key={p.name} delay={i * 0.08}>
              <div className={`relative flex h-full flex-col rounded-2xl p-7 ${p.featured ? 'border-2 border-accent bg-accent/[0.06] shadow-accent-glow' : 'glass'}`}>
                {p.featured && (
                  <span className="absolute -top-3 left-7 rounded-full bg-accent px-3 py-1 font-mono text-[0.7rem] uppercase tracking-wider text-[#140f0a]">Most booked</span>
                )}
                <h3 className="text-2xl">{p.name}</h3>
                <p className="mt-2 text-sm text-muted">{p.summary}</p>
                <div className="mt-5 flex items-baseline gap-2">
                  <span className="font-mono text-xs uppercase tracking-wider text-muted">from</span>
                  <span className="font-display text-4xl text-ink">{p.from}</span>
                </div>
                <ul className="mt-6 space-y-3">
                  {p.includes.map((inc) => (
                    <li key={inc} className="flex items-start gap-2.5 text-sm">
                      <svg className="mt-0.5 shrink-0 text-accent" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
                      <span className="text-ink/90">{inc}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-6 flex items-center justify-between border-t border-white/8 pt-4">
                  <span className="spec">Turnaround: <strong>{p.turnaround}</strong></span>
                </div>
                <Link to={`/booking?pkg=${encodeURIComponent(p.name)}`} className={`mt-6 ${p.featured ? 'btn-primary' : 'btn-ghost'} w-full`}>
                  Choose {p.name}
                </Link>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1} className="mt-14 rounded-2xl border border-white/8 bg-panel/40 p-8 text-center">
          <h3 className="text-2xl">Something more bespoke?</h3>
          <p className="mx-auto mt-2 max-w-lg text-muted">Multi-day productions, retainers, and campaign packages are quoted per brief. Tell us the scope and we’ll build it.</p>
          <Link to="/contact" className="btn-ghost mt-6">Talk to us</Link>
        </Reveal>
      </Section>
    </>
  )
}
