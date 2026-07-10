import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import { TESTIMONIALS } from '../data/content.js'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion.js'

function Stars({ n }) {
  return <div className="text-glow tracking-widest" aria-label={`${n} out of 5 stars`}>{'★'.repeat(n)}</div>
}

export default function Testimonials() {
  const reduced = usePrefersReducedMotion()
  return (
    <Swiper
      modules={[Autoplay, Pagination]}
      spaceBetween={24}
      slidesPerView={1}
      loop={!reduced}
      autoplay={reduced ? false : { delay: 5000, disableOnInteraction: false, pauseOnMouseEnter: true }}
      pagination={{ clickable: true }}
      breakpoints={{ 768: { slidesPerView: 2 } }}
      className="!pb-14"
    >
      {TESTIMONIALS.map((t, i) => (
        <SwiperSlide key={i} className="h-auto">
          <figure className="glass flex h-full flex-col rounded-2xl p-8">
            <Stars n={t.rating} />
            <blockquote className="mt-4 flex-1 font-display text-xl leading-snug text-ink">“{t.quote}”</blockquote>
            <figcaption className="mt-6 flex items-center gap-3">
              <span className="grid h-11 w-11 place-items-center rounded-full bg-gradient-to-br from-accent to-glow font-display font-semibold text-[#140f0a]">
                {t.name.charAt(0)}
              </span>
              <span>
                <span className="block font-medium text-ink">{t.name}</span>
                <span className="block text-sm text-muted">{t.role}</span>
              </span>
            </figcaption>
          </figure>
        </SwiperSlide>
      ))}
    </Swiper>
  )
}
