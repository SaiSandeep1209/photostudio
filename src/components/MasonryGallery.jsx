import { useState } from 'react'
import { motion } from 'framer-motion'
import BlurImage from './BlurImage.jsx'
import { GALLERY_CATEGORIES } from '../data/content.js'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion.js'

// Reusable masonry (CSS columns). Optional filter pills. Blur-up + hover zoom.
export default function MasonryGallery({ items, filterable = false, initialCat = 'All' }) {
  const [cat, setCat] = useState(initialCat)
  const reduced = usePrefersReducedMotion()
  const shown = cat === 'All' ? items : items.filter((i) => i.cat === cat)

  return (
    <div>
      {filterable && (
        <div className="mb-8 flex flex-wrap gap-2">
          {GALLERY_CATEGORIES.map((c) => (
            <button
              key={c}
              onClick={() => setCat(c)}
              aria-pressed={cat === c}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-all duration-300 ${
                cat === c ? 'bg-accent text-[#140f0a] shadow-accent-glow' : 'glass text-muted hover:text-ink'
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      )}

      <div className="[column-fill:_balance] gap-4 sm:columns-2 lg:columns-3">
        {shown.map((item, i) => (
          <motion.figure
            key={item.src}
            layout={!reduced}
            initial={reduced ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '0px 0px -8% 0px' }}
            transition={{ duration: 0.6, delay: Math.min(i * 0.05, 0.3), ease: [0.22, 0.61, 0.36, 1] }}
            className="group mb-4 break-inside-avoid overflow-hidden rounded-xl border border-white/8"
          >
            <div className="relative overflow-hidden">
              <BlurImage
                src={item.src}
                alt={`${item.cat} photography`}
                className="w-full"
                imgClassName="transition-transform duration-700 group-hover:scale-105"
                style={{ aspectRatio: `${item.w} / ${item.h}` }}
              />
              <figcaption className="pointer-events-none absolute bottom-0 left-0 right-0 flex items-end justify-between p-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <span className="rounded-full glass px-3 py-1 font-mono text-[0.7rem] uppercase tracking-wider text-glow">{item.cat}</span>
              </figcaption>
            </div>
          </motion.figure>
        ))}
      </div>
    </div>
  )
}
