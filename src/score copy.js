// Scoring for the GBP health report. Pure functions: raw Places data in, scored report out.
// Only what the public Places API can tell us is scored. GBP posts and the services link need
// owner access to the profile, so they are listed as "not scored" and the total is scaled to 100.
// Every threshold lives in CONFIG so it can be tuned in one place.
export const CONFIG = {
  reviewsTargetMin: 50,        // review count that earns full points (or the nearby median, if higher)
  reviewsPerWeekTarget: 2,     // recent review pace that earns full points
  consistencyTolerance: 1.5,   // how uneven the gaps between reviews can be before points drop to 0
  ratingFloor: 3.5,            // rating that earns 0 points
  ratingCeil: 5,               // rating that earns full points
  minCompetitors: 3,           // below this the competition section is not scored
  fallbackHoursPerWeek: 40,    // "long enough" opening hours when no competitor data exists
  attributesTarget: 4,         // profile attributes that earn full points
  goodRatio: 0.95,             // share of points needed to count as good
  okRatio: 0.5                 // below this share an item is critical, between is an improvement
}

const DAY = 86400000
const clamp = (x, a = 0, b = 1) => Math.min(b, Math.max(a, x))
const median = (a) => { if (!a.length) return 0; const s = [...a].sort((x, y) => x - y); const m = s.length >> 1; return s.length % 2 ? s[m] : (s[m - 1] + s[m]) / 2 }
const sevOf = (score, max) => { const r = score / max; return r >= CONFIG.goodRatio ? 'good' : r >= CONFIG.okRatio ? 'improve' : 'critical' }

// One scored line item. `good` / `bad` hold the copy shown for each outcome.
function item(id, title, score, max, o) {
  const s = Math.round(score)
  const sev = sevOf(s, max)
  const c = sev === 'good' ? o.good : o.bad
  return { id, title, score: s, max, sev, pts: max - s, lines: c.lines, steps: c.steps, cta: c.cta, tag: c.tag, note: o.note }
}

export function scoreReport(raw, now = Date.now()) {
  const b = raw.business || {}
  const comps = raw.competitors || []
  const myReviews = b.reviews || 0
  const myRating = b.rating || 0
  const times = (raw.reviews || []).map((r) => Date.parse(r.time)).filter(Number.isFinite).sort((x, y) => y - x)
  const notMeasured = [
    { title: 'GBP posts', why: 'Google does not share posts publicly. Needs owner access to the profile.' },
    { title: 'Services link', why: 'Google does not share this publicly. Needs owner access to the profile.' }
  ]
  const recentNote = 'Based on the ' + times.length + ' most recent reviews Google shares.'

  // ---------------- Reviews (30) ----------------
  const target = Math.max(CONFIG.reviewsTargetMin, median(comps.map((c) => c.reviews || 0)))
  const countItem = item('r-count', 'Overall reviews', 10 * clamp(myReviews / target), 10, {
    good: { lines: ['Your review count is strong, giving you an edge over less-reviewed businesses.', 'Consistent new reviews keep your business visible in local searches.'], steps: ['Keep collecting reviews to stay ahead of competitors', 'Send review requests to your clients'] },
    bad: { lines: ['You have ' + myReviews + ' reviews. Nearby competitors typically have about ' + Math.round(target) + '.', 'More reviews build trust and help you show up in local searches.'], steps: ['Send a review request to every client after their visit', 'Add a review link or QR code at your front desk'], cta: 'Set up an automated review campaign' }
  })
  let velocity = 0, pace = 0, windowDays = 0
  if (times.length) { windowDays = Math.max(7, (now - times[times.length - 1]) / DAY); pace = times.length / (windowDays / 7); velocity = 10 * clamp(pace / CONFIG.reviewsPerWeekTarget) }
  const velocityItem = item('r-velocity', 'Review velocity', velocity, 10, {
    note: recentNote,
    good: { lines: ['Your recent review pace signals an active, trusted business.', 'Staying ahead of competitors who haven’t had reviews in weeks keeps you visible.'], steps: ['Keep the pace at 2+ reviews a week'] },
    bad: { lines: [times.length ? 'Your recent reviews arrived at about ' + pace.toFixed(1) + ' a week, too low to signal active engagement.' : 'We found no recent reviews, which signals low engagement.', 'Recent reviews can move you ahead of competitors who haven’t received reviews in weeks.'], steps: ['Target 2+ reviews a week'], cta: 'Set up an automated review campaign' }
  })
  let consistency = 0, maxGap = 0
  if (times.length >= 3) {
    const gaps = [(now - times[0]) / DAY]
    for (let i = 1; i < times.length; i++) gaps.push((times[i - 1] - times[i]) / DAY)
    const mean = gaps.reduce((a, g) => a + g, 0) / gaps.length
    const sd = Math.sqrt(gaps.reduce((a, g) => a + (g - mean) ** 2, 0) / gaps.length)
    maxGap = Math.max(...gaps)
    consistency = 10 * clamp(1 - (mean ? sd / mean : 0) / CONFIG.consistencyTolerance)
  }
  const consistencyItem = item('r-consistency', 'Review consistency', consistency, 10, {
    note: recentNote,
    good: { lines: ['Your reviews arrive steadily, which helps sustain ranking gains.'], steps: ['Keep asking for reviews every week'] },
    bad: { lines: [times.length >= 3 ? 'Your review activity is uneven. The longest recent gap was about ' + Math.round(maxGap) + ' days.' : 'There are too few recent reviews to show steady activity.', 'Google favors businesses with steady, ongoing reviews rather than occasional spikes.'], steps: ['Aim for 2+ reviews each week to level out your activity'], cta: 'Improve your review consistency' }
  })

  // ---------------- Rating (10) ----------------
  const ratingPts = 10 * clamp((myRating - CONFIG.ratingFloor) / (CONFIG.ratingCeil - CONFIG.ratingFloor))
  const ratingItem = item('rating', 'Average rating', ratingPts, 10, {
    good: { lines: ['Your rating is at or near 5 stars, which attracts clients over lower-rated rivals.'], steps: ['Keep the quality up and reply to every review'] },
    bad: { lines: [myRating >= 4.5 ? 'You’re above 4.5 but still not at 5 stars, so you lag behind perfectly rated rivals.' : 'Your rating is below 4.5, which sends clients to better-rated competitors.', 'Potential clients tend to pick businesses with a 5-star rating, causing you to lose them to better-rated competitors.'], steps: ['Encourage more 5-star feedback to close the gap and join the ranks of perfect-rated peers'], cta: 'Boost your ratings' }
  })

  // ---------------- Photos (10) ----------------
  const photos = raw.photos || 0
  const photosItem = item('photos', 'Overall photos', Math.min(photos, 10), 10, {
    note: 'Google shares at most 10 photos, so 10 is the highest we can measure.',
    good: { lines: ['Your gallery is well stocked, which helps engage and reassure customers.'], steps: ['Add fresh photos regularly to keep the gallery current'] },
    bad: { lines: [photos ? 'You have some photos, but not enough to fully engage or reassure customers.' : 'Your profile has no photos, which makes customers hesitate.', 'A more robust gallery can significantly improve clicks and conversions.'], steps: ['Add ' + (10 - photos) + ' additional photos focusing on products, team, and environment'], cta: 'Expand your photo gallery' }
  })

  // ---------------- Competition (20) ----------------
  const sections = []
  sections.push({ id: 'reviews', title: 'Reviews', items: [countItem, velocityItem, consistencyItem] })
  sections.push({ id: 'rating', title: 'Rating', items: [ratingItem] })
  sections.push({ id: 'photos', title: 'Photos', items: [photosItem] })
  if (comps.length >= CONFIG.minCompetitors) {
    const share = (pick, mine) => comps.reduce((a, c) => a + (pick(c) < mine ? 1 : pick(c) === mine ? 0.5 : 0), 0) / comps.length
    const compPts = 12 * share((c) => c.reviews || 0, myReviews) + 8 * share((c) => c.rating || 0, myRating)
    const rank = 1 + comps.filter((c) => (c.reviews || 0) > myReviews).length
    sections.push({ id: 'competition', title: 'Competition score', items: [item('competition', 'Local competition', compPts, 20, {
      note: 'Compared with ' + comps.length + ' similar businesses within about 5 km.',
      good: { lines: ['You are ahead of most nearby competitors (#' + rank + ' of ' + (comps.length + 1) + ' by reviews).', 'Staying on top keeps the traffic coming to you.'], steps: ['Keep collecting reviews and publishing fresh content for local terms'] },
      bad: { lines: ['Rivals still outrank you (#' + rank + ' of ' + (comps.length + 1) + ' by reviews), limiting your position in Google search results.', 'Being below the top results leads to lost traffic.'], steps: ['Collect more reviews and optimize content for local terms'], cta: 'Talk to us to overtake competitors' }
    })] })
  } else {
    notMeasured.push({ title: 'Competition score', why: 'We found too few similar businesses nearby to compare against.' })
  }

  // ---------------- Profile completeness (20) ----------------
  const attrs = raw.attributes || 0
  const attrItem = item('attrs', 'Profile attributes', 6 * clamp(attrs / CONFIG.attributesTarget), 6, {
    good: { lines: ['Your profile lists attributes such as payment options and accessibility, which builds user trust.'], steps: ['Keep your attributes up to date'] },
    bad: { lines: ['Missing key profile details.', 'Attributes like payment options, accessibility, etc. improve completeness and user trust.'], steps: ['Add at least ' + Math.max(1, CONFIG.attributesTarget - attrs) + ' relevant attributes to your profile'], tag: 'At least ' + Math.max(1, CONFIG.attributesTarget - attrs) + ' additional items', cta: 'Complete your Google Business Profile' }
  })
  const webItem = item('website', 'Website', b.website ? 3 : 0, 3, {
    good: { lines: ['Website present.', 'Your website is crucial to ensure you convert traffic from Google to paid clients.'], steps: ['Make your website user-friendly with a clear service list and easy contact options'], cta: 'Build a conversion-optimized website' },
    bad: { lines: ['No website is linked to your profile.', 'Your website is crucial to ensure you convert traffic from Google to paid clients.'], steps: ['Add a website with a clear service list and easy contact options'], cta: 'Build a conversion-optimized website' }
  })
  const phoneItem = item('phone', 'Phone number', b.phone ? 2 : 0, 2, {
    good: { lines: ['Customers can call you straight from Google.'], steps: ['Keep the number current'] },
    bad: { lines: ['No phone number is listed, so interested clients can’t call you from Google.'], steps: ['Add a phone number that your team answers'], cta: 'Complete your Google Business Profile' }
  })
  const compHours = median(comps.map((c) => c.hours || 0).filter(Boolean))
  const hoursTarget = compHours || CONFIG.fallbackHoursPerWeek
  const hoursPts = (raw.has_hours ? 3 : 0) + (raw.has_hours ? 2 * clamp((raw.hours_per_week || 0) / hoursTarget) : 0)
  const hoursItem = item('hours', 'Working hours', hoursPts, 5, {
    note: compHours ? 'You are open ' + (raw.hours_per_week || 0) + ' hours a week. Nearby competitors median: ' + compHours + '.' : 'You are open ' + (raw.hours_per_week || 0) + ' hours a week.',
    good: { lines: ['Potential clients know when they can visit you.', 'Longer working hours than competitors can improve your Google visibility and attract more clients.'], steps: ['Keep your hours current, including holidays'] },
    bad: { lines: [raw.has_hours ? 'Your opening hours are shorter than nearby competitors’.' : 'No opening hours are listed on your profile.', 'Longer working hours than competitors can improve your Google visibility and attract more clients.'], steps: ['Match or exceed your top competitors’ hours to avoid losing potential clients'], cta: 'Find the best working hours for your business' }
  })
  const words = ((b.category || '') + ' ' + (b.primary_type || '').replace(/_/g, ' ')).toLowerCase().split(/\s+/).filter((w) => w.length >= 4)
  const hay = ((b.name || '') + ' ' + (b.summary || '')).toLowerCase()
  const hasKw = words.some((w) => hay.includes(w.replace(/s$/, '')))
  const kwItem = item('keywords', 'Keyword presence', hasKw ? 4 : 0, 4, {
    note: 'Based on your business name and Google’s category.',
    good: { lines: ['Your profile carries relevant keywords.', 'Relevant keywords help Google identify your business for important search terms.'], steps: ['Keep your services and location in your description'] },
    bad: { lines: ['Profile is not keyword-rich.', 'Relevant keywords help Google identify your business for important search terms.'], steps: ['Add your main services and location to your description and service list (don’t stuff the business name, as Google may suspend profiles for it)'], cta: 'Improve your profile keywords' }
  })
  sections.push({ id: 'completeness', title: 'Profile completeness', items: [attrItem, webItem, phoneItem, hoursItem, kwItem] })

  // ---------------- Totals ----------------
  sections.forEach((s) => { s.score = s.items.reduce((a, i) => a + i.score, 0); s.max = s.items.reduce((a, i) => a + i.max, 0) })
  const got = sections.reduce((a, s) => a + s.score, 0)
  const outOf = sections.reduce((a, s) => a + s.max, 0)
  const all = sections.flatMap((s) => s.items)
  return {
    business: b, sections, notMeasured,
    total: Math.round((got / outOf) * 100), measuredPoints: got, measurableMax: outOf,
    critical: all.filter((i) => i.sev === 'critical').length,
    improve: all.filter((i) => i.sev === 'improve').length
  }
}
