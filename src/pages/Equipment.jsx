import { PageHero, Section } from '../components/Section.jsx'
import Reveal from '../components/Reveal.jsx'
import EquipmentCard from '../components/EquipmentCard.jsx'
import { EQUIPMENT } from '../data/content.js'

export default function Equipment() {
  return (
    <>
      <PageHero
        eyebrow="The kit"
        title="Gear that gets out of the way"
        lead="Professional bodies, fast glass and aerial rigs — maintained, backed up, and always ready."
      />
      <Section className="!pt-4">
        {Object.entries(EQUIPMENT).map(([group, items], gi) => (
          <div key={group} className={gi > 0 ? 'mt-16' : ''}>
            <Reveal><h2 className="mb-8 flex items-center gap-3 text-2xl">
              <span className="font-mono text-sm text-accent">{String(gi + 1).padStart(2, '0')}</span>{group}
            </h2></Reveal>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((it, i) => (
                <Reveal key={it.name} delay={i * 0.05}><EquipmentCard {...it} /></Reveal>
              ))}
            </div>
          </div>
        ))}
      </Section>
    </>
  )
}
