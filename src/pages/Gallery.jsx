import { useSearchParams } from 'react-router-dom'
import { PageHero, Section } from '../components/Section.jsx'
import MasonryGallery from '../components/MasonryGallery.jsx'
import { GALLERY, GALLERY_CATEGORIES } from '../data/content.js'

export default function Gallery() {
  const [params] = useSearchParams()
  const requested = params.get('cat')
  const initialCat = GALLERY_CATEGORIES.includes(requested) ? requested : 'All'

  return (
    <>
      <PageHero
        eyebrow="Portfolio"
        title="The full frame"
        lead="A cross-section of recent work across every discipline. Filter to what you’re looking for."
      />
      <Section className="!pt-4">
        <MasonryGallery items={GALLERY} filterable initialCat={initialCat} />
      </Section>
    </>
  )
}
