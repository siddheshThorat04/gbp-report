// Quick checks for the scoring rules: run with `npm test`
import assert from 'node:assert'
import { scoreReport } from '../src/score.js'
import { SAMPLE_RAW } from '../src/sample.js'

const r = scoreReport(SAMPLE_RAW)
console.log('Total', r.total, '| critical', r.critical, '| improve', r.improve)
r.sections.forEach((s) => console.log(' ', s.title.padEnd(22), s.score + '/' + s.max, s.items.map((i) => i.id + ':' + i.sev + ':' + i.score + '/' + i.max).join('  ')))
assert(r.total >= 0 && r.total <= 100, 'total in range')
assert.equal(r.measurableMax, 90, 'measurable points with competitors')

const perfect = scoreReport({ business: { name: 'Dental Clinic', category: 'Dental clinic', primary_type: 'dental_clinic', rating: 5, reviews: 500, website: 'x', phone: 'y' },
  reviews: [1, 2, 3, 4, 5].map((d) => ({ time: new Date(Date.now() - d * 86400000 * 2).toISOString() })), photos: 10, attributes: 6, has_hours: true, hours_per_week: 70,
  competitors: [1, 2, 3].map(() => ({ rating: 4.2, reviews: 40, hours: 45 })) })
assert.equal(perfect.total, 100, 'a perfect profile scores 100')
assert.equal(perfect.critical + perfect.improve, 0, 'no issues for a perfect profile')

const empty = scoreReport({ business: { name: 'x' }, reviews: [], photos: 0, attributes: 0, has_hours: false, competitors: [] })
assert(empty.total <= 5, 'an empty profile scores near 0')
assert.equal(empty.measurableMax, 70, 'competition not scored without competitors')
console.log('All checks passed')
