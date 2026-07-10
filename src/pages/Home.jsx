import { Link } from 'react-router-dom'
import { Section, SectionHeading } from '../components/Section.jsx'
import Reveal from '../components/Reveal.jsx'
import CameraSequence from '../components/CameraSequence.jsx'
import DisciplineCard from '../components/DisciplineCard.jsx'
import EquipmentCard from '../components/EquipmentCard.jsx'
import MasonryGallery from '../components/MasonryGallery.jsx'
import BeforeAfter from '../components/BeforeAfter.jsx'
import Testimonials from '../components/Testimonials.jsx'
import BookingForm from '../components/BookingForm.jsx'
import { DISCIPLINES, ALSO_AVAILABLE, EQUIPMENT, GALLERY, STUDIO } from '../data/content.js'

export default function Home() {
  const previewItems = GALLERY.slice(0, 6)
  return (
    <>
      <CameraSequence />

      {/* Signature disciplines */}
      <Section>
        <SectionHeading
          eyebrow="What we capture"
          title="Photography for Every Moment"
          lead="From portraits to weddings, we create memories you'll cherish forever."
        />
        <div className="mt-12 grid grid-cols-2 gap-4 auto-rows-[240px] lg:grid-cols-3 lg:auto-rows-[300px]">
          {DISCIPLINES.map((d, i) => (
            <Reveal key={d.slug} delay={i * 0.06}>
              <DisciplineCard {...d} className="h-full" />
            </Reveal>
          ))}
        </div>

        {/* Also available — lighter secondary tag list */}
        <Reveal delay={0.1} className="mt-10">
          <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-muted">And more — just ask</p>
          <div className="flex flex-wrap gap-2">
            {ALSO_AVAILABLE.map((t) => (
              <span key={t} className="rounded-full border border-white/10 px-3.5 py-1.5 text-sm text-muted transition-colors hover:border-accent/50 hover:text-ink">{t}</span>
            ))}
          </div>
        </Reveal>
      </Section>

      {/* Equipment showcase */}
      <Section className="border-y border-white/5 bg-panel/40">
        <SectionHeading eyebrow="The kit" title="Tools worth trusting" lead="Bodies, glass and drones — hover any card for the specs." />
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {EQUIPMENT.Cameras.map((c, i) => (
            <Reveal key={c.name} delay={i * 0.05}><EquipmentCard {...c} /></Reveal>
          ))}
        </div>
        <Reveal delay={0.1} className="mt-6 text-center">
          <Link to="/equipment" className="btn-ghost">See the full kit</Link>
        </Reveal>
      </Section>

      {/* Gallery preview */}
      <Section>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading eyebrow="Selected work" title="A glimpse of the frame" />
          <Reveal><Link to="/gallery" className="btn-ghost">Open full gallery</Link></Reveal>
        </div>
        <div className="mt-12"><MasonryGallery items={previewItems} /></div>
      </Section>

      {/* Before / After */}
      <Section className="bg-panel/40 border-y border-white/5">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <SectionHeading
            eyebrow="Post-production"
            title="The edit is half the image"
            lead="Drag the handle to see raw capture become the final grade. Colour, cleanup and mood — done in-house."
          />
          <Reveal delay={0.1}><BeforeAfter /></Reveal>
        </div>
      </Section>

      {/* Testimonials */}
      <Section>
        <SectionHeading eyebrow="Trust" title="What clients say" center />
        <div className="mt-12"><Testimonials /></div>
      </Section>

      {/* Booking CTA */}
      <Section className="border-t border-white/5">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading eyebrow="Let’s make something" title="Book a session" lead="Tell us what you’re creating. We’ll reply within one business day with availability and a tailored quote." />
            <Reveal delay={0.15} className="mt-8 space-y-3 text-sm text-muted">
              <p>📞 <a href={`tel:${STUDIO.phone.replace(/\s/g, '')}`} className="text-ink hover:text-accent">{STUDIO.phone}</a></p>
              <p>✉️ <a href={`mailto:${STUDIO.email}`} className="text-ink hover:text-accent">{STUDIO.email}</a></p>
            </Reveal>
          </div>
          <Reveal delay={0.1}><BookingForm /></Reveal>
        </div>
      </Section>
    </>
  )
}
