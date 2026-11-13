import React, { useEffect, useRef, useState } from 'react'
import { searchPlaces, getReport } from './api.js'
import { scoreReport } from './score.js'
import { loadMaps, mapsAvailable } from './maps.js'

const WHATSAPP = '918310719532'
const waHref = (text) => 'https://wa.me/' + WHATSAPP + '?text=' + encodeURIComponent(text)
const plural = (n, w) => n + ' ' + w + (n === 1 ? '' : 's')
const tone = (s, m) => (s / m >= 0.9 ? 'var(--grn)' : s / m >= 0.5 ? 'var(--amb)' : 'var(--red)')
const ICON = {
  good: <path d="M5 12.5l4.5 4.5L19 7.5" />,
  improve: <><path d="M12 3.5l9 16H3z" /><path d="M12 10v4.5M12 17.4v.1" /></>,
  critical: <><circle cx="12" cy="12" r="9" /><path d="M12 7.5v5.5M12 16.4v.1" /></>
}
const Svg = ({ children, size = 18, sw = 2.2 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{children}</svg>
)

function Header() {
  return (
    <header>
      <a className="logo" href="/">mmore<b>.</b>works</a>
      <a className="btn-dark" href={waHref('Hi, I’d like help with my Google Business Profile.')} target="_blank" rel="noopener noreferrer">Talk to our team</a>
    </header>
  )
}

// Google's search-as-you-type box (Places Autocomplete), the same widget the audit app uses.
function PlaceSearch({ onPick, onFail }) {
  const host = useRef(null)
  const [ready, setReady] = useState(false)
  useEffect(() => {
    let dead = false
    let el = null
    loadMaps()
      .then(async (g) => {
        const { PlaceAutocompleteElement } = await g.maps.importLibrary('places')
        if (dead || !host.current) return
        el = new PlaceAutocompleteElement()
        el.style.width = '100%'
        el.style.colorScheme = 'light'
        host.current.replaceChildren(el)
        const onSelect = async (event) => {
          const pred = event.placePrediction
          try {
            if (pred) {
              // fetching just the id ends Google's billing session (id-only is free)
              try { await pred.toPlace().fetchFields({ fields: ['id'] }) } catch (e) { /* not needed */ }
              onPick({ place_id: pred.placeId, name: pred.mainText ? pred.mainText.text : '', address: pred.secondaryText ? pred.secondaryText.text : '' })
            } else if (event.place) {
              await event.place.fetchFields({ fields: ['displayName', 'formattedAddress'] })
              onPick({ place_id: event.place.id, name: event.place.displayName, address: event.place.formattedAddress })
            }
          } catch (e) { onFail() }
        }
        el.addEventListener('gmp-select', onSelect)
        el.addEventListener('gmp-placeselect', onSelect)
        setReady(true)
      })
      .catch(() => { if (!dead) onFail() })
    return () => { dead = true; if (el) el.remove() }
  }, [])
  return <div className="combo">{!ready && <span className="miss">Loading search…</span>}<div ref={host} /></div>
}

function Landing({ onPick, error }) {
  const [mode, setMode] = useState(mapsAvailable() ? 'widget' : 'manual')
  const [q, setQ] = useState('')
  const [busy, setBusy] = useState(false)
  const [results, setResults] = useState(null)
  const [err, setErr] = useState('')
  useEffect(() => { if (error) setErr(error) }, [error])
  const submit = async (e) => {
    e.preventDefault()
    if (q.trim().length < 3) { setErr('Please enter your business name and city, for example Sharma Dental Andheri.'); return }
    setBusy(true); setErr(''); setResults(null)
    try {
      const r = await searchPlaces(q.trim())
      if (!r.length) setErr('We couldn’t find that business. Try adding the city or area.')
      else setResults(r)
    } catch (e2) { setErr(e2.message) }
    setBusy(false)
  }
  return (
    <main className="land">
      <h1>Business Profile Health</h1>
      <p className="lead">Let’s help you find <b>simple actions</b> for your Google Business Profile that help more nearby clients discover your business.</p>
      <div className="card search">
        {mode === 'widget' ? (
          <>
            <label>Business name</label>
            <PlaceSearch onPick={onPick} onFail={() => setMode('manual')} />
          </>
        ) : (
          <form onSubmit={submit}>
            <label htmlFor="q">Business name</label>
            <div className="srow">
              <input id="q" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Business name and city, e.g. Skin Glow KC Kansas City" autoComplete="off" />
              <button className="btn-dark" disabled={busy}>{busy ? 'Searching…' : 'Analyze'}</button>
            </div>
            {results && (
              <ul className="picks">
                {results.map((p) => (
                  <li key={p.place_id}><button type="button" onClick={() => onPick(p)}><b>{p.name}</b><span>{p.address}</span></button></li>
                ))}
              </ul>
            )}
          </form>
        )}
        {err && <p className="err" role="alert">{err}</p>}
        {mapsAvailable() && (
          <button type="button" className="linklike" onClick={() => { setErr(''); setMode(mode === 'widget' ? 'manual' : 'widget') }}>
            {mode === 'widget' ? 'Can’t find it? Search by name instead' : 'Back to suggestions as you type'}
          </button>
        )}
      </div>
      <p className="fine">Free. Uses only public Google data. No login needed.</p>
    </main>
  )
}

function Gauge({ score }) {
  const [shown, setShown] = useState(0)
  useEffect(() => { const t = setTimeout(() => setShown(score), 80); return () => clearTimeout(t) }, [score])
  // 240 degree arc drawn as one path so the fill can be animated with pathLength
  const r = 80, pt = (a) => [100 + r * Math.cos((a * Math.PI) / 180), 100 + r * Math.sin((a * Math.PI) / 180)]
  const [x1, y1] = pt(150), [x2, y2] = pt(390)
  const d = `M${x1.toFixed(2)} ${y1.toFixed(2)} A${r} ${r} 0 1 1 ${x2.toFixed(2)} ${y2.toFixed(2)}`
  return (
    <div className="gauge">
      <svg viewBox="0 0 200 170" role="img" aria-label={`Score ${score} out of 100`}>
        <defs><linearGradient id="g" x1="0" y1="1" x2="1" y2="0"><stop offset="0" stopColor="#ee4b55" /><stop offset=".55" stopColor="#a86bb5" /><stop offset="1" stopColor="#3f8fe0" /></linearGradient></defs>
        <path className="arc" d={d} stroke="var(--track)" pathLength="100" />
        <path className="arc prog" d={d} stroke="url(#g)" pathLength="100" strokeDasharray={`${shown} 100`} />
      </svg>
      <div className="num"><strong>{score}</strong><span>of 100<br />optimisation points</span></div>
    </div>
  )
}

function Section({ s, open, onToggle, bizName }) {
  const c = s.items.filter((i) => i.sev === 'critical').length
  const m = s.items.filter((i) => i.sev === 'improve').length
  const col = tone(s.score, s.max)
  return (
    <article className={'card sec' + (open ? ' open' : '')} id={'sec-' + s.id}>
      <button className="sec-h" type="button" aria-expanded={open} aria-controls={'b-' + s.id} onClick={onToggle}>
        <span className="ring">
          <svg viewBox="0 0 60 60"><circle cx="30" cy="30" r="26" stroke="var(--track)" /><circle cx="30" cy="30" r="26" stroke={col} pathLength="100" strokeDasharray={`${(s.score / s.max) * 100} 100`} strokeLinecap="round" /></svg>
          <i>{s.score}/{s.max}</i>
        </span>
        <span className="sec-t">{s.title}</span>
        <span className="badges">
          {c > 0 && <span className="badge c">{plural(c, 'critical issue')}</span>}
          {m > 0 && <span className="badge i">{plural(m, 'improvement')}</span>}
        </span>
        <svg className="chev" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9l6 6 6-6" /></svg>
      </button>
      <div className="sec-b" id={'b-' + s.id}><div><div className="items">
        {s.items.map((it) => (
          <div className="item" key={it.id}>
            <div className={'mark ' + it.sev}><Svg>{ICON[it.sev]}</Svg></div>
            <div>
              <h4>{it.title}{it.tag && <span className="tag">{it.tag}</span>}</h4>
              {it.lines.map((l, i) => <p key={i}>{l}</p>)}
              {it.note && <p className="note">{it.note}</p>}
              <div className="steps"><b>Next steps</b><ul>{it.steps.map((x, i) => <li key={i}>{x}</li>)}</ul></div>
              <div className="act">
                {it.cta && <a className="cta" href={waHref(`Hi, I checked the Google profile health of ${bizName}. I’d like help with: ${it.cta}`)} target="_blank" rel="noopener noreferrer">{it.cta}</a>}
                {it.pts > 0 && <span className="pts">+{it.pts} points possible</span>}
              </div>
            </div>
          </div>
        ))}
      </div></div></div>
    </article>
  )
}

function Report({ r, onReset }) {
  const b = r.business
  const firstIssue = r.sections.findIndex((s) => s.items.some((i) => i.sev === 'critical'))
  const [open, setOpen] = useState(() => new Set([r.sections[Math.max(0, firstIssue)].id]))
  const toggle = (id) => setOpen((o) => { const n = new Set(o); n.has(id) ? n.delete(id) : n.add(id); return n })
  const toHundred = () => {
    const ids = r.sections.filter((s) => s.score < s.max)
    setOpen(new Set([...open, ...ids.map((s) => s.id)]))
    if (ids.length) setTimeout(() => document.getElementById('sec-' + ids[0].id)?.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion:reduce)').matches ? 'auto' : 'smooth', block: 'start' }), 60)
  }
  return (
    <main className="rep">
      <h1>Business Profile Health</h1>
      <p className="sub">Grow your local presence with a strong Google Business Profile.</p>
      <div className="grid">
        <aside className="stack">
          <section className="card biz">
            <div>
              <h2>{b.name}</h2>
              <div className="meta">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="#f5b301" aria-hidden="true"><path d="M12 2.5l2.9 6 6.6.9-4.8 4.6 1.2 6.5L12 17.4 6.1 20.5l1.2-6.5L2.5 9.4l6.6-.9z" /></svg>
                <b>{b.rating ?? '–'}</b><span>({b.reviews} reviews)</span>
              </div>
            </div>
            <button className="icon-btn" type="button" onClick={onReset} aria-label="Check a different business" title="Check a different business">
              <Svg size={16} sw={2}><path d="M4 20l4-1L19 8l-3-3L5 16z" /></Svg>
            </button>
          </section>
          <section className="card">
            <h3>Your GBP score</h3>
            <Gauge score={r.total} />
            <div className="stat crit"><div className="dot"><Svg size={20} sw={2}>{ICON.critical}</Svg></div><div><strong>{r.critical}</strong><span>Critical issues</span></div></div>
            <div className="stat imp"><div className="dot"><Svg size={20} sw={2}>{ICON.improve}</Svg></div><div><strong>{r.improve}</strong><span>Improvement opportunities</span></div></div>
            <button className="btn-pink" type="button" onClick={toHundred}>Take this score to 100</button>
          </section>
          <section className="card promo">
            <p>Want these issues fixed for you? We can handle your reviews, photos and profile updates.</p>
            <a className="btn-dark" href={waHref(`Hi, I checked the Google profile health of ${b.name} (score ${r.total}/100). I’d like help improving it.`)} target="_blank" rel="noopener noreferrer">Talk to our team</a>
          </section>
        </aside>
        <section>
          <h2 className="bd-head">GBP score breakdown</h2>
          {r.sections.map((s) => <Section key={s.id} s={s} open={open.has(s.id)} onToggle={() => toggle(s.id)} bizName={b.name} />)}
          <section className="card skipped">
            <h3>Not scored</h3>
            <p>These need owner access to the profile, or enough nearby data, so they are left out and the score is scaled to 100.</p>
            <ul>{r.notMeasured.map((n) => <li key={n.title}><b>{n.title}</b><span>{n.why}</span></li>)}</ul>
          </section>
        </section>
      </div>
    </main>
  )
}

export default function App() {
  const [stage, setStage] = useState('search')
  const [report, setReport] = useState(null)
  const [error, setError] = useState('')
  const [name, setName] = useState('')
  const top = useRef(null)
  const pick = async (p) => {
    setName(p.name); setStage('loading'); setError('')
    try { setReport(scoreReport(await getReport(p.place_id))); setStage('report') }
    catch (e) { setError(e.message); setStage('search') }
    window.scrollTo(0, 0)
  }
  return (
    <div ref={top}>
      <Header />
      {stage === 'search' && <Landing onPick={pick} error={error} />}
      {stage === 'loading' && <main className="land"><div className="card load"><div className="spin" /><p>Checking <b>{name}</b> on Google…</p></div></main>}
      {stage === 'report' && report && <Report r={report} onReset={() => { setReport(null); setStage('search') }} />}
    </div>
  )
}
