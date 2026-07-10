import { motion } from 'framer-motion'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion.js'

// Cascading reveal — signals reading order. Fades + rises into place on scroll.
// `delay` staggers siblings; respects reduced motion (renders instantly).
export default function Reveal({ children, delay = 0, y = 24, className = '', as = 'div' }) {
  const reduced = usePrefersReducedMotion()
  const MotionTag = motion[as] || motion.div
  if (reduced) {
    const Tag = as
    return <Tag className={className}>{children}</Tag>
  }
  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
      transition={{ duration: 0.7, delay, ease: [0.22, 0.61, 0.36, 1] }}
    >
      {children}
    </MotionTag>
  )
}
