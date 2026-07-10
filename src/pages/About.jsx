import { Link } from 'react-router-dom'
import { PageHero, Section } from '../components/Section.jsx'
import Reveal from '../components/Reveal.jsx'
import BlurImage from '../components/BlurImage.jsx'
import { STUDIO } from '../data/content.js'

const STATS = [
  { n: '25+', l: 'Years behind the lens' },
  { n: '800+', l: 'Shoots delivered' },
  { n: '40+', l: 'Brand clients' },
  { n: '4.9', l: 'Average rating' },
]

const VALUES = [
  { t: 'Craft over volume', d: 'We take fewer shoots and give each one real attention. Quality is the whole point.' },
  { t: 'Calm on set', d: 'Prepared, unhurried, and easy to work with — good images come from good energy.' },
  { t: 'Honest editing', d: 'We enhance, we don’t fabricate. Your images look like the best version of what was real.' },
]

export default function About() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title="A studio built around light and patience"
        lead={`Led by founder Brahma, ${STUDIO.name} is a small team of photographers and retouchers obsessed with getting it right.`}
      />

      <Section className="!pt-4">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            {/* REPLACE: images/studio-space.jpg */}
            <BlurImage src="images/gallery-5.jpg" alt="Inside the studio" className="aspect-[4/5] w-full rounded-2xl border border-white/8" />
          </Reveal>
          <div>
            <Reveal><h2 className="text-3xl sm:text-4xl">Founded on a simple idea</h2></Reveal>
            <Reveal delay={0.05}><p className="mt-4 text-muted">That a photograph should feel like the truth on its best day. <strong className="text-ink font-medium">Brahma</strong> founded {STUDIO.name} 25 years ago to work slowly and deliberately in a fast, disposable industry — building a space where clients feel seen, not processed.</p></Reveal>
            <Reveal delay={0.1}><p className="mt-4 text-muted">From a single portrait to a multi-day campaign, the standard is the same: considered light, honest direction, and an edit that respects the moment.</p></Reveal>
            <Reveal delay={0.15} className="mt-8 grid grid-cols-2 gap-6">
              {STATS.map((s) => (
                <div key={s.l}>
                  <div className="font-display text-4xl text-accent">{s.n}</div>
                  <div className="mt-1 text-sm text-muted">{s.l}</div>
                </div>
              ))}
            </Reveal>
          </div>
        </div>
      </Section>

      <Section className="border-t border-white/5 bg-panel/40">
        <div className="grid gap-6 md:grid-cols-3">
          {VALUES.map((v, i) => (
            <Reveal key={v.t} delay={i * 0.08}>
              <div className="glass h-full rounded-2xl p-7">
                <span className="font-mono text-sm text-accent">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="mt-3 text-xl">{v.t}</h3>
                <p className="mt-2 text-sm text-muted">{v.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.1} className="mt-12 text-center">
          <Link to="/booking" className="btn-primary">Work with us</Link>
        </Reveal>
      </Section>
    </>
  )
}
