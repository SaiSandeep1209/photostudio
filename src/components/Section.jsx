import Reveal from './Reveal.jsx'

// Interior-page hero: clears the fixed nav, centered eyebrow + title + lead.
export function PageHero({ eyebrow, title, lead }) {
  return (
    <header className="relative grain overflow-hidden pt-36 pb-14 text-center sm:pt-40">
      <div className="container-x">
        {eyebrow && <Reveal><span className="eyebrow justify-center">{eyebrow}</span></Reveal>}
        <Reveal delay={0.05}>
          <h1 className="mx-auto mt-4 max-w-3xl text-4xl leading-[1.05] text-balance sm:text-6xl">{title}</h1>
        </Reveal>
        {lead && <Reveal delay={0.1}><p className="mx-auto mt-5 max-w-xl text-lg text-muted">{lead}</p></Reveal>}
      </div>
    </header>
  )
}

export function Section({ id, className = '', children }) {
  return (
    <section id={id} className={`py-20 sm:py-28 ${className}`}>
      <div className="container-x">{children}</div>
    </section>
  )
}

// Standard section heading: eyebrow + title + optional lead.
export function SectionHeading({ eyebrow, title, lead, center = false, className = '' }) {
  return (
    <div className={`${center ? 'mx-auto text-center' : ''} max-w-2xl ${className}`}>
      {eyebrow && <Reveal><span className="eyebrow">{eyebrow}</span></Reveal>}
      <Reveal delay={0.05}>
        <h2 className="mt-4 text-4xl sm:text-5xl leading-[1.05] text-balance">{title}</h2>
      </Reveal>
      {lead && (
        <Reveal delay={0.1}>
          <p className={`mt-4 text-muted text-lg ${center ? 'mx-auto' : ''} max-w-xl`}>{lead}</p>
        </Reveal>
      )}
    </div>
  )
}
