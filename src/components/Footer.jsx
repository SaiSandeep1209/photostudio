import { Link } from 'react-router-dom'
import { STUDIO, NAV_LINKS } from '../data/content.js'

export default function Footer() {
  return (
    <footer className="relative mt-10 border-t border-white/8 bg-panel/60">
      <div className="container-x grid gap-10 py-16 md:grid-cols-[1.4fr_1fr_1.2fr]">
        <div>
          <img src="/logo.png" alt={`${STUDIO.name} logo`} className="h-24 w-auto" />
          <p className="mt-4 max-w-xs text-sm text-muted">{STUDIO.tagline} {STUDIO.positioning}</p>
        </div>

        <div>
          <h4 className="font-mono text-xs uppercase tracking-[0.2em] text-muted">Explore</h4>
          <ul className="mt-4 space-y-2.5">
            {NAV_LINKS.map((l) => (
              <li key={l.to}><Link to={l.to} className="text-sm text-ink/80 transition-colors hover:text-accent">{l.label}</Link></li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-mono text-xs uppercase tracking-[0.2em] text-muted">Studio</h4>
          <ul className="mt-4 space-y-2.5 text-sm text-ink/80">
            {/* REPLACE contact details */}
            <li><a href={`tel:${STUDIO.phone.replace(/\s/g, '')}`} className="transition-colors hover:text-accent">{STUDIO.phone}</a></li>
            <li><a href={`mailto:${STUDIO.email}`} className="transition-colors hover:text-accent">{STUDIO.email}</a></li>
            <li className="text-muted">{STUDIO.address}</li>
            <li><a href={STUDIO.instagram} target="_blank" rel="noopener" className="transition-colors hover:text-accent">Instagram ↗</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/5">
        <div className="container-x flex flex-col gap-2 py-6 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} {STUDIO.name}. All rights reserved.</span>
          <span>Crafted in the dark, for the light.</span>
        </div>
      </div>
    </footer>
  )
}
