// Sample data in the exact shape returned by the gbp_health_report script.
const d = (days) => new Date(Date.now() - days * 86400000).toISOString()
export const SAMPLE_PLACES = [
  { place_id: 'sample1', name: 'Skin Glow KC', address: 'Kansas City, MO, USA' },
  { place_id: 'sample2', name: 'Skin Glow Studio', address: 'Overland Park, KS, USA' }
]
export const SAMPLE_RAW = {
  business: { place_id: 'sample1', name: 'Skin Glow KC', address: 'Kansas City, MO, USA', rating: 4.9, reviews: 144, website: 'https://example.com', phone: '(816) 555-0100', category: 'Skin care clinic', primary_type: 'skin_care_clinic', summary: '', status: 'OPERATIONAL', lat: 39.0997, lng: -94.5786 },
  reviews: [{ rating: 5, time: d(9) }, { rating: 5, time: d(11) }, { rating: 5, time: d(34) }, { rating: 4, time: d(41) }, { rating: 5, time: d(75) }],
  photos: 5, attributes: 2, has_hours: true, hours_per_week: 40,
  competitors: [
    { name: 'Radiance Skin Lab', rating: 4.8, reviews: 310, hours: 52 }, { name: 'Glow Up Aesthetics', rating: 4.7, reviews: 220, hours: 48 },
    { name: 'Pure Skin Clinic', rating: 4.6, reviews: 180, hours: 45 }, { name: 'Dermal Bliss', rating: 4.9, reviews: 95, hours: 40 },
    { name: 'The Facial Bar', rating: 4.5, reviews: 60, hours: 44 }, { name: 'Bloom Skin Care', rating: 4.4, reviews: 33, hours: 36 }
  ]
}
