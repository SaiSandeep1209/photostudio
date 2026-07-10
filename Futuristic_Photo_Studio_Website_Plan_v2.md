# Futuristic Photo Studio — Website Plan

**Phase 1 scope: premium presentation + usability.** This phase is built to represent the studio to potential clients — how the site *looks*, *feels*, and *works* when someone lands on it, browses it, and decides to book. SEO, content marketing, and backend infrastructure are intentionally deferred to Phase 2 (see final section) so this phase can move fast and stay focused on the buyer-facing experience.

---

## 1. Vision

A dark, futuristic photography studio site that reads as premium through **restraint and craft**, not through stacking every possible effect. One signature graphic moment, purposeful motion, and a clear path from "browsing" to "booked." Every animation has to earn its place by helping a visitor understand or decide something — not just move.

---

## 2. Design Language

### Palette (defined, not "neon" as a general instruction)

| Role | Value | Usage |
|---|---|---|
| Base | `#0A0B0E` | Page background |
| Panel | `#12141A` | Cards, sections |
| Glass surface | `rgba(255,255,255,0.04)` + `1px solid rgba(255,255,255,0.08)` | Floating UI only — nav, filter pills, hover spec cards |
| Signal accent | `#6E5BFF` (violet-blue) | CTAs, active states, key highlights — **one accent, used deliberately** |
| Secondary glow | `#3ED9C7` (cyan) | Hover feedback only, never resting state |
| Text primary | `#F3F3F5` | Body copy, headlines |
| Text muted | `#8A8D96` | Captions, labels, secondary copy |

**Glass rule:** glassmorphism is reserved for floating interactive elements (nav bar, filter pills, spec overlays), not applied to whole section backgrounds. If everything is glass, nothing reads as glass.

**Accent rule:** violet-blue is the only "signal" color — it means "click me" or "this is active." Cyan only appears on hover/interaction, never at rest. Two competing neon colors both glowing constantly is what makes dark-futuristic sites look templated; one accent with a clear job avoids that.

### Typography

- **Display:** A geometric, wide-set sans (e.g. General Sans or Clash Display) for headlines — carries the "futuristic" feel without leaning on color to do the work.
- **Body:** Inter — for actual readability on long copy (Services, About, package details).
- **Data/specs:** JetBrains Mono — for equipment specs, camera details, package pricing tables. Numbers and specs should look like data, not like headlines.

### Signature Graphic (the one big swing)

One interactive 3D element in the hero — a rotatable camera/lens model the visitor can drag, rendered with React Three Fiber. This is the **only** 3D element in Phase 1. Concentrating the "wow" here does two things: it gives the site one truly memorable moment, and it keeps 3D rendering cost contained to a single component instead of a performance tax paid on every page.

Floating background objects and full-page parallax are **cut** from this phase — they were in the original animation list but tend to read as decorative noise rather than premium, and they cost real performance on mobile. If a floating/parallax moment is wanted later, it should be one intentional accent (e.g. subtle depth on the hero only), not a site-wide layer.

---

## 3. Site Map

1. Home
2. Gallery
3. Services
4. Equipment
5. About
6. Booking
7. Contact

Same structure as the original plan — it's the right shape for how a client actually evaluates a studio (see work → understand offerings → check credibility → book).

---

## 4. Home Page Structure

### Hero
- Fullscreen background video (compressed, with a static poster frame fallback for slow connections)
- Interactive 3D camera model, draggable, positioned so it doesn't fight the headline
- Headline + one-line positioning statement
- Two CTAs max: primary ("Book a Session"), secondary ("View Gallery")
- Fade-in text sequenced *after* the video/3D model has visibly loaded — never fade in over a blank frame

### Signature Disciplines (replaces the 18-item carousel)
Rather than one carousel presenting 18 categories as equal specialties, split into two tiers:

- **Signature disciplines** (5–6 max, featured with imagery and short copy): e.g. Portrait, Wedding, Fashion & Editorial, Product & Commercial, Real Estate & Architecture, Automotive.
  *(Placeholder set — replace with whichever categories are actually this studio's strongest, most bookable work. Leading with everything-we-shoot dilutes premium positioning; leading with 5–6 strong categories builds it.)*
- **Also available** (a compact filterable tag list, not a full carousel): Corporate, Food, Jewelry, Kids, Maternity, Events, Drone, Wildlife, Travel, Pet, Fine Art. Presented as a lighter secondary section — "and more, ask us" — rather than competing for equal visual weight.

### Equipment Showcase
Cameras, lenses, drones, lighting — hover reveals specs (sensor, aperture range, ISO, mount). Kept as originally planned; this is a strong trust-building section for a photography buyer and pairs well with the mono-font spec treatment.

### Masonry Gallery (preview)
- Cascading entrance (staggered fade + rise, matches the site's existing motion language)
- Blur-reveal on image load (images load blurred, sharpen in — feels premium, also disguises loading time)
- Hover zoom
- Category filters
- This is a *preview* strip on Home linking to the full Gallery page — Home shouldn't try to be the gallery.

### Before / After Editing
Interactive comparison slider — kept as planned. Strong, concrete proof of editing quality.

### Testimonials
Auto-advancing carousel, pause on hover/interaction, video and image cards mixed. Same as original plan.

### Booking CTA
Simple form with package selection. See Services note below — this only works well if Services has already defined what the packages *are*.

---

## 5. Services (new emphasis)

The original plan mentioned "package selection" at booking but never defined packages. For Phase 1, Services needs to answer, per package tier: what's included, turnaround time, and starting price (or "from ₹X"). This is usually the single biggest thing that moves someone from browsing to booking — worth building out properly now rather than leaving it vague until Phase 2.

---

## 6. Equipment

### Cameras
Sony Alpha, Canon EOS R, Nikon Z, DJI Drones, GoPro, Insta360

### Lenses
24–70mm, 50mm, 85mm, 70–200mm, Macro, Ultra-wide

Kept as originally planned — real gear, real specs, presented with the mono-font data treatment described above.

---

## 7. Animation Principles

Every animation on this list has a specific job. None are "just because it looks futuristic."

| Animation | Job it does |
|---|---|
| Cascading section/card reveal | Signals hierarchy — content appears in the order it should be read |
| Blur reveal on images | Disguises load time, feels intentional rather than a loading spinner |
| Carousel autoplay (testimonials) | Surfaces social proof without requiring a click |
| Card hover tilt (subtle, ~4–6°) | Feedback that a card is interactive — kept small so it reads as polish, not gimmick |
| 3D hero model, drag-to-rotate | The one signature "wow" moment |
| Smooth page transitions | Continuity between pages, avoids jarring hard-cuts |

**Cut from Phase 1:** floating background objects, full-page parallax scrolling. Reasoning above in Section 2.

**Non-negotiable:** every animated element respects `prefers-reduced-motion` — this isn't optional polish, it's an accessibility requirement, and it also happens to be the fallback that keeps the site usable on low-end mobile devices during a live demo.

---

## 8. Tech Stack (simplified)

- **React + Vite** — unchanged, right tool for this.
- **Tailwind CSS** — unchanged.
- **Framer Motion** — the *only* motion/scroll library. Original plan had Framer Motion, GSAP, and Lenis all doing overlapping scroll/animation work — that's redundant weight and a maintenance headache. Framer Motion covers reveals, transitions, and hover states; if a future animation genuinely needs GSAP's timeline precision (e.g. a complex scroll-scrubbed sequence), add it deliberately then, not preemptively now.
- **Swiper.js** — kept, specifically for carousels (styles, testimonials).
- **React Three Fiber** — kept, but scoped narrowly to the one hero 3D model. Not a general-purpose layer.
- **Booking form → email/webhook** — for Phase 1, the booking form can post directly to email or a lightweight form service (e.g. Formspree-equivalent) rather than standing up a database. MongoDB is deferred to Phase 2, where it earns its place once a client proof gallery or admin dashboard actually need persistent data.

---

## 9. Usability & Buyer-Facing Readiness

Since this site's immediate job is representing the studio to potential clients, these matter as much as any visual choice:

- **Load speed on first impression:** hero video should have a compressed poster-frame fallback; target sub-3-second perceived load. A buyer bouncing off a slow hero never sees the rest of the craft.
- **One primary action per screen:** every section should have a clear, singular "next step" — usually "Book a Session" or "View Gallery." Competing CTAs slow decisions.
- **Portfolio reachable in one click from anywhere:** a photography buyer's first instinct is "show me the work" — Gallery should never be more than one click from any page.
- **Contrast on a dark theme:** dark UI makes it easy to accidentally fail contrast requirements. Body text and CTA text should meet WCAG AA minimum contrast even against the charcoal base.
- **Mobile-first testing:** most buyers will first open this on a phone, possibly while being pitched in person or via a shared link. Every core interaction (carousel swipe, comparison slider, booking form) needs to work cleanly on a small screen, not just gracefully degrade.
- **No blank-frame flashes:** on a dark, animation-heavy site, any unstyled flash of white or unstyled content between loads breaks the premium feel immediately — worth explicit QA pass before any client demo.

---

## 10. Folder Outline

```
src/
  components/
  pages/
  assets/
  animations/
  hooks/
  layouts/
```

Unchanged — still the right shape.

---

## 11. Phase 2 (explicitly deferred)

Not in scope now — revisit once Phase 1 is live and being used in real client conversations:

- **SEO** — meta tags, structured data (local business schema), sitemap, page-speed audit, blog/content strategy. Deferred deliberately per current priority, not forgotten.
- AI style selector
- Virtual studio tour
- Online booking/payment processing
- Photographer profiles
- Admin dashboard
- Client proof gallery (this is where MongoDB or a similar DB would come in)
- Blog

---

## Summary of what changed from v1

- Style carousel: 18 equal-weight categories → 5–6 signature disciplines + a lighter secondary tag list
- Design theme: general "neon blue/purple" instruction → a defined palette with one signal accent and clear glass/accent usage rules
- 3D/graphics: scattered "floating objects" everywhere → one signature interactive hero model
- Animation list: floating objects + parallax cut; everything remaining tied to a specific job
- Stack: Framer Motion + GSAP + Lenis (redundant) → Framer Motion only
- MongoDB: "optional" → explicitly deferred to Phase 2
- Added: defined Services/package structure (was implied but undefined), Usability & Buyer-Facing Readiness section
- SEO: moved from a bullet in "Future Enhancements" to its own explicit Phase 2 heading, per current priority
