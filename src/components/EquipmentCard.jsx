import { motion } from 'framer-motion'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion.js'

// Equipment spec card — hover reveals full specs (mono-font data treatment).
// Subtle tilt on hover reads as polish, not gimmick.
export default function EquipmentCard({ name, specs }) {
  const reduced = usePrefersReducedMotion()
  return (
    <motion.div
      whileHover={reduced ? undefined : { rotateX: 4, rotateY: -4, y: -4 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      style={{ transformPerspective: 800 }}
      className="group glass relative overflow-hidden rounded-xl p-5"
    >
      <div className="flex items-center justify-between">
        <h3 className="font-display text-lg">{name}</h3>
        <span className="grid h-8 w-8 place-items-center rounded-full border border-white/10 text-muted transition-colors group-hover:border-accent group-hover:text-accent">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="9" /><path d="M12 12h.01" /></svg>
        </span>
      </div>
      <dl className="mt-4 space-y-1.5">
        {specs.map(([k, v]) => (
          <div key={k} className="flex items-center justify-between gap-4 border-b border-white/5 pb-1.5 last:border-0">
            <dt className="font-mono text-xs uppercase tracking-wide text-muted">{k}</dt>
            <dd className="spec"><strong>{v}</strong></dd>
          </div>
        ))}
      </dl>
    </motion.div>
  )
}
