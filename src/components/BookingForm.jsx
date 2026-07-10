import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { PACKAGES } from '../data/content.js'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const field =
  'w-full rounded-lg border border-white/10 bg-white/[0.03] px-4 py-3 text-ink placeholder:text-muted/70 ' +
  'outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/30'

export default function BookingForm({ defaultPackage = '' }) {
  const [values, setValues] = useState({ name: '', email: '', phone: '', pkg: defaultPackage, date: '', message: '' })
  const [errors, setErrors] = useState({})
  const [sent, setSent] = useState(false)

  const set = (k) => (e) => {
    setValues((v) => ({ ...v, [k]: e.target.value }))
    if (errors[k]) setErrors((er) => ({ ...er, [k]: undefined }))
  }

  const validate = () => {
    const er = {}
    if (!values.name.trim()) er.name = 'Please enter your name.'
    if (!values.email.trim()) er.email = 'Please enter your email.'
    else if (!EMAIL_RE.test(values.email)) er.email = 'Enter a valid email address.'
    if (!values.pkg) er.pkg = 'Please choose a package.'
    setErrors(er)
    return Object.keys(er).length === 0
  }

  const onSubmit = (e) => {
    e.preventDefault()
    if (!validate()) return
    /* TODO: BACKEND — POST these values to email / a form service (Formspree-equivalent)
       or a lightweight webhook. Front-end only for now: show the success state. */
    setSent(true)
  }

  return (
    <div className="glass rounded-2xl p-6 sm:p-8">
      <AnimatePresence mode="wait">
        {sent ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="py-8 text-center"
          >
            <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-accent/15 text-accent">
              <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
            </div>
            <h3 className="mt-4 text-2xl">Request received</h3>
            <p className="mx-auto mt-2 max-w-sm text-muted">Thanks, {values.name.split(' ')[0] || 'there'} — we’ll be in touch within one business day to confirm your session.</p>
          </motion.div>
        ) : (
          <motion.form key="form" onSubmit={onSubmit} noValidate initial={false} className="grid gap-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="b-name" className="mb-1.5 block text-sm font-medium">Name <span className="text-accent">*</span></label>
                <input id="b-name" className={field} value={values.name} onChange={set('name')} autoComplete="name" />
                {errors.name && <p className="mt-1 text-sm text-red-400">{errors.name}</p>}
              </div>
              <div>
                <label htmlFor="b-email" className="mb-1.5 block text-sm font-medium">Email <span className="text-accent">*</span></label>
                <input id="b-email" type="email" className={field} value={values.email} onChange={set('email')} autoComplete="email" />
                {errors.email && <p className="mt-1 text-sm text-red-400">{errors.email}</p>}
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="b-phone" className="mb-1.5 block text-sm font-medium">Phone</label>
                <input id="b-phone" type="tel" className={field} value={values.phone} onChange={set('phone')} autoComplete="tel" />
              </div>
              <div>
                <label htmlFor="b-pkg" className="mb-1.5 block text-sm font-medium">Package <span className="text-accent">*</span></label>
                <select id="b-pkg" className={field} value={values.pkg} onChange={set('pkg')}>
                  <option value="">Select a package…</option>
                  {PACKAGES.map((p) => <option key={p.name} value={p.name}>{p.name} — from {p.from}</option>)}
                </select>
                {errors.pkg && <p className="mt-1 text-sm text-red-400">{errors.pkg}</p>}
              </div>
            </div>

            <div>
              <label htmlFor="b-date" className="mb-1.5 block text-sm font-medium">Preferred date</label>
              <input id="b-date" type="date" className={field} value={values.date} onChange={set('date')} />
            </div>

            <div>
              <label htmlFor="b-msg" className="mb-1.5 block text-sm font-medium">Tell us about the shoot</label>
              <textarea id="b-msg" rows={4} className={`${field} resize-y`} placeholder="What are we creating together?" value={values.message} onChange={set('message')} />
            </div>

            <button type="submit" className="btn-primary mt-1 w-full">Request Booking</button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  )
}
