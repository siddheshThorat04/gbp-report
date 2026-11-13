// Live by default. Set VITE_USE_MOCK=true to work on the UI with sample data and no backend.
// Public Frappe API scripts (the Vercel rewrite in vercel.json forwards /api to app.mmore.works):
//   audit_search_places {q}        -> [{place_id, name, address}]   (shared with the audit app)
//   gbp_health_report   {place_id} -> raw Places data, see src/sample.js for the shape
import { SAMPLE_RAW, SAMPLE_PLACES } from './sample.js'
const MOCK = import.meta.env.VITE_USE_MOCK === 'true'
const wait = (ms) => new Promise((r) => setTimeout(r, ms))

async function call(method, body) {
  let r
  try {
    r = await fetch('/api/method/' + method, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) })
  } catch (e) {
    throw new Error('Could not reach the server. Check your connection and try again.')
  }
  if (!r.ok) {
    // Frappe puts the readable reason in _server_messages (a JSON string of JSON strings)
    try {
      const j = await r.json()
      const msgs = JSON.parse(j._server_messages || '[]').map((m) => JSON.parse(m).message)
      if (msgs.length) throw new Error(msgs.join(' ').replace(/<[^>]+>/g, ''))
    } catch (e) { if (e.message && !/JSON|Unexpected/.test(e.message)) throw e }
    if (r.status === 429) throw new Error('Too many checks from this connection. Please try again in a little while.')
    throw new Error('Something went wrong. Please try again.')
  }
  return (await r.json()).message
}

export async function searchPlaces(q) {
  if (MOCK) { await wait(500); return SAMPLE_PLACES }
  return call('audit_search_places', { q })
}
export async function getReport(placeId) {
  if (MOCK) { await wait(900); return SAMPLE_RAW }
  return call('gbp_health_report', { place_id: placeId })
}
