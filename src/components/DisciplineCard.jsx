import { Link } from 'react-router-dom'
import BlurImage from './BlurImage.jsx'

// Signature discipline card — image with hover zoom, copy overlaid at rest,
// links through to the gallery filtered to that discipline.
export default function DisciplineCard({ slug, title, blurb, img, className = '' }) {
  return (
    <Link
      to={`/gallery?cat=${encodeURIComponent(title.split(' ')[0])}`}
      className={`group relative block overflow-hidden rounded-2xl border border-white/8 ${className}`}
    >
      <BlurImage
        src={img}
        alt={`${title} photography`}
        className="h-full w-full"
        imgClassName="transition-transform duration-[900ms] ease-out group-hover:scale-105"
      />
      {/* Always-on scrim so the title stays legible; deeper scrim fades in on hover. */}
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-base/85 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-base via-base/45 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      <div className="absolute inset-0 flex flex-col justify-end p-5 [text-shadow:0_1px_12px_rgba(0,0,0,0.7)]">
        {/* Title — always visible, labels the image */}
        <h3 className="text-xl sm:text-2xl">{title}</h3>
        {/* Description — revealed on hover */}
        <p className="mt-1.5 max-h-0 overflow-hidden text-sm text-ink/90 opacity-0 transition-all duration-500 group-hover:mt-1.5 group-hover:max-h-24 group-hover:opacity-100">{blurb}</p>
        <span className="mt-0 inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider text-glow opacity-0 transition-all duration-500 group-hover:mt-3 group-hover:opacity-100">
          View work
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
        </span>
      </div>
    </Link>
  )
}
