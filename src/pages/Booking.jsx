import { useSearchParams } from 'react-router-dom'
import { PageHero, Section } from '../components/Section.jsx'
import Reveal from '../components/Reveal.jsx'
import BookingForm from '../components/BookingForm.jsx'
import { PACKAGES, STUDIO } from '../data/content.js'

export default function Booking() {
  const [params] = useSearchParams()
  const requested = params.get('pkg')
  const defaultPackage = PACKAGES.some((p) => p.name === requested) ? requested : ''

  return (
    <>
      <PageHero
        eyebrow="Booking"
        title="Reserve your session"
        lead="Share a few details and we’ll confirm availability and a tailored quote within one business day."
      />
      <Section className="!pt-4">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
          <Reveal>
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl">How it works</h2>
                <ol className="mt-4 space-y-4">
                  {[
                    ['Send your brief', 'Tell us the discipline, date and vibe.'],
                    ['Get a quote', 'We reply within a day with availability and pricing.'],
                    ['Shoot day', 'We handle direction, gear and lighting — you show up.'],
                    ['Delivery', 'Retouched gallery delivered on the package timeline.'],
                  ].map(([t, d], i) => (
                    <li key={t} className="flex gap-4">
                      <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-accent/40 font-mono text-sm text-accent">{i + 1}</span>
                      <div>
                        <div className="font-medium">{t}</div>
                        <div className="text-sm text-muted">{d}</div>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
              <div className="glass rounded-2xl p-5 text-sm text-muted">
                Prefer to talk first? Call <a href={`tel:${STUDIO.phone.replace(/\s/g, '')}`} className="text-ink hover:text-accent">{STUDIO.phone}</a> or email <a href={`mailto:${STUDIO.email}`} className="text-ink hover:text-accent">{STUDIO.email}</a>.
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.1}><BookingForm defaultPackage={defaultPackage} /></Reveal>
        </div>
      </Section>
    </>
  )
}
