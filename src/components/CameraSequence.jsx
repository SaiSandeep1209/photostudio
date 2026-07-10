import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { STUDIO } from '../data/content.js'
import { useMediaQuery } from '../hooks/useMediaQuery.js'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion.js'

const FRAME_COUNT = 76
// Full-res frames for desktop; a lighter 760px set for phones (cheap memory/data).
const framePath = (i, sm) => `/camera-seq/${sm ? 'sm/' : ''}frame-${String(i + 1).padStart(3, '0')}.jpg`
const POSTER = framePath(FRAME_COUNT - 1, false) // final lens-off hero frame

// Shared hero copy, overlaid on the camera imagery.
function HeroCopy({ innerRef }) {
  return (
    <div ref={innerRef} className="pointer-events-none relative z-10 flex h-full items-center">
      <div className="container-x">
        <div className="max-w-xl">
          <span className="eyebrow">{STUDIO.name} · Since 2000</span>
          <h1 className="mt-5 text-5xl leading-[1.02] text-balance sm:text-6xl lg:text-7xl">
            We shoot light<br />like it’s <span className="text-accent">a language.</span>
          </h1>
          <p className="mt-6 max-w-md text-lg text-muted">
            {STUDIO.positioning} Portrait, fashion, product, architecture and beyond — realised with obsessive craft.
          </p>
          <div className="pointer-events-auto mt-9 flex flex-wrap gap-3">
            <Link to="/booking" className="btn-primary">Book a Session</Link>
            <Link to="/gallery" className="btn-ghost">View Gallery</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

// Static hero (mobile / reduced motion) — a single strong frame, no preloading.
function StaticHero() {
  return (
    <section className="relative min-h-[92vh] overflow-hidden">
      <img src={POSTER} alt="Professional camera" className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-r from-base via-base/80 to-base/30" />
      <div className="absolute inset-0 bg-gradient-to-t from-base via-transparent to-base/40" />
      <div className="relative pt-24">
        <div className="flex min-h-[92vh] items-center"><HeroCopy /></div>
      </div>
    </section>
  )
}

// Scroll-scrubbed image sequence (desktop). Frames are drawn to a pinned canvas;
// scroll progress through the tall section maps to the frame index.
function ScrollHero() {
  const isMobile = useMediaQuery('(max-width: 899px)')
  const sectionRef = useRef(null)
  const canvasRef = useRef(null)
  const copyRef = useRef(null)
  const hintRef = useRef(null)
  const imagesRef = useRef([])
  const loadedRef = useRef(new Array(FRAME_COUNT).fill(false))
  const currentRef = useRef(-1)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')

    // Draw a frame with "cover" fit; fall back to the nearest already-loaded
    // frame so scrubbing never shows a blank while later frames stream in.
    const draw = (index) => {
      let idx = index
      while (idx > 0 && !loadedRef.current[idx]) idx-- // nearest loaded ≤ target
      const img = imagesRef.current[idx]
      if (!img || !loadedRef.current[idx]) return
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const cw = canvas.clientWidth, ch = canvas.clientHeight
      if (canvas.width !== cw * dpr || canvas.height !== ch * dpr) {
        canvas.width = cw * dpr; canvas.height = ch * dpr
      }
      const scale = Math.max((cw * dpr) / img.width, (ch * dpr) / img.height)
      const dw = img.width * scale, dh = img.height * scale
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.drawImage(img, (cw * dpr - dw) / 2, (ch * dpr - dh) / 2, dw, dh)
    }

    // Preload all frames (lighter set on phones); draw the first when ready.
    loadedRef.current = new Array(FRAME_COUNT).fill(false)
    imagesRef.current = Array.from({ length: FRAME_COUNT }, (_, i) => {
      const img = new Image()
      img.src = framePath(i, isMobile)
      img.onload = () => {
        loadedRef.current[i] = true
        if (i === 0) draw(0)
        else if (i === currentRef.current) draw(i) // fill in if user is parked here
      }
      return img
    })

    let ticking = false
    const onScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(() => {
        ticking = false
        const rect = sectionRef.current.getBoundingClientRect()
        const total = rect.height - window.innerHeight
        const progress = Math.max(0, Math.min(1, -rect.top / total))
        const frame = Math.round(progress * (FRAME_COUNT - 1))
        if (frame !== currentRef.current) { currentRef.current = frame; draw(frame) }
        // Fade copy in the back half; fade the scroll hint out early.
        if (copyRef.current) copyRef.current.style.opacity = String(1 - Math.max(0, (progress - 0.55) / 0.45) * 0.85)
        if (hintRef.current) hintRef.current.style.opacity = String(Math.max(0, 1 - progress * 6))
      })
    }
    const onResize = () => draw(currentRef.current < 0 ? 0 : currentRef.current)

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onResize)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
    }
  }, [isMobile])

  return (
    <section ref={sectionRef} className="relative" style={{ height: isMobile ? '260vh' : '320vh' }}>
      <div className="sticky top-0 h-screen overflow-hidden">
        <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" aria-label="Camera showcase" role="img" />
        {/* legibility scrims */}
        <div className="absolute inset-0 bg-gradient-to-r from-base via-base/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-base/90 via-transparent to-base/30" />
        <HeroCopy innerRef={copyRef} />
        <div ref={hintRef} className="pointer-events-none absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-center">
          <span className="font-mono text-[0.7rem] uppercase tracking-[0.25em] text-muted">Scroll to explore</span>
          <div className="mx-auto mt-2 h-8 w-px bg-gradient-to-b from-accent to-transparent" />
        </div>
      </div>
    </section>
  )
}

export default function CameraSequence() {
  const reduced = usePrefersReducedMotion()
  // Scroll sequence on both desktop and mobile (mobile uses the lighter frame set);
  // only reduced-motion falls back to a single static frame (accessibility).
  return reduced ? <StaticHero /> : <ScrollHero />
}
