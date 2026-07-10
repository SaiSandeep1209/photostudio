import { useState, useRef, useEffect } from 'react'

// Blur-up image: loads blurred + slightly scaled, sharpens in on load.
// Disguises load time and reads as intentional rather than a spinner.
export default function BlurImage({ src, alt, className = '', imgClassName = '', ...rest }) {
  const [loaded, setLoaded] = useState(false)
  const ref = useRef(null)

  // Handle images that are already cached (onLoad may not fire).
  useEffect(() => {
    if (ref.current && ref.current.complete) setLoaded(true)
  }, [])

  return (
    <div className={`relative overflow-hidden bg-panel ${className}`}>
      <img
        ref={ref}
        src={src}
        alt={alt}
        loading="lazy"
        onLoad={() => setLoaded(true)}
        className={`h-full w-full object-cover blur-up ${loaded ? 'loaded' : ''} ${imgClassName}`}
        {...rest}
      />
    </div>
  )
}
