import { useRef, useState, useCallback, useEffect } from 'react'
import { BEFORE_AFTER } from '../data/content.js'

// Interactive before/after comparison slider — concrete proof of editing.
// Works with pointer drag and keyboard (arrow keys on the handle).
export default function BeforeAfter() {
  const [pos, setPos] = useState(50)
  const wrapRef = useRef(null)
  const dragging = useRef(false)

  const setFromClientX = useCallback((clientX) => {
    const el = wrapRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const pct = ((clientX - rect.left) / rect.width) * 100
    setPos(Math.max(0, Math.min(100, pct)))
  }, [])

  useEffect(() => {
    const move = (e) => { if (dragging.current) setFromClientX(e.touches ? e.touches[0].clientX : e.clientX) }
    const up = () => { dragging.current = false }
    window.addEventListener('pointermove', move)
    window.addEventListener('pointerup', up)
    window.addEventListener('touchmove', move, { passive: true })
    window.addEventListener('touchend', up)
    return () => {
      window.removeEventListener('pointermove', move)
      window.removeEventListener('pointerup', up)
      window.removeEventListener('touchmove', move)
      window.removeEventListener('touchend', up)
    }
  }, [setFromClientX])

  return (
    <div
      ref={wrapRef}
      className="relative aspect-[16/10] w-full select-none overflow-hidden rounded-2xl border border-white/8"
      onPointerDown={(e) => { dragging.current = true; setFromClientX(e.clientX) }}
    >
      {/* After (full) */}
      <img src={BEFORE_AFTER.after} alt="After editing" className="absolute inset-0 h-full w-full object-cover" draggable={false} />
      {/* Before (clipped to slider) */}
      <div className="absolute inset-0 overflow-hidden" style={{ width: `${pos}%` }}>
        <img
          src={BEFORE_AFTER.before}
          alt="Before editing"
          className="absolute inset-0 h-full w-full max-w-none object-cover grayscale"
          style={{ width: wrapRef.current ? wrapRef.current.offsetWidth : '100%' }}
          draggable={false}
        />
      </div>

      {/* Labels */}
      <span className="pointer-events-none absolute left-3 top-3 rounded-full glass px-3 py-1 font-mono text-[0.7rem] uppercase tracking-wider text-muted">Before</span>
      <span className="pointer-events-none absolute right-3 top-3 rounded-full glass px-3 py-1 font-mono text-[0.7rem] uppercase tracking-wider text-glow">After</span>

      {/* Handle */}
      <div className="absolute top-0 h-full w-0.5 bg-accent" style={{ left: `${pos}%` }}>
        <button
          className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 grid h-11 w-11 cursor-ew-resize place-items-center rounded-full bg-accent text-[#140f0a] shadow-accent-glow"
          aria-label="Drag to compare before and after"
          onKeyDown={(e) => {
            if (e.key === 'ArrowLeft') setPos((p) => Math.max(0, p - 4))
            if (e.key === 'ArrowRight') setPos((p) => Math.min(100, p + 4))
          }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M9 6 3 12l6 6M15 6l6 6-6 6" /></svg>
        </button>
      </div>
    </div>
  )
}
