import { useState, useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { NAV_LINKS, STUDIO } from '../data/content.js'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion.js'
import LogoMark from './Logo.jsx'

function Logo() {
  return (
    <span className="inline-flex items-center gap-2.5">
      <LogoMark size={34} />
      <span className="font-display text-xl font-semibold tracking-tight">{STUDIO.name}</span>
    </span>
  )
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const location = useLocation()
  const reduced = usePrefersReducedMotion()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close mobile menu on route change + lock body scroll while open.
  useEffect(() => { setOpen(false) }, [location.pathname])
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <nav
        className={`transition-all duration-300 ${scrolled || open ? 'glass shadow-glass' : 'bg-transparent border-b border-transparent'}`}
        aria-label="Primary"
      >
        <div className="container-x flex h-16 items-center justify-between sm:h-[72px]">
          <Link to="/" aria-label={`${STUDIO.name} home`}><Logo /></Link>

          {/* Desktop links */}
          <ul className="hidden items-center gap-8 md:flex">
            {NAV_LINKS.map((l) => (
              <li key={l.to}>
                <NavLink
                  to={l.to}
                  className={({ isActive }) =>
                    `relative text-sm font-medium transition-colors hover:text-ink ${isActive ? 'text-ink' : 'text-muted'}`
                  }
                >
                  {({ isActive }) => (
                    <>
                      {l.label}
                      {isActive && (
                        <motion.span layoutId="nav-underline" className="absolute -bottom-1.5 left-0 h-px w-full bg-accent" />
                      )}
                    </>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3">
            <Link to="/booking" className="btn-primary hidden sm:inline-flex !py-2.5 !px-5 text-sm">Book a Session</Link>
            {/* Hamburger */}
            <button
              className="grid h-11 w-11 place-items-center rounded-lg md:hidden"
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
            >
              <span className="relative block h-4 w-6">
                <span className={`absolute left-0 h-0.5 w-6 bg-ink transition-all duration-300 ${open ? 'top-1.5 rotate-45' : 'top-0'}`} />
                <span className={`absolute left-0 top-1.5 h-0.5 w-6 bg-ink transition-all duration-200 ${open ? 'opacity-0' : 'opacity-100'}`} />
                <span className={`absolute left-0 h-0.5 w-6 bg-ink transition-all duration-300 ${open ? 'top-1.5 -rotate-45' : 'top-3'}`} />
              </span>
            </button>
          </div>
        </div>

        {/* Mobile dropdown — content-height, no full-screen void */}
        <AnimatePresence>
          {open && (
            <motion.div
              className="md:hidden overflow-hidden border-t border-white/5"
              initial={reduced ? false : { height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={reduced ? { opacity: 0 } : { height: 0, opacity: 0 }}
              transition={{ duration: 0.28, ease: [0.22, 0.61, 0.36, 1] }}
            >
              <ul className="container-x flex flex-col py-3">
                {NAV_LINKS.map((l) => (
                  <li key={l.to}>
                    <NavLink
                      to={l.to}
                      className={({ isActive }) =>
                        `block border-b border-white/5 py-3.5 text-base ${isActive ? 'font-medium text-accent-bright' : 'text-ink'}`
                      }
                    >
                      {l.label}
                    </NavLink>
                  </li>
                ))}
                <li><Link to="/booking" className="btn-primary mt-4 w-full">Book a Session</Link></li>
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  )
}
