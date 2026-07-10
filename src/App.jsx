import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { useEffect } from 'react'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import { usePrefersReducedMotion } from './hooks/usePrefersReducedMotion.js'

import Home from './pages/Home.jsx'
import Gallery from './pages/Gallery.jsx'
import Services from './pages/Services.jsx'
import Equipment from './pages/Equipment.jsx'
import About from './pages/About.jsx'
import Booking from './pages/Booking.jsx'
import Contact from './pages/Contact.jsx'

// Scroll to top on every route change (SPA continuity).
function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

function Page({ children }) {
  const reduced = usePrefersReducedMotion()
  return (
    <motion.main
      initial={reduced ? false : { opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={reduced ? undefined : { opacity: 0, y: -8 }}
      transition={{ duration: 0.4, ease: [0.22, 0.61, 0.36, 1] }}
    >
      {children}
    </motion.main>
  )
}

export default function App() {
  const location = useLocation()
  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:z-[200] focus:m-3 focus:rounded-lg focus:bg-accent focus:px-4 focus:py-2 focus:text-[#140f0a]">Skip to content</a>
      <Navbar />
      <ScrollToTop />
      <div id="main">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Page><Home /></Page>} />
            <Route path="/gallery" element={<Page><Gallery /></Page>} />
            <Route path="/services" element={<Page><Services /></Page>} />
            <Route path="/equipment" element={<Page><Equipment /></Page>} />
            <Route path="/about" element={<Page><About /></Page>} />
            <Route path="/booking" element={<Page><Booking /></Page>} />
            <Route path="/contact" element={<Page><Contact /></Page>} />
            <Route path="*" element={<Page><Home /></Page>} />
          </Routes>
        </AnimatePresence>
      </div>
      <Footer />
    </>
  )
}
