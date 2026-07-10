// ---------------------------------------------------------------------------
// Central content for the site. REALISTIC PLACEHOLDERS — replace copy, prices,
// specs and testimonials with the studio's real details before launch.
// Image files live in /public/images (downloaded stock; swap for real work).
// ---------------------------------------------------------------------------

export const STUDIO = {
  name: 'Sangeetha Studio',
  handle: '@sangeethastudio',
  tagline: 'A studio for light, story and stillness.',
  positioning: 'Premium photography for people and brands who care how they are seen.',
  phone: '+91 90000 00000',            // REPLACE
  email: 'hello@sangeethastudio.com',   // REPLACE (placeholder domain)
  instagram: 'https://instagram.com/',  // REPLACE
  address: 'Studio 4, Frame Works, Indiranagar, Bengaluru', // REPLACE
}

// 5–6 signature disciplines — the studio's strongest, most bookable work.
export const DISCIPLINES = [
  { slug: 'portrait',    title: 'Portrait',              blurb: 'Editorial, corporate and personal portraiture that actually looks like you — on your best day.', img: 'images/portrait.jpg' },
  { slug: 'wedding',     title: 'Wedding',               blurb: 'Unscripted, cinematic coverage of the day — from the quiet morning to the last dance.',        img: 'images/wedding.jpg' },
  { slug: 'maternity',  title: 'Maternity',  blurb: 'Tender, glowing sessions that celebrate motherhood and the wait.',                     img: 'images/maternity.jpg' },
  { slug: 'birthday',   title: 'Birthday',   blurb: 'Cakes, candles and pure joy — birthday moments captured just as they happen.',          img: 'images/birthday.jpg' },
  { slug: 'baby-bath',  title: 'Baby Bath',  blurb: 'Gentle coverage of the little milestones — the first bath, the first giggles.',        img: 'images/baby-bath.jpg' },
  { slug: 'engagement', title: 'Engagement', blurb: 'The “yes” and everything after — romantic couple sessions to treasure.',                img: 'images/engagement.jpg' },
]

// Lighter secondary list — "also available, just ask"
export const ALSO_AVAILABLE = ['Candid', 'Party', 'Anniversary', 'Festivals', 'Functions', 'Drone']

// Equipment — real gear, real specs, mono-font data treatment.
export const EQUIPMENT = {
  Cameras: [
    { name: 'Sony Alpha A1',    specs: [['Sensor', '50MP full-frame'], ['ISO', '100–32000'], ['Burst', '30 fps'], ['Mount', 'Sony E']] },
    { name: 'Canon EOS R5',     specs: [['Sensor', '45MP full-frame'], ['ISO', '100–51200'], ['Video', '8K RAW'], ['Mount', 'Canon RF']] },
    { name: 'Nikon Z9',         specs: [['Sensor', '45.7MP stacked'], ['ISO', '64–25600'], ['AF', '493-point'], ['Mount', 'Nikon Z']] },
    { name: 'DJI Air 3 Drone',  specs: [['Sensor', 'Dual 1/1.3"'], ['Video', '4K/100fps'], ['Range', '20 km'], ['Flight', '46 min']] },
    { name: 'GoPro Hero 12',    specs: [['Sensor', '27MP'], ['Video', '5.3K/60'], ['Stab.', 'HyperSmooth 6'], ['Depth', '10 m']] },
    { name: 'Insta360 X4',      specs: [['Capture', '8K 360°'], ['Photo', '72MP'], ['Stab.', 'FlowState'], ['Water', '10 m']] },
  ],
  Lenses: [
    { name: '24–70mm f/2.8', specs: [['Range', 'Standard zoom'], ['Aperture', 'f/2.8'], ['Use', 'Weddings, events']] },
    { name: '50mm f/1.2',    specs: [['Range', 'Prime'], ['Aperture', 'f/1.2'], ['Use', 'Portrait, low light']] },
    { name: '85mm f/1.4',    specs: [['Range', 'Short tele'], ['Aperture', 'f/1.4'], ['Use', 'Portrait, fashion']] },
    { name: '70–200mm f/2.8',specs: [['Range', 'Tele zoom'], ['Aperture', 'f/2.8'], ['Use', 'Sport, candid']] },
    { name: '100mm Macro',   specs: [['Range', 'Macro 1:1'], ['Aperture', 'f/2.8'], ['Use', 'Product, jewelry']] },
    { name: '14–24mm Ultra-wide', specs: [['Range', 'Ultra-wide'], ['Aperture', 'f/2.8'], ['Use', 'Architecture']] },
  ],
}

// Service packages — the single biggest browse→book lever. "from ₹X".
export const PACKAGES = [
  {
    name: 'Session', from: '₹12,000', featured: false,
    summary: 'A focused shoot for portraits, personal branding or a single product line.',
    includes: ['1.5-hour studio or location session', '1 outfit / setup', '15 retouched hi-res images', 'Online gallery to download'],
    turnaround: '5 business days',
  },
  {
    name: 'Signature', from: '₹32,000', featured: true,
    summary: 'Our most-booked package — built for campaigns, lookbooks and premium branding.',
    includes: ['Half-day shoot (up to 4 hours)', 'Up to 4 setups / looks', '40 retouched hi-res images', 'Art direction & mood board', 'Priority online gallery'],
    turnaround: '4 business days',
  },
  {
    name: 'Production', from: '₹75,000', featured: false,
    summary: 'Full-scale production for weddings, brand films and multi-day commercial work.',
    includes: ['Full-day / multi-day coverage', 'Second shooter + assistant', '100+ retouched images', 'Drone & video add-ons', 'Same-week preview edit'],
    turnaround: '10 business days',
  },
]

export const TESTIMONIALS = [
  { name: 'Ananya Iyer',  role: 'Brand Founder, Lumen Skincare', quote: 'The product set they delivered lifted our conversion noticeably. Every frame looked considered — nothing felt off-the-shelf.', rating: 5 },
  { name: 'Kabir & Sara', role: 'Wedding clients',                quote: 'They were invisible all day and yet somehow caught every moment that mattered. The gallery made us cry — twice.',           rating: 5 },
  { name: 'Rhea Malhotra',role: 'Creative Director, Vestige',    quote: 'The most calm, prepared team we have shot with. The editorial came back sharper and faster than promised.',               rating: 5 },
  { name: 'Dev Menon',    role: 'Architect, Studio Verse',       quote: 'They understood light and geometry immediately. The interiors set finally does the building justice.',                    rating: 5 },
]

// Gallery images with category tags for filtering.
export const GALLERY = [
  { src: 'images/gallery-1.jpg',  cat: 'Portrait',      w: 3, h: 4 },
  { src: 'images/gallery-2.jpg',  cat: 'Fashion',       w: 4, h: 3 },
  { src: 'images/gallery-3.jpg',  cat: 'Wedding',       w: 3, h: 4 },
  { src: 'images/gallery-4.jpg',  cat: 'Product',       w: 1, h: 1 },
  { src: 'images/gallery-5.jpg',  cat: 'Architecture',  w: 4, h: 3 },
  { src: 'images/gallery-6.jpg',  cat: 'Automotive',    w: 4, h: 3 },
  { src: 'images/gallery-7.jpg',  cat: 'Portrait',      w: 3, h: 4 },
  { src: 'images/gallery-8.jpg',  cat: 'Fashion',       w: 3, h: 4 },
  { src: 'images/gallery-9.jpg',  cat: 'Wedding',       w: 4, h: 3 },
  { src: 'images/gallery-10.jpg', cat: 'Product',       w: 1, h: 1 },
  { src: 'images/gallery-11.jpg', cat: 'Architecture',  w: 3, h: 4 },
  { src: 'images/gallery-12.jpg', cat: 'Automotive',    w: 4, h: 3 },
]

export const GALLERY_CATEGORIES = ['All', 'Portrait', 'Fashion', 'Wedding', 'Product', 'Architecture', 'Automotive']

// Before / after editing pairs
export const BEFORE_AFTER = { before: 'images/before.jpg', after: 'images/after.jpg' }

export const NAV_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/services', label: 'Services' },
  { to: '/equipment', label: 'Equipment' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
]
