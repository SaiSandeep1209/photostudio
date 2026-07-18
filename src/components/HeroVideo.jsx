import { lazy, Suspense } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { STUDIO } from '../data/content.js'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion.js'
import { useMediaQuery } from '../hooks/useMediaQuery.js'

// 3D camera is desktop-only; mobile / reduced-motion get the static poster.
const CameraScene = lazy(() => import('./CameraScene.jsx'))

// Hero: headline + CTAs on the left, a 3D camera floating on a transparent
// canvas on the right (gentle hover + slow rotation).
export default function HeroVideo() {
  const reduced = usePrefersReducedMotion()
  const isDesktop = useMediaQuery('(min-width: 900px)')
  const show3D = isDesktop && !reduced
  const fade = (delay) => ({
    initial: reduced ? false : { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, delay, ease: [0.22, 0.61, 0.36, 1] },
  })

  return (
    <section className="relative grain overflow-hidden">
      <div className="container-x grid min-h-[92vh] items-center gap-10 pt-28 pb-16 lg:grid-cols-2">
        {/* Copy */}
        <div className="relative z-10">
          <motion.span className="eyebrow" {...fade(0.1)}>{STUDIO.name} · Since 2000</motion.span>
          <motion.h1 className="mt-5 text-5xl leading-[1.02] text-balance sm:text-6xl lg:text-7xl" {...fade(0.2)}>
            We shoot light<br />like it’s <span className="text-accent">a language.</span>
          </motion.h1>
          <motion.p className="mt-6 max-w-md text-lg text-muted" {...fade(0.32)}>
            {STUDIO.positioning} Portrait, fashion, product, architecture and beyond — realised with obsessive craft.
          </motion.p>
          <motion.div className="mt-9 flex flex-wrap gap-3" {...fade(0.44)}>
            <Link to="/booking" className="btn-primary">Book a Session</Link>
            <Link to="/gallery" className="btn-ghost">View Gallery</Link>
          </motion.div>
        </div>

        {/* 3D rendered camera on a transparent canvas — genuinely floats on the
            hero background. Mobile / reduced-motion fall back to the poster. */}
        <motion.div
          className="relative"
          initial={reduced ? false : { opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.25, ease: [0.22, 0.61, 0.36, 1] }}
        >
          <div className="pointer-events-none absolute inset-0 -z-10 bg-accent/12 blur-[90px]" />
          {show3D ? (
            <div className="h-[440px] lg:h-[580px] lg:-my-8">
              <Suspense fallback={null}>
                <CameraScene />
              </Suspense>
              <span className="pointer-events-none absolute bottom-1 left-1/2 -translate-x-1/2 font-mono text-[0.7rem] uppercase tracking-widest text-muted">
                Drag to rotate
              </span>
            </div>
          ) : (
            <img
              src="/hero-poster.jpg"
              alt="Professional camera"
              className="mx-auto w-full hero-media-mask"
              style={{ mixBlendMode: 'screen' }}
            />
          )}
        </motion.div>
      </div>
      <div className="pointer-events-none absolute inset-x-0 -bottom-px h-24 bg-gradient-to-b from-transparent to-base" />
    </section>
  )
}
