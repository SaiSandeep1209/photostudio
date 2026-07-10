// Camera-mark from the Sangeetha Studio logo (background made transparent).
// Used in the nav + favicon; the footer uses the full lockup (logo.png).
export default function LogoMark({ size = 36, className = '' }) {
  return (
    <img
      src="/logo-mark.png"
      alt=""
      aria-hidden="true"
      style={{ height: size, width: 'auto' }}
      className={className}
    />
  )
}
