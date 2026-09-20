/**
 * LOZ BARBERSHOP — Site Configuration
 * ====================================
 * Edit this file to update business information across the entire website.
 * All booking buttons, social links, and business details reference this config.
 *
 * IMPORTANT: This is currently a REDESIGN CONCEPT / DEMO.
 * All data must be verified with the business owner before official publication.
 */

window.LOZ_CONFIG = {
  // ── Business Information ──────────────────────────────────────
  businessName: 'LOZ BARBERSHOP',
  address: {
    street: 'Leopoldauer Platz 13',
    zip: '1210',
    city: 'Wien',
    country: 'Austria',
    full: 'Leopoldauer Platz 13, 1210 Wien',
  },
  phone: '+43 660 536 33 31',
  phoneFormatted: '+43 660 536 33 31',

  // ── External Links ────────────────────────────────────────────
  bookingUrl: 'https://www.treatwell.at/ort/loz-barbershop-friseur/',
  instagramUrl: 'https://www.instagram.com/loz_barbershop_/',
  tiktokUrl: 'https://www.tiktok.com/@loz_barbershop',

  // ── Reviews (Treatwell — verified) ────────────────────────────
  reviewPlatform: 'Treatwell',
  reviewRating: 5.0,
  reviewCount: 27,
  reviewUrl: 'https://www.treatwell.at/ort/loz-barbershop-friseur/',

  // ── Opening Hours ─────────────────────────────────────────────
  // OPENING HOURS MUST BE CONFIRMED WITH THE BUSINESS OWNER BEFORE OFFICIAL LAUNCH.
  // Current source: Treatwell listing (as of September 2026).
  hours: [
    { day: 'Montag',     time: '09:00 – 19:00' },
    { day: 'Dienstag',   time: '09:00 – 19:00' },
    { day: 'Mittwoch',   time: '09:00 – 19:00' },
    { day: 'Donnerstag', time: '09:00 – 19:00' },
    { day: 'Freitag',    time: '09:00 – 17:00' },
    { day: 'Samstag',    time: '09:00 – 17:00' },
    { day: 'Sonntag',    time: 'Geschlossen'    },
  ],
  hoursShort: 'Mo–Do 09–19 · Fr–Sa 09–17',

  // ── Google Maps ───────────────────────────────────────────────
  mapsEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2657.2!2d16.4565!3d48.2780!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sLeopoldauer+Platz+13%2C+1210+Wien!5e0!3m2!1sde!2sat!4v1',
  mapsDirectionsUrl: 'https://www.google.com/maps/dir/?api=1&destination=Leopoldauer+Platz+13,+1210+Wien,+Austria',

  // ── Pricing ───────────────────────────────────────────────────
  prices: {
    hair: [
      { name: 'Schneiden, Föhnen & Styling', price: '€19' },
      { name: 'Waschen + Schneiden + Styling', price: '€24' },
      { name: 'Kids bis 12 Jahre', price: '€16' },
    ],
    beard: [
      { name: 'Modellbartrasur', price: '€13' },
      { name: 'Augenbrauen', price: '€7' },
    ],
  },

  // ── Team ──────────────────────────────────────────────────────
  // TEAM SECTION: re-enable after real staff photos are supplied by the owner.
  team: [
    { name: 'Omar', role: 'Barber' },
    { name: 'Bahzad', role: 'Barber' },
  ],
};
