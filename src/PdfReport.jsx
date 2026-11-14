// // // The PDF version of the report (browser print). Hidden on screen, shown by the print styles in pdf.css.
// // // Pages: 1 cover (business name + address), 2 summary, 3 scorecard, 4 profile health check, 5 30-day plan.
// // // Everything is built from the scored report `r` (see score.js), so each business gets its own PDF.
// // import React from 'react'
// // import './pdf.css'
// // import { CONFIG } from './score.js'

// // const WHATSAPP = '918310719532'
// // const waHref = (text) => 'https://wa.me/' + WHATSAPP + '?text=' + encodeURIComponent(text)

// // const TITLE = { reviews: 'Reviews', rating: 'Rating', photos: 'Photos', competition: 'Local competition', completeness: 'Profile completeness' }
// // const SHORT = { reviews: 'reviews', rating: 'rating', photos: 'photos', competition: 'local competition', completeness: 'profile details' }
// // const list = (a) => (a.length < 2 ? a.join('') : a.slice(0, -1).join(', ') + ' & ' + a[a.length - 1])
// // const listAnd = (a) => (a.length < 2 ? a.join('') : a.slice(0, -1).join(', ') + ' and ' + a[a.length - 1])
// // const ratio = (s) => (s.max ? s.score / s.max : 1)
// // const initials = (name) => String(name || '?').split(/\s+/).filter(Boolean).slice(0, 2).map((w) => w[0]).join('').toUpperCase()
// // const status = (s) => (s.items.some((i) => i.sev === 'critical') ? 'priority' : s.items.some((i) => i.sev === 'improve') ? 'improve' : 'good')
// // const CHIP = { priority: 'Priority', improve: 'Improve', good: 'Keep up' }

// // // ---------- cover illustration (a stylised Google Business Profile card) ----------
// // function Star({ x, y }) {
// //   return <path transform={`translate(${x} ${y})`} fill="#f59e0b" d="M8 0l2.4 5 5.5.7-4 3.8 1 5.4L8 12.2 3.1 14.9l1-5.4-4-3.8L5.6 5z" />
// // }
// // function CoverArt() {
// //   return (
// //     <svg className="g-art" viewBox="0 0 380 270" aria-hidden="true">
// //       <defs><filter id="sh" x="-20%" y="-20%" width="140%" height="140%"><feDropShadow dx="0" dy="6" stdDeviation="8" floodColor="#0b2a6b" floodOpacity=".28" /></filter></defs>
// //       <rect x="0" y="0" width="300" height="270" rx="22" fill="#fff" />
// //       <rect x="24" y="26" width="140" height="11" rx="5.5" fill="#e3e6ea" />
// //       {[0, 1, 2, 3, 4].map((i) => <Star key={i} x={24 + i * 19} y={52} />)}
// //       <rect x="24" y="82" width="92" height="8" rx="4" fill="#e3e6ea" />
// //       <rect x="208" y="22" width="72" height="72" rx="10" fill="#cfe0f7" />
// //       <rect x="220" y="62" width="48" height="20" rx="3" fill="#aac7ef" />
// //       <rect x="24" y="112" width="52" height="7" rx="3.5" fill="#4285f4" />
// //       <rect x="92" y="112" width="48" height="7" rx="3.5" fill="#e3e6ea" />
// //       <rect x="156" y="112" width="48" height="7" rx="3.5" fill="#e3e6ea" />
// //       <rect x="220" y="112" width="48" height="7" rx="3.5" fill="#e3e6ea" />
// //       <rect x="0" y="128" width="300" height="1.5" fill="#e8ecf2" />
// //       {[44, 100, 156, 212].map((cx) => <circle key={cx} cx={cx} cy="160" r="18" fill="none" stroke="#4285f4" strokeWidth="1.6" />)}
// //       <path d="M38 160h12M44 154v12" stroke="#4285f4" strokeWidth="2" strokeLinecap="round" />
// //       <path d="M94 166l6-12 6 12z" fill="none" stroke="#4285f4" strokeWidth="1.8" strokeLinejoin="round" />
// //       <rect x="150" y="153" width="12" height="14" rx="2" fill="none" stroke="#4285f4" strokeWidth="1.8" />
// //       <circle cx="212" cy="160" r="7" fill="none" stroke="#4285f4" strokeWidth="1.8" />
// //       <rect x="0" y="190" width="300" height="1.5" fill="#e8ecf2" />
// //       <rect x="62" y="206" width="150" height="8" rx="4" fill="#e3e6ea" />
// //       <rect x="62" y="224" width="110" height="8" rx="4" fill="#e3e6ea" />
// //       <circle cx="30" cy="215" r="7" fill="none" stroke="#4285f4" strokeWidth="1.8" />
// //       <rect x="0" y="246" width="300" height="1.5" fill="#e8ecf2" />
// //       <g filter="url(#sh)">
// //         <circle cx="292" cy="170" r="68" fill="#fff" />
// //         <path d="M252 150l8-22h64l8 22z" fill="#4a6fd6" />
// //         <path d="M252 150h16v10a8 8 0 0 1-16 0zM268 150h16v10a8 8 0 0 1-16 0zM284 150h16v10a8 8 0 0 1-16 0zM300 150h16v10a8 8 0 0 1-16 0zM316 150h16v10a8 8 0 0 1-16 0z" fill="#7da2f4" />
// //         <path d="M260 164h64v34a4 4 0 0 1-4 4h-56a4 4 0 0 1-4-4z" fill="#4285f4" />
// //         <circle cx="304" cy="186" r="11" fill="#fff" />
// //         <text x="304" y="191" textAnchor="middle" fontFamily="Arial, sans-serif" fontWeight="700" fontSize="14" fill="#4285f4">G</text>
// //       </g>
// //     </svg>
// //   )
// // }

// // // ---------- score ring ----------
// // function Ring({ score }) {
// //   return (
// //     <svg className="p-ring" viewBox="0 0 200 200" role="img" aria-label={`Score ${score} out of 100`}>
// //       <circle cx="100" cy="100" r="80" fill="none" stroke="#e8edf2" strokeWidth="17" />
// //       <circle cx="100" cy="100" r="80" fill="none" stroke={score < 40 ? '#c9494f' : '#0e9488'} strokeWidth="17" strokeLinecap="round" pathLength="100" strokeDasharray={`${score} 100`} transform="rotate(-90 100 100)" />
// //     </svg>
// //   )
// // }

// // // ---------- the profile health check rows ----------
// // function healthRows(r, CFG) {
// //   const b = r.business, f = r.facts
// //   const present = ['Present', 'ok']
// //   const rows = {
// //     info: [
// //       { name: 'Business name', hint: 'Consistent with your brand', st: b.name ? present : ['Missing', 'bad'] },
// //       { name: 'Primary category', hint: 'Confirm the most specific eligible category', st: b.category ? [b.category, 'ok'] : ['Missing', 'bad'] },
// //       { name: 'Phone number', hint: 'Test the number during business hours', st: b.phone ? present : ['Missing', 'bad'] },
// //       { name: 'Website', hint: 'Check mobile speed and service relevance', st: b.website ? present : ['Missing', 'bad'] },
// //       { name: 'Address / service area', hint: 'Confirm pin and entrance are correct', st: b.address ? present : ['Missing', 'bad'] },
// //       { name: 'Opening hours', hint: 'Check weekends and special hours', st: !f.hasHours ? ['Missing', 'bad'] : f.compHours && f.hoursPerWeek < f.compHours ? ['Review', 'warn'] : present },
// //       { name: 'Business description', hint: 'Explain services and differentiators', st: ['Verify', 'na'] }
// //     ],
// //     content: [
// //       { name: 'Appointment link', hint: 'Add an obvious booking or enquiry route', st: ['Verify', 'na'] },
// //       { name: 'Services / products', hint: 'List priority services with clear names', st: ['Verify', 'na'] },
// //       { name: 'Recent photos', hint: 'Add authentic team, product and premises images', st: f.photos >= 10 ? present : f.photos > 0 ? ['Needs refresh', 'warn'] : ['Missing', 'bad'] },
// //       { name: 'Posts / updates', hint: 'Publish useful updates consistently', st: ['Verify', 'na'] },
// //       { name: 'Review responses', hint: 'Respond promptly and professionally', st: ['Verify', 'na'] },
// //       { name: 'Attributes / amenities', hint: 'Complete only relevant, accurate attributes', st: f.attributes >= CFG.attributesTarget ? present : f.attributes > 0 ? ['Incomplete', 'warn'] : ['Missing', 'bad'] },
// //       { name: 'Messaging / call path', hint: 'Test the full journey on a mobile device', st: ['Verify', 'na'] }
// //     ]
// //   }
// //   const checked = [...rows.info, ...rows.content].filter((x) => x.st[1] !== 'na')
// //   const pct = Math.round((checked.reduce((a, x) => a + (x.st[1] === 'ok' ? 1 : x.st[1] === 'warn' ? 0.5 : 0), 0) / Math.max(1, checked.length)) * 100)
// //   return { rows, pct, checked: checked.length, verify: 14 - checked.length }
// // }

// // // ---------- the 30-day plan, written from what this profile is actually missing ----------
// // function planWeeks(r) {
// //   const all = r.sections.flatMap((s) => s.items)
// //   const it = (id) => all.find((i) => i.id === id)
// //   const bad = (id) => it(id) && it(id).sev !== 'good'
// //   const f = r.facts
// //   const w1 = []
// //   if (bad('attrs')) w1.push('Add at least ' + Math.max(1, CONFIG.attributesTarget - f.attributes) + ' relevant profile attributes.')
// //   if (bad('website')) w1.push('Link your website, with a clear service list and easy contact options.')
// //   if (bad('phone')) w1.push('Add a phone number your team answers.')
// //   if (bad('hours')) w1.push('Review business hours against nearby competitors.')
// //   if (bad('keywords')) w1.push('Add your main services and location to the description.')
// //   if (!w1.length) w1.push('Keep your details current, including holiday and special hours, and make the website’s contact options easy to find.')
// //   const reviewsOk = !bad('r-velocity') && !bad('r-consistency') && !bad('r-count')
// //   const photosLeft = Math.max(0, 10 - f.photos)
// //   return [
// //     { wk: 'Week 1', title: 'Complete the foundations', tag: 'Profile basics', text: w1.join(' ') },
// //     { wk: 'Week 2', title: 'Build a steady review habit', tag: 'Review momentum', text: reviewsOk ? 'Keep your review routine running: invite every customer to leave an honest review and stay at 2+ new reviews a week.' : 'Set up a simple, repeatable process to invite every customer to leave an honest review. Work towards 2+ new reviews per week.' },
// //     { wk: 'Week 3', title: 'Strengthen visual proof', tag: 'Photos + posts', text: (photosLeft ? 'Add ' + photosLeft + ' genuine photos that show the premises, team, services and environment. ' : 'Refresh the gallery with new photos of recent work and your team. ') + 'Start a regular posting routine (posts are not visible in public data, so check yours in the profile).' },
// //     { wk: 'Week 4', title: 'Improve local relevance', tag: 'Local visibility', text: 'Review service descriptions and location language for clarity. Compare visibility for priority searches and identify which local competitors appear ahead.' }
// //   ]
// // }

// // export default function PdfReport({ r }) {
// //   const b = r.business
// //   const date = new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })
// //   const weak = r.sections.filter((s) => s.max - s.score >= 1).sort((a, c) => c.max - c.score - (a.max - a.score))
// //   const strong = r.sections.filter((s) => ratio(s) >= 0.8)
// //   const goodItems = r.sections.flatMap((s) => s.items).filter((i) => i.sev === 'good').map((i) => i.title)
// //   const potential = Math.max(0, 100 - r.total)
// //   const health = healthRows(r, CONFIG)
// //   const plan = planWeeks(r)

// //   const headline = r.total >= 85 ? 'A strong profile, ready to scale.' : r.total >= 60 ? 'A profile with room to grow.' : 'A profile that needs attention.'
// //   const weakNames = weak.slice(0, 3).map((s) => SHORT[s.id])
// //   const takeaway =
// //     r.total >= 85 ? (weak.length ? 'Your profile is in strong shape. The remaining gains are in ' + listAnd(weakNames) + '.' : 'Your profile is in excellent shape. Keep your reviews, photos and details fresh to stay ahead.')
// //     : r.total >= 60 ? (strong.length ? 'Your ' + listAnd(strong.map((s) => SHORT[s.id])) + (strong.length > 1 ? ' are already strengths. ' : ' is already a strength. ') : '') + 'The biggest opportunity is to improve ' + listAnd(weakNames) + '.'
// //     : 'Your profile is missing several things customers and Google look for. Start with ' + listAnd(weak.slice(0, 2).map((s) => SHORT[s.id])) + ', which hold the most points.'

// //   const pointsNote = r.sections.filter((s) => s.max - s.score > 0).map((s) => TITLE[s.id] + ' +' + (s.max - s.score)).join('; ')

// //   return (
// //     <div className="pdf" aria-hidden="true">
// //       {/* ---------------- 1. Cover ---------------- */}
// //       <section className="pg pg-cover">
// //         <div className="p-head">
// //           <div className="p-logo"><span className="p-wm">mmore<b>.</b>works</span><span className="p-sub">Google Business Profile audit</span></div>
// //           <div className="p-meta">Prepared {date}</div>
// //         </div>
// //         <div className="g-cover">
// //           <div className="g-banner">
// //             <h1>Google Business<br />Profile Audit</h1>
// //             <CoverArt />
// //           </div>
// //           <div className="g-lower">
// //             <p className="g-sub">A practical snapshot of how customers may experience your business on Google, and the improvements worth prioritising next.</p>
// //             <div className="g-card">
// //               <label>Prepared for</label>
// //               <strong>{b.name}</strong>
// //               {b.address && (
// //                 <div className="g-loc">
// //                   <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="#4285f4" d="M12 2a7 7 0 0 0-7 7c0 5.2 7 13 7 13s7-7.8 7-13a7 7 0 0 0-7-7zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5z" /></svg>
// //                   <span>{b.address}</span>
// //                 </div>
// //               )}
// //             </div>
// //           </div>
// //         </div>
// //       </section>

// //       {/* ---------------- 2. Summary ---------------- */}
// //       <section className="pg">
// //         <h1 className="p-h1">{headline}</h1>
// //         <p className="p-lead">A practical snapshot of how customers may experience your business on Google, and the improvements worth prioritising next.</p>
// //         <div className="p-card p-biz">
// //           <div className="p-avatar">{initials(b.name)}</div>
// //           <div className="p-biz-t"><div className="p-biz-name">{b.name}</div><div className="p-muted">Google Business Profile</div></div>
// //           <div className="p-biz-r">
// //             {b.rating != null && <span className="p-pill">{b.rating} / 5 star rating</span>}
// //             <b>{b.reviews ?? 0} reviews</b>
// //           </div>
// //         </div>
// //         <div className="p-two">
// //           <div className="p-card p-score">
// //             <div className="p-eyebrow gray">Profile optimisation score</div>
// //             <div className="p-ringwrap">
// //               <Ring score={r.total} />
// //               <div className="p-ringnum"><strong>{r.total}</strong><span>OUT OF 100</span></div>
// //             </div>
// //             <div className="p-chips">
// //               <span className="p-chip red">{r.critical} critical {r.critical === 1 ? 'issue' : 'issues'}</span>
// //               <span className="p-chip amber">{r.improve} improvement {r.improve === 1 ? 'area' : 'areas'}</span>
// //             </div>
// //           </div>
// //           <div className="p-card p-take">
// //             <div className="p-eyebrow">The owner takeaway</div>
// //             <p className="p-take-main">{takeaway}</p>
// //             <hr />
// //             <div className="p-eyebrow">What is working</div>
// //             {b.rating != null && <p className="p-take-line">{b.rating}-star rating &nbsp;|&nbsp; {b.reviews ?? 0} reviews</p>}
// //             {goodItems.length > 0 && <p className="p-take-line">{goodItems.slice(0, 3).join('  |  ')}</p>}
// //             {b.rating == null && !goodItems.length && <p className="p-take-line">Not much yet. Start with the foundations on the next pages.</p>}
// //             <hr />
// //             <div className="p-focus">Focus next: {list(weak.slice(0, 4).map((s) => SHORT[s.id])) || 'keeping everything up to date'}</div>
// //           </div>
// //         </div>
// //         <div className="p-dark">
// //           <div className="p-eyebrow mint">A quantified improvement opportunity</div>
// //           <div className="p-dark-row">
// //             <div className="p-big">+{potential}<span> potential points</span></div>
// //             <p>The points still available across reviews, rating, photos, local competition and profile details, based on public Google data.</p>
// //           </div>
// //           <small>Directional estimate from the audit tool, not a guaranteed score increase or ranking result.</small>
// //         </div>
// //         <div className="p-chip teal wide">Recommended approach</div>
// //         <p className="p-body">Fix the profile foundations first, then build a consistent review and content routine. Measure calls, website visits and direction requests to understand whether visibility improvements translate into enquiries.</p>
// //       </section>

// //       {/* ---------------- 3. Scorecard ---------------- */}
// //       <section className="pg">
// //         <div className="p-eyebrow">01 / The scorecard</div>
// //         <h1 className="p-h1">Where your score comes from</h1>
// //         <p className="p-lead">Each category shows the points earned out of the points we can measure from public Google data. The total is scaled to 100, so your score is {r.total} out of 100.</p>
// //         <div className="p-cards">
// //           {r.sections.map((s) => {
// //             const st = status(s)
// //             const worst = [...s.items].sort((x, y) => x.score / x.max - y.score / y.max)
// //             const focus = (worst.filter((i) => i.sev !== 'good').length ? worst.filter((i) => i.sev !== 'good') : worst).slice(0, 2)
// //             const lost = s.max - s.score
// //             return (
// //               <div className={'p-card p-cat ' + st} key={s.id}>
// //                 <div className="p-cat-h"><b>{TITLE[s.id]}</b><b>{s.score} / {s.max}</b></div>
// //                 <div className="p-bar"><i style={{ width: Math.round(ratio(s) * 100) + '%' }} /></div>
// //                 <div className="p-cat-m"><span className={'p-chip ' + (st === 'priority' ? 'red' : st === 'improve' ? 'amber' : 'teal')}>{CHIP[st]}</span><em>{lost > 0 ? '+' + lost + ' pts*' : 'Maintain'}</em></div>
// //                 <p className="p-cat-d">{focus.map((i) => i.lines[0]).join(' ')}</p>
// //                 <div className="p-cat-a"><div className="p-eyebrow gray">Recommended action</div>{focus.map((i) => <p key={i.id}>{i.steps[0]}{/[.!?]$/.test(i.steps[0]) ? '' : '.'}</p>)}</div>
// //               </div>
// //             )
// //           })}
// //         </div>
// //         <p className="p-foot">*Points shown are the points still available in each category: {pointsNote || 'none'}. The +{potential} total is a simple sum of those estimates, not a forecast. {r.notMeasured.map((n) => n.title).join(' and ')} {r.notMeasured.length > 1 ? 'are' : 'is'} not scored because {r.notMeasured.length > 1 ? 'they need' : 'it needs'} owner access to the profile. Actual scoring and search position may differ.</p>
// //       </section>

// //       {/* ---------------- 4. Profile health check ---------------- */}
// //       <section className="pg">
// //         <div className="p-band"><h1>A strong profile starts with the basics</h1><p>Profile fields and a practical completeness review</p></div>
// //         <div className="p-complete">
// //           <div className="p-complete-l"><div className="p-eyebrow">Profile completeness</div><strong>{health.pct}%</strong></div>
// //           <div className="p-bar big"><i style={{ width: health.pct + '%' }} /></div>
// //           <div className="p-complete-r"><div className={'p-eyebrow ' + (health.pct >= 85 ? '' : 'amberT')}>{health.pct >= 85 ? 'Looking good' : 'Needs attention'}</div><p>A few missing or underused fields can make it harder for a prospect to understand the offer and take action.</p></div>
// //         </div>
// //         <div className="p-listhead"><span className="p-eyebrow">Listing health check</span><span className="p-eyebrow gray">Based on public Google data</span></div>
// //         <div className="p-two even">
// //           {[['Business information', health.rows.info], ['Content & actions', health.rows.content]].map(([title, rows]) => (
// //             <div className="p-card p-rows" key={title}>
// //               <h3>{title}</h3>
// //               {rows.map((x) => (
// //                 <div className="p-row" key={x.name}>
// //                   <div className="p-row-t"><b>{x.name}</b><span className={'p-st ' + x.st[1]}>{x.st[0]}</span></div>
// //                   <div className="p-row-h">{x.hint}</div>
// //                 </div>
// //               ))}
// //             </div>
// //           ))}
// //         </div>
// //         <p className="p-foot">{health.checked} of 14 fields can be read from public Google data. The {health.verify} marked <b>Verify</b> cannot be read without owner access, so please check them in the profile.</p>
// //       </section>

// //       {/* ---------------- 5. 30-day plan ---------------- */}
// //       <section className="pg last">
// //         <h1 className="p-h1">A focused 30-day action plan</h1>
// //         <p className="p-lead">A practical sequence to address the audit findings without overwhelming your team.</p>
// //         <div className="p-weeks">
// //           {plan.map((w) => (
// //             <div className="p-card p-week" key={w.wk}>
// //               <div className="p-wk">{w.wk}</div>
// //               <div className="p-week-b"><h3>{w.title}</h3><p>{w.text}</p></div>
// //               <span className="p-tag">{w.tag}</span>
// //             </div>
// //           ))}
// //         </div>
// //         <div className="p-two even">
// //           <div className="p-box mint"><div className="p-eyebrow">Measure what matters</div><p>Record a baseline, then review monthly: calls, website clicks, direction requests, review count and review pace. Also track visibility for agreed local search terms.</p></div>
// //           <div className="p-box"><div className="p-eyebrow dark">What this audit does not show</div><p>This export does not include actual calls, website clicks, direction requests, booked-customer data, keyword-level ranking positions or named competitor comparisons. These should be measured before claiming business impact.</p></div>
// //         </div>
// //         <div className="p-cta">
// //           <div><b>Let’s turn these findings into action.</b><p>Acumensa Tech can help implement the priority fixes and establish a repeatable review, photo and posting workflow.</p></div>
// //           <a href={waHref('Hi, I checked the Google profile health of ' + b.name + ' (score ' + r.total + '/100). I’d like to discuss a 30-day sprint.')}>Discuss a 30-day sprint</a>
// //         </div>
// //       </section>
// //     </div>
// //   )
// // }
// // The PDF version of the report (browser print). Hidden on screen, shown by the print styles in pdf.css.
// // Pages: 1 cover (business name + address), 2 summary, 3 scorecard, 4 profile health check, 5 30-day plan.
// // Everything is built from the scored report `r` (see score.js), so each business gets its own PDF.
// import React from 'react'
// import './pdf.css'
// import { CONFIG } from './score.js'

// const WHATSAPP = '918310719532'
// const waHref = (text) => 'https://wa.me/' + WHATSAPP + '?text=' + encodeURIComponent(text)

// const TITLE = { reviews: 'Reviews', rating: 'Rating', photos: 'Photos', competition: 'Local competition', completeness: 'Profile completeness' }
// const SHORT = { reviews: 'reviews', rating: 'rating', photos: 'photos', competition: 'local competition', completeness: 'profile details' }
// const list = (a) => (a.length < 2 ? a.join('') : a.slice(0, -1).join(', ') + ' & ' + a[a.length - 1])
// const listAnd = (a) => (a.length < 2 ? a.join('') : a.slice(0, -1).join(', ') + ' and ' + a[a.length - 1])
// const ratio = (s) => (s.max ? s.score / s.max : 1)
// const initials = (name) => String(name || '?').split(/\s+/).filter(Boolean).slice(0, 2).map((w) => w[0]).join('').toUpperCase()
// const status = (s) => (s.items.some((i) => i.sev === 'critical') ? 'priority' : s.items.some((i) => i.sev === 'improve') ? 'improve' : 'good')
// const CHIP = { priority: 'Priority', improve: 'Improve', good: 'Keep up' }

// // ---------- cover illustration (a stylised Google Business Profile card) ----------
// function Star({ x, y }) {
//   return <path transform={`translate(${x} ${y})`} fill="#f59e0b" d="M8 0l2.4 5 5.5.7-4 3.8 1 5.4L8 12.2 3.1 14.9l1-5.4-4-3.8L5.6 5z" />
// }
// function CoverArt() {
//   return (
//     <svg className="g-art" viewBox="0 0 380 270" aria-hidden="true">
//       <defs><filter id="sh" x="-20%" y="-20%" width="140%" height="140%"><feDropShadow dx="0" dy="6" stdDeviation="8" floodColor="#0b2a6b" floodOpacity=".28" /></filter></defs>
//       <rect x="0" y="0" width="300" height="270" rx="22" fill="#fff" />
//       <rect x="24" y="26" width="140" height="11" rx="5.5" fill="#e3e6ea" />
//       {[0, 1, 2, 3, 4].map((i) => <Star key={i} x={24 + i * 19} y={52} />)}
//       <rect x="24" y="82" width="92" height="8" rx="4" fill="#e3e6ea" />
//       <rect x="208" y="22" width="72" height="72" rx="10" fill="#cfe0f7" />
//       <rect x="220" y="62" width="48" height="20" rx="3" fill="#aac7ef" />
//       <rect x="24" y="112" width="52" height="7" rx="3.5" fill="#4285f4" />
//       <rect x="92" y="112" width="48" height="7" rx="3.5" fill="#e3e6ea" />
//       <rect x="156" y="112" width="48" height="7" rx="3.5" fill="#e3e6ea" />
//       <rect x="220" y="112" width="48" height="7" rx="3.5" fill="#e3e6ea" />
//       <rect x="0" y="128" width="300" height="1.5" fill="#e8ecf2" />
//       {[44, 100, 156, 212].map((cx) => <circle key={cx} cx={cx} cy="160" r="18" fill="none" stroke="#4285f4" strokeWidth="1.6" />)}
//       {/* Business Profile action icons: Call, Reviews, Posts, Website (Google blue) */}
//       <g fill="none" stroke="#4285f4" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
//         <g transform="translate(35 151) scale(.75)"><path d="M6.6 10.8a15 15 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25 11.4 11.4 0 0 0 3.6.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.57a1 1 0 0 1-.25 1z" /></g>
//         <g transform="translate(91 151) scale(.75)"><path d="M12 3.5l2.6 5.3 5.9.85-4.25 4.15 1 5.85L12 16.9l-5.25 2.75 1-5.85L3.5 9.65l5.9-.85z" /></g>
//         <g transform="translate(147 151) scale(.75)"><path d="M7 3h8l4 4v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1z" /><path d="M15 3v4h4M9 12h6M9 16h6" /></g>
//         <g transform="translate(203 151) scale(.75)"><circle cx="12" cy="12" r="9" /><path d="M3 12h18" /><path d="M12 3c2.5 2.5 3.8 5.5 3.8 9s-1.3 6.5-3.8 9c-2.5-2.5-3.8-5.5-3.8-9S9.5 5.5 12 3z" /></g>
//       </g>
//       <rect x="0" y="190" width="300" height="1.5" fill="#e8ecf2" />
//       <rect x="62" y="206" width="150" height="8" rx="4" fill="#e3e6ea" />
//       <rect x="62" y="224" width="110" height="8" rx="4" fill="#e3e6ea" />
//       <circle cx="30" cy="215" r="7" fill="none" stroke="#4285f4" strokeWidth="1.8" />
//       <rect x="0" y="246" width="300" height="1.5" fill="#e8ecf2" />
//       <g filter="url(#sh)">
//         <circle cx="292" cy="170" r="68" fill="#fff" />
//         <path d="M252 150l8-22h64l8 22z" fill="#4a6fd6" />
//         <path d="M252 150h16v10a8 8 0 0 1-16 0zM268 150h16v10a8 8 0 0 1-16 0zM284 150h16v10a8 8 0 0 1-16 0zM300 150h16v10a8 8 0 0 1-16 0zM316 150h16v10a8 8 0 0 1-16 0z" fill="#7da2f4" />
//         <path d="M260 164h64v34a4 4 0 0 1-4 4h-56a4 4 0 0 1-4-4z" fill="#4285f4" />
//         <circle cx="304" cy="186" r="11" fill="#fff" />
//         <text x="304" y="191" textAnchor="middle" fontFamily="Arial, sans-serif" fontWeight="700" fontSize="14" fill="#4285f4">G</text>
//       </g>
//     </svg>
//   )
// }

// // ---------- score ring ----------
// function Ring({ score }) {
//   return (
//     <svg className="p-ring" viewBox="0 0 200 200" role="img" aria-label={`Score ${score} out of 100`}>
//       <circle cx="100" cy="100" r="80" fill="none" stroke="#ece9e6" strokeWidth="17" />
//       <circle cx="100" cy="100" r="80" fill="none" stroke={score < 40 ? '#e0142a' : '#2e7d32'} strokeWidth="17" strokeLinecap="round" pathLength="100" strokeDasharray={`${score} 100`} transform="rotate(-90 100 100)" />
//     </svg>
//   )
// }

// // ---------- the profile health check rows ----------
// function healthRows(r, CFG) {
//   const b = r.business, f = r.facts
//   const present = ['Present', 'ok']
//   const rows = {
//     info: [
//       { name: 'Business name', hint: 'Consistent with your brand', st: b.name ? present : ['Missing', 'bad'] },
//       { name: 'Primary category', hint: 'Confirm the most specific eligible category', st: b.category ? [b.category, 'ok'] : ['Missing', 'bad'] },
//       { name: 'Phone number', hint: 'Test the number during business hours', st: b.phone ? present : ['Missing', 'bad'] },
//       { name: 'Website', hint: 'Check mobile speed and service relevance', st: b.website ? present : ['Missing', 'bad'] },
//       { name: 'Address / service area', hint: 'Confirm pin and entrance are correct', st: b.address ? present : ['Missing', 'bad'] },
//       { name: 'Opening hours', hint: 'Check weekends and special hours', st: !f.hasHours ? ['Missing', 'bad'] : f.compHours && f.hoursPerWeek < f.compHours ? ['Review', 'warn'] : present },
//       { name: 'Business description', hint: 'Explain services and differentiators', st: ['Verify', 'na'] }
//     ],
//     content: [
//       { name: 'Appointment link', hint: 'Add an obvious booking or enquiry route', st: ['Verify', 'na'] },
//       { name: 'Services / products', hint: 'List priority services with clear names', st: ['Verify', 'na'] },
//       { name: 'Recent photos', hint: 'Add authentic team, product and premises images', st: f.photos >= 10 ? present : f.photos > 0 ? ['Needs refresh', 'warn'] : ['Missing', 'bad'] },
//       { name: 'Posts / updates', hint: 'Publish useful updates consistently', st: ['Verify', 'na'] },
//       { name: 'Review responses', hint: 'Respond promptly and professionally', st: ['Verify', 'na'] },
//       { name: 'Attributes / amenities', hint: 'Complete only relevant, accurate attributes', st: f.attributes >= CFG.attributesTarget ? present : f.attributes > 0 ? ['Incomplete', 'warn'] : ['Missing', 'bad'] },
//       { name: 'Messaging / call path', hint: 'Test the full journey on a mobile device', st: ['Verify', 'na'] }
//     ]
//   }
//   const checked = [...rows.info, ...rows.content].filter((x) => x.st[1] !== 'na')
//   const pct = Math.round((checked.reduce((a, x) => a + (x.st[1] === 'ok' ? 1 : x.st[1] === 'warn' ? 0.5 : 0), 0) / Math.max(1, checked.length)) * 100)
//   return { rows, pct, checked: checked.length, verify: 14 - checked.length }
// }

// // ---------- the 30-day plan, written from what this profile is actually missing ----------
// function planWeeks(r) {
//   const all = r.sections.flatMap((s) => s.items)
//   const it = (id) => all.find((i) => i.id === id)
//   const bad = (id) => it(id) && it(id).sev !== 'good'
//   const f = r.facts
//   const w1 = []
//   if (bad('attrs')) w1.push('Add at least ' + Math.max(1, CONFIG.attributesTarget - f.attributes) + ' relevant profile attributes.')
//   if (bad('website')) w1.push('Link your website, with a clear service list and easy contact options.')
//   if (bad('phone')) w1.push('Add a phone number your team answers.')
//   if (bad('hours')) w1.push('Review business hours against nearby competitors.')
//   if (bad('keywords')) w1.push('Add your main services and location to the description.')
//   if (!w1.length) w1.push('Keep your details current, including holiday and special hours, and make the website’s contact options easy to find.')
//   const reviewsOk = !bad('r-velocity') && !bad('r-consistency') && !bad('r-count')
//   const photosLeft = Math.max(0, 10 - f.photos)
//   return [
//     { wk: 'Week 1', title: 'Complete the foundations', tag: 'Profile basics', text: w1.join(' ') },
//     { wk: 'Week 2', title: 'Build a steady review habit', tag: 'Review momentum', text: reviewsOk ? 'Keep your review routine running: invite every customer to leave an honest review and stay at 2+ new reviews a week.' : 'Set up a simple, repeatable process to invite every customer to leave an honest review. Work towards 2+ new reviews per week.' },
//     { wk: 'Week 3', title: 'Strengthen visual proof', tag: 'Photos + posts', text: (photosLeft ? 'Add ' + photosLeft + ' genuine photos that show the premises, team, services and environment. ' : 'Refresh the gallery with new photos of recent work and your team. ') + 'Start a regular posting routine (posts are not visible in public data, so check yours in the profile).' },
//     { wk: 'Week 4', title: 'Improve local relevance', tag: 'Local visibility', text: 'Review service descriptions and location language for clarity. Compare visibility for priority searches and identify which local competitors appear ahead.' }
//   ]
// }

// export default function PdfReport({ r }) {
//   const b = r.business
//   const date = new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })
//   const weak = r.sections.filter((s) => s.max - s.score >= 1).sort((a, c) => c.max - c.score - (a.max - a.score))
//   const strong = r.sections.filter((s) => ratio(s) >= 0.8)
//   const goodItems = r.sections.flatMap((s) => s.items).filter((i) => i.sev === 'good').map((i) => i.title)
//   const potential = Math.max(0, 100 - r.total)
//   const health = healthRows(r, CONFIG)
//   const plan = planWeeks(r)

//   const headline = r.total >= 85 ? 'A strong profile, ready to scale.' : r.total >= 60 ? 'A profile with room to grow.' : 'A profile that needs attention.'
//   const weakNames = weak.slice(0, 3).map((s) => SHORT[s.id])
//   const takeaway =
//     r.total >= 85 ? (weak.length ? 'Your profile is in strong shape. The remaining gains are in ' + listAnd(weakNames) + '.' : 'Your profile is in excellent shape. Keep your reviews, photos and details fresh to stay ahead.')
//     : r.total >= 60 ? (strong.length ? 'Your ' + listAnd(strong.map((s) => SHORT[s.id])) + (strong.length > 1 ? ' are already strengths. ' : ' is already a strength. ') : '') + 'The biggest opportunity is to improve ' + listAnd(weakNames) + '.'
//     : 'Your profile is missing several things customers and Google look for. Start with ' + listAnd(weak.slice(0, 2).map((s) => SHORT[s.id])) + ', which hold the most points.'

//   const pointsNote = r.sections.filter((s) => s.max - s.score > 0).map((s) => TITLE[s.id] + ' +' + (s.max - s.score)).join('; ')

//   return (
//     <div className="pdf" aria-hidden="true">
//       {/* ---------------- 1. Cover ---------------- */}
//       <section className="pg pg-cover">
//         <div className="p-head">
//           <div className="p-logo"><span className="p-wm">mmore<b>.</b>works</span><span className="p-sub">Google Business Profile audit</span></div>
//           <div className="p-meta">Prepared {date}</div>
//         </div>
//         <div className="g-cover">
//           <div className="g-banner">
//             <h1>Google Business<br />Profile Audit</h1>
//             <CoverArt />
//           </div>
//           <div className="g-lower">
//             <p className="g-sub">A practical snapshot of how customers may experience your business on Google, and the improvements worth prioritising next.</p>
//             <div className="g-card">
//               <label>Prepared for</label>
//               <strong>{b.name}</strong>
//               {b.address && (
//                 <div className="g-loc">
//                   <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="#4285f4" d="M12 2a7 7 0 0 0-7 7c0 5.2 7 13 7 13s7-7.8 7-13a7 7 0 0 0-7-7zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5z" /></svg>
//                   <span>{b.address}</span>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* ---------------- 2. Summary ---------------- */}
//       <section className="pg">
//         <h1 className="p-h1">{headline}</h1>
//         <p className="p-lead">A practical snapshot of how customers may experience your business on Google, and the improvements worth prioritising next.</p>
//         <div className="p-card p-biz">
//           <div className="p-avatar">{initials(b.name)}</div>
//           <div className="p-biz-t"><div className="p-biz-name">{b.name}</div><div className="p-muted">Google Business Profile</div></div>
//           <div className="p-biz-r">
//             {b.rating != null && <span className="p-pill">{b.rating} / 5 star rating</span>}
//             <b>{b.reviews ?? 0} reviews</b>
//           </div>
//         </div>
//         <div className="p-two">
//           <div className="p-card p-score">
//             <div className="p-eyebrow gray">Profile optimisation score</div>
//             <div className="p-ringwrap">
//               <Ring score={r.total} />
//               <div className="p-ringnum"><strong>{r.total}</strong><span>OUT OF 100</span></div>
//             </div>
//             <div className="p-chips">
//               <span className="p-chip red">{r.critical} critical {r.critical === 1 ? 'issue' : 'issues'}</span>
//               <span className="p-chip amber">{r.improve} improvement {r.improve === 1 ? 'area' : 'areas'}</span>
//             </div>
//           </div>
//           <div className="p-card p-take">
//             <div className="p-eyebrow">The owner takeaway</div>
//             <p className="p-take-main">{takeaway}</p>
//             <hr />
//             <div className="p-eyebrow">What is working</div>
//             {b.rating != null && <p className="p-take-line">{b.rating}-star rating &nbsp;|&nbsp; {b.reviews ?? 0} reviews</p>}
//             {goodItems.length > 0 && <p className="p-take-line">{goodItems.slice(0, 3).join('  |  ')}</p>}
//             {b.rating == null && !goodItems.length && <p className="p-take-line">Not much yet. Start with the foundations on the next pages.</p>}
//             <hr />
//             <div className="p-focus">Focus next: {list(weak.slice(0, 4).map((s) => SHORT[s.id])) || 'keeping everything up to date'}</div>
//           </div>
//         </div>
//         <div className="p-dark">
//           <div className="p-eyebrow mint">A quantified improvement opportunity</div>
//           <div className="p-dark-row">
//             <div className="p-big">+{potential}<span> potential points</span></div>
//             <p>The points still available across reviews, rating, photos, local competition and profile details, based on public Google data.</p>
//           </div>
//           <small>Directional estimate from the audit tool, not a guaranteed score increase or ranking result.</small>
//         </div>
//         <div className="p-chip teal wide">Recommended approach</div>
//         <p className="p-body">Fix the profile foundations first, then build a consistent review and content routine. Measure calls, website visits and direction requests to understand whether visibility improvements translate into enquiries.</p>
//       </section>

//       {/* ---------------- 3. Scorecard ---------------- */}
//       <section className="pg">
//         <div className="p-eyebrow">01 / The scorecard</div>
//         <h1 className="p-h1">Where your score comes from</h1>
//         <p className="p-lead">Each category shows the points earned out of the points we can measure from public Google data. The total is scaled to 100, so your score is {r.total} out of 100.</p>
//         <div className="p-cards">
//           {r.sections.map((s) => {
//             const st = status(s)
//             const worst = [...s.items].sort((x, y) => x.score / x.max - y.score / y.max)
//             const focus = (worst.filter((i) => i.sev !== 'good').length ? worst.filter((i) => i.sev !== 'good') : worst).slice(0, 2)
//             const lost = s.max - s.score
//             return (
//               <div className={'p-card p-cat ' + st} key={s.id}>
//                 <div className="p-cat-h"><b>{TITLE[s.id]}</b><b>{s.score} / {s.max}</b></div>
//                 <div className="p-bar"><i style={{ width: Math.round(ratio(s) * 100) + '%' }} /></div>
//                 <div className="p-cat-m"><span className={'p-chip ' + (st === 'priority' ? 'red' : st === 'improve' ? 'amber' : 'teal')}>{CHIP[st]}</span><em>{lost > 0 ? '+' + lost + ' pts*' : 'Maintain'}</em></div>
//                 <p className="p-cat-d">{focus.map((i) => i.lines[0]).join(' ')}</p>
//                 <div className="p-cat-a"><div className="p-eyebrow gray">Recommended action</div>{focus.map((i) => <p key={i.id}>{i.steps[0]}{/[.!?]$/.test(i.steps[0]) ? '' : '.'}</p>)}</div>
//               </div>
//             )
//           })}
//         </div>
//         <p className="p-foot">*Points shown are the points still available in each category: {pointsNote || 'none'}. The +{potential} total is a simple sum of those estimates, not a forecast. {r.notMeasured.map((n) => n.title).join(' and ')} {r.notMeasured.length > 1 ? 'are' : 'is'} not scored because {r.notMeasured.length > 1 ? 'they need' : 'it needs'} owner access to the profile. Actual scoring and search position may differ.</p>
//       </section>

//       {/* ---------------- 4. Profile health check ---------------- */}
//       <section className="pg">
//         <div className="p-band"><h1>A strong profile starts with the basics</h1><p>Profile fields and a practical completeness review</p></div>
//         <div className="p-complete">
//           <div className="p-complete-l"><div className="p-eyebrow">Profile completeness</div><strong>{health.pct}%</strong></div>
//           <div className="p-bar big"><i style={{ width: health.pct + '%' }} /></div>
//           <div className="p-complete-r"><div className={'p-eyebrow ' + (health.pct >= 85 ? '' : 'amberT')}>{health.pct >= 85 ? 'Looking good' : 'Needs attention'}</div><p>A few missing or underused fields can make it harder for a prospect to understand the offer and take action.</p></div>
//         </div>
//         <div className="p-listhead"><span className="p-eyebrow">Listing health check</span><span className="p-eyebrow gray">Based on public Google data</span></div>
//         <div className="p-two even">
//           {[['Business information', health.rows.info], ['Content & actions', health.rows.content]].map(([title, rows]) => (
//             <div className="p-card p-rows" key={title}>
//               <h3>{title}</h3>
//               {rows.map((x) => (
//                 <div className="p-row" key={x.name}>
//                   <div className="p-row-t"><b>{x.name}</b><span className={'p-st ' + x.st[1]}>{x.st[0]}</span></div>
//                   <div className="p-row-h">{x.hint}</div>
//                 </div>
//               ))}
//             </div>
//           ))}
//         </div>
//         <p className="p-foot">{health.checked} of 14 fields can be read from public Google data. The {health.verify} marked <b>Verify</b> cannot be read without owner access, so please check them in the profile.</p>
//       </section>

//       {/* ---------------- 5. 30-day plan ---------------- */}
//       <section className="pg last">
//         <h1 className="p-h1">A focused 30-day action plan</h1>
//         <p className="p-lead">A practical sequence to address the audit findings without overwhelming your team.</p>
//         <div className="p-weeks">
//           {plan.map((w) => (
//             <div className="p-card p-week" key={w.wk}>
//               <div className="p-wk">{w.wk}</div>
//               <div className="p-week-b"><h3>{w.title}</h3><p>{w.text}</p></div>
//               <span className="p-tag">{w.tag}</span>
//             </div>
//           ))}
//         </div>
//         <div className="p-two even">
//           <div className="p-box mint"><div className="p-eyebrow">Measure what matters</div><p>Record a baseline, then review monthly: calls, website clicks, direction requests, review count and review pace. Also track visibility for agreed local search terms.</p></div>
//           <div className="p-box"><div className="p-eyebrow dark">What this audit does not show</div><p>This export does not include actual calls, website clicks, direction requests, booked-customer data, keyword-level ranking positions or named competitor comparisons. These should be measured before claiming business impact.</p></div>
//         </div>
//         <div className="p-cta">
//           <div><b>Let’s turn these findings into action.</b><p>Acumensa Tech can help implement the priority fixes and establish a repeatable review, photo and posting workflow.</p></div>
//           <a href={waHref('Hi, I checked the Google profile health of ' + b.name + ' (score ' + r.total + '/100). I’d like to discuss a 30-day sprint.')}>Discuss a 30-day sprint</a>
//         </div>
//       </section>
//     </div>
//   )
// }

// The PDF version of the report (browser print). Hidden on screen, shown by the print styles in pdf.css.
// Pages: 1 cover (business name + address), 2 summary, 3 scorecard, 4 profile health check, 5 30-day plan.
// Everything is built from the scored report `r` (see score.js), so each business gets its own PDF.
import React from 'react'
import './pdf.css'
import { CONFIG } from './score.js'

const WHATSAPP = '918310719532'
const waHref = (text) => 'https://wa.me/' + WHATSAPP + '?text=' + encodeURIComponent(text)

const TITLE = { reviews: 'Reviews', rating: 'Rating', photos: 'Photos', competition: 'Local competition', completeness: 'Profile completeness' }
const SHORT = { reviews: 'reviews', rating: 'rating', photos: 'photos', competition: 'local competition', completeness: 'profile details' }
const list = (a) => (a.length < 2 ? a.join('') : a.slice(0, -1).join(', ') + ' & ' + a[a.length - 1])
const listAnd = (a) => (a.length < 2 ? a.join('') : a.slice(0, -1).join(', ') + ' and ' + a[a.length - 1])
const ratio = (s) => (s.max ? s.score / s.max : 1)
const initials = (name) => String(name || '?').split(/\s+/).filter(Boolean).slice(0, 2).map((w) => w[0]).join('').toUpperCase()
const status = (s) => (s.items.some((i) => i.sev === 'critical') ? 'priority' : s.items.some((i) => i.sev === 'improve') ? 'improve' : 'good')
const CHIP = { priority: 'Priority', improve: 'Improve', good: 'Keep up' }

// ---------- cover illustration (a stylised Google Business Profile card) ----------
function Star({ x, y }) {
  return <path transform={`translate(${x} ${y})`} fill="#f59e0b" d="M8 0l2.4 5 5.5.7-4 3.8 1 5.4L8 12.2 3.1 14.9l1-5.4-4-3.8L5.6 5z" />
}
function CoverArt() {
  return (
    <svg className="g-art" viewBox="0 0 380 270" aria-hidden="true">
      <defs><filter id="sh" x="-20%" y="-20%" width="140%" height="140%"><feDropShadow dx="0" dy="6" stdDeviation="8" floodColor="#0b2a6b" floodOpacity=".28" /></filter></defs>
      <rect x="0" y="0" width="300" height="270" rx="22" fill="#fff" />
      <rect x="24" y="26" width="140" height="11" rx="5.5" fill="#e3e6ea" />
      {[0, 1, 2, 3, 4].map((i) => <Star key={i} x={24 + i * 19} y={52} />)}
      <rect x="24" y="82" width="92" height="8" rx="4" fill="#e3e6ea" />
      <rect x="208" y="22" width="72" height="72" rx="10" fill="#cfe0f7" />
      <rect x="220" y="62" width="48" height="20" rx="3" fill="#aac7ef" />
      <rect x="24" y="112" width="52" height="7" rx="3.5" fill="#4285f4" />
      <rect x="92" y="112" width="48" height="7" rx="3.5" fill="#e3e6ea" />
      <rect x="156" y="112" width="48" height="7" rx="3.5" fill="#e3e6ea" />
      <rect x="220" y="112" width="48" height="7" rx="3.5" fill="#e3e6ea" />
      <rect x="0" y="128" width="300" height="1.5" fill="#e8ecf2" />
      {[44, 100, 156, 212].map((cx) => <circle key={cx} cx={cx} cy="160" r="18" fill="none" stroke="#4285f4" strokeWidth="1.6" />)}
      {/* Business Profile action icons: Call, Reviews, Posts, Website (Google blue) */}
      <g fill="none" stroke="#4285f4" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
        <g transform="translate(35 151) scale(.75)"><path d="M6.6 10.8a15 15 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25 11.4 11.4 0 0 0 3.6.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.57a1 1 0 0 1-.25 1z" /></g>
        <g transform="translate(91 151) scale(.75)"><path d="M12 3.5l2.6 5.3 5.9.85-4.25 4.15 1 5.85L12 16.9l-5.25 2.75 1-5.85L3.5 9.65l5.9-.85z" /></g>
        <g transform="translate(147 151) scale(.75)"><path d="M7 3h8l4 4v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1z" /><path d="M15 3v4h4M9 12h6M9 16h6" /></g>
        <g transform="translate(203 151) scale(.75)"><circle cx="12" cy="12" r="9" /><path d="M3 12h18" /><path d="M12 3c2.5 2.5 3.8 5.5 3.8 9s-1.3 6.5-3.8 9c-2.5-2.5-3.8-5.5-3.8-9S9.5 5.5 12 3z" /></g>
      </g>
      <rect x="0" y="190" width="300" height="1.5" fill="#e8ecf2" />
      <rect x="62" y="206" width="150" height="8" rx="4" fill="#e3e6ea" />
      <rect x="62" y="224" width="110" height="8" rx="4" fill="#e3e6ea" />
      <circle cx="30" cy="215" r="7" fill="none" stroke="#4285f4" strokeWidth="1.8" />
      <rect x="0" y="246" width="300" height="1.5" fill="#e8ecf2" />
      <g filter="url(#sh)">
        <circle cx="292" cy="170" r="68" fill="#fff" />
        <path d="M252 150l8-22h64l8 22z" fill="#4a6fd6" />
        <path d="M252 150h16v10a8 8 0 0 1-16 0zM268 150h16v10a8 8 0 0 1-16 0zM284 150h16v10a8 8 0 0 1-16 0zM300 150h16v10a8 8 0 0 1-16 0zM316 150h16v10a8 8 0 0 1-16 0z" fill="#7da2f4" />
        <path d="M260 164h64v34a4 4 0 0 1-4 4h-56a4 4 0 0 1-4-4z" fill="#4285f4" />
        <circle cx="304" cy="186" r="11" fill="#fff" />
        <text x="304" y="191" textAnchor="middle" fontFamily="Arial, sans-serif" fontWeight="700" fontSize="14" fill="#4285f4">G</text>
      </g>
    </svg>
  )
}

// ---------- score ring ----------
function Ring({ score }) {
  return (
    <svg className="p-ring" viewBox="0 0 200 200" role="img" aria-label={`Score ${score} out of 100`}>
      <circle cx="100" cy="100" r="80" fill="none" stroke="#ece9e6" strokeWidth="17" />
      <circle cx="100" cy="100" r="80" fill="none" stroke={score < 40 ? '#e0142a' : '#2e7d32'} strokeWidth="17" strokeLinecap="round" pathLength="100" strokeDasharray={`${score} 100`} transform="rotate(-90 100 100)" />
    </svg>
  )
}

// ---------- the profile health check rows ----------
function healthRows(r, CFG) {
  const b = r.business, f = r.facts
  const present = ['Present', 'ok']
  const rows = {
    info: [
      { name: 'Business name', hint: 'Consistent with your brand', st: b.name ? present : ['Missing', 'bad'] },
      { name: 'Primary category', hint: 'Confirm the most specific eligible category', st: b.category ? [b.category, 'ok'] : ['Missing', 'bad'] },
      { name: 'Phone number', hint: 'Test the number during business hours', st: b.phone ? present : ['Missing', 'bad'] },
      { name: 'Website', hint: 'Check mobile speed and service relevance', st: b.website ? present : ['Missing', 'bad'] },
      { name: 'Address / service area', hint: 'Confirm pin and entrance are correct', st: b.address ? present : ['Missing', 'bad'] },
      { name: 'Opening hours', hint: 'Check weekends and special hours', st: !f.hasHours ? ['Missing', 'bad'] : f.compHours && f.hoursPerWeek < f.compHours ? ['Review', 'warn'] : present },
      { name: 'Business description', hint: 'Explain services and differentiators', st: ['Verify', 'na'] }
    ],
    content: [
      { name: 'Appointment link', hint: 'Add an obvious booking or enquiry route', st: ['Verify', 'na'] },
      { name: 'Services / products', hint: 'List priority services with clear names', st: ['Verify', 'na'] },
      { name: 'Recent photos', hint: 'Add authentic team, product and premises images', st: f.photos >= 10 ? present : f.photos > 0 ? ['Needs refresh', 'warn'] : ['Missing', 'bad'] },
      { name: 'Posts / updates', hint: 'Publish useful updates consistently', st: ['Verify', 'na'] },
      { name: 'Review responses', hint: 'Respond promptly and professionally', st: ['Verify', 'na'] },
      { name: 'Attributes / amenities', hint: 'Complete only relevant, accurate attributes', st: f.attributes >= CFG.attributesTarget ? present : f.attributes > 0 ? ['Incomplete', 'warn'] : ['Missing', 'bad'] },
      { name: 'Messaging / call path', hint: 'Test the full journey on a mobile device', st: ['Verify', 'na'] }
    ]
  }
  const checked = [...rows.info, ...rows.content].filter((x) => x.st[1] !== 'na')
  const pct = Math.round((checked.reduce((a, x) => a + (x.st[1] === 'ok' ? 1 : x.st[1] === 'warn' ? 0.5 : 0), 0) / Math.max(1, checked.length)) * 100)
  return { rows, pct, checked: checked.length, verify: 14 - checked.length }
}

// ---------- the 30-day plan, written from what this profile is actually missing ----------
function planWeeks(r) {
  const all = r.sections.flatMap((s) => s.items)
  const it = (id) => all.find((i) => i.id === id)
  const bad = (id) => it(id) && it(id).sev !== 'good'
  const f = r.facts
  const w1 = []
  if (bad('attrs')) w1.push('Add at least ' + Math.max(1, CONFIG.attributesTarget - f.attributes) + ' relevant profile attributes.')
  if (bad('website')) w1.push('Link your website, with a clear service list and easy contact options.')
  if (bad('phone')) w1.push('Add a phone number your team answers.')
  if (bad('hours')) w1.push('Review business hours against nearby competitors.')
  if (bad('keywords')) w1.push('Add your main services and location to the description.')
  if (!w1.length) w1.push('Keep your details current, including holiday and special hours, and make the website’s contact options easy to find.')
  const reviewsOk = !bad('r-velocity') && !bad('r-consistency') && !bad('r-count')
  const photosLeft = Math.max(0, 10 - f.photos)
  return [
    { wk: 'Week 1 - Week 2', title: 'Complete the foundations', tag: 'Profile basics', text: w1.join(' ') },
    { wk: 'Week 2 - Week 3', title: 'Build a steady review habit', tag: 'Review momentum', text: reviewsOk ? 'Keep your review routine running: invite every customer to leave an honest review and stay at 2+ new reviews a week.' : 'Set up a simple, repeatable process to invite every customer to leave an honest review. Work towards 2+ new reviews per week.' },
    { wk: 'Week 3 - Week 4', title: 'Strengthen visual proof', tag: 'Photos + posts', text: (photosLeft ? 'Add ' + photosLeft + ' genuine photos that show the premises, team, services and environment. ' : 'Refresh the gallery with new photos of recent work and your team. ') + 'Start a regular posting routine (posts are not visible in public data, so check yours in the profile).' },
    { wk: 'Week 4 - Week 5', title: 'Improve local relevance', tag: 'Local visibility', text: 'Review service descriptions and location language for clarity. Compare visibility for priority searches and identify which local competitors appear ahead.' }
  ]
}

export default function PdfReport({ r }) {
  const b = r.business
  const date = new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })
  const weak = r.sections.filter((s) => s.max - s.score >= 1).sort((a, c) => c.max - c.score - (a.max - a.score))
  const strong = r.sections.filter((s) => ratio(s) >= 0.8)
  const goodItems = r.sections.flatMap((s) => s.items).filter((i) => i.sev === 'good').map((i) => i.title)
  const potential = Math.max(0, 90 - r.total) // potential points are counted out of 90, not 100
  const health = healthRows(r, CONFIG)
  const plan = planWeeks(r)

  const headline = r.total >= 85 ? 'A strong profile, ready to scale.' : r.total >= 60 ? 'A profile with room to grow.' : 'A profile that needs attention.'
  const weakNames = weak.slice(0, 3).map((s) => SHORT[s.id])
  const takeaway =
    r.total >= 85 ? (weak.length ? 'Your profile is in strong shape. The remaining gains are in ' + listAnd(weakNames) + '.' : 'Your profile is in excellent shape. Keep your reviews, photos and details fresh to stay ahead.')
    : r.total >= 60 ? (strong.length ? 'Your ' + listAnd(strong.map((s) => SHORT[s.id])) + (strong.length > 1 ? ' are already strengths. ' : ' is already a strength. ') : '') + 'The biggest opportunity is to improve ' + listAnd(weakNames) + '.'
    : 'Your profile is missing several things customers and Google look for. Start with ' + listAnd(weak.slice(0, 2).map((s) => SHORT[s.id])) + ', which hold the most points.'

  const pointsNote = r.sections.filter((s) => s.max - s.score > 0).map((s) => TITLE[s.id] + ' +' + (s.max - s.score)).join('; ')

  return (
    <div className="pdf" aria-hidden="true">
      {/* ---------------- 1. Cover ---------------- */}
      <section className="pg pg-cover">
        <div className="p-head">
          <div className="p-logo"><span className="p-wm">mmore<b>.</b>works</span><span className="p-sub">Google Business Profile audit</span></div>
          <div className="p-meta">Prepared {date}</div>
        </div>
        <div className="g-cover">
          <div className="g-banner">
            <h1>Google Business<br />Profile Audit</h1>
            <CoverArt />
          </div>
          <div className="g-lower">
            <p className="g-sub">A practical snapshot of how customers may experience your business on Google, and the improvements worth prioritising next.</p>
            <div className="g-card">
              <label>Prepared for</label>
              <strong>{b.name}</strong>
              {b.address && (
                <div className="g-loc">
                  <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="#4285f4" d="M12 2a7 7 0 0 0-7 7c0 5.2 7 13 7 13s7-7.8 7-13a7 7 0 0 0-7-7zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5z" /></svg>
                  <span>{b.address}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- 2. Summary ---------------- */}
      <section className="pg">
        <h1 className="p-h1">{headline}</h1>
        <p className="p-lead">A practical snapshot of how customers may experience your business on Google, and the improvements worth prioritising next.</p>
        <div className="p-card p-biz">
          <div className="p-avatar">{initials(b.name)}</div>
          <div className="p-biz-t"><div className="p-biz-name">{b.name}</div><div className="p-muted">Google Business Profile</div></div>
          <div className="p-biz-r">
            {b.rating != null && <span className="p-pill">{b.rating} / 5 star rating</span>}
            <b>{b.reviews ?? 0} reviews</b>
          </div>
        </div>
        <div className="p-two">
          <div className="p-card p-score">
            <div className="p-eyebrow gray">Profile optimisation score</div>
            <div className="p-ringwrap">
              <Ring score={r.total} />
              <div className="p-ringnum"><strong>{r.total}</strong><span>OUT OF 100</span></div>
            </div>
            <div className="p-chips">
              <span className="p-chip red">{r.critical} critical {r.critical === 1 ? 'issue' : 'issues'}</span>
              <span className="p-chip amber">{r.improve} improvement {r.improve === 1 ? 'area' : 'areas'}</span>
            </div>
          </div>
          <div className="p-card p-take">
            <div className="p-eyebrow">The owner takeaway</div>
            <p className="p-take-main">{takeaway}</p>
            <hr />
            <div className="p-eyebrow">What is working</div>
            {b.rating != null && <p className="p-take-line">{b.rating}-star rating &nbsp;|&nbsp; {b.reviews ?? 0} reviews</p>}
            {goodItems.length > 0 && <p className="p-take-line">{goodItems.slice(0, 3).join('  |  ')}</p>}
            {b.rating == null && !goodItems.length && <p className="p-take-line">Not much yet. Start with the foundations on the next pages.</p>}
            <hr />
            <div className="p-focus">Focus next: {list(weak.slice(0, 4).map((s) => SHORT[s.id])) || 'keeping everything up to date'}</div>
          </div>
        </div>
        <div className="p-dark">
          <div className="p-eyebrow mint">A quantified improvement opportunity</div>
          <div className="p-dark-row">
            <div className="p-big">+{potential}<span> potential points</span></div>
            <p>The points still available across reviews, rating, photos, local competition and profile details, based on public Google data.</p>
          </div>
          <small>Directional estimate from the audit tool, not a guaranteed score increase or ranking result.</small>
        </div>
        <div className="p-chip teal wide">Recommended approach</div>
        <p className="p-body">Fix the profile foundations first, then build a consistent review and content routine. Measure calls, website visits and direction requests to understand whether visibility improvements translate into enquiries.</p>
      </section>

      {/* ---------------- 3. Scorecard ---------------- */}
      <section className="pg">
        <div className="p-eyebrow">01 / The scorecard</div>
        <h1 className="p-h1">Where your score comes from</h1>
        <p className="p-lead">Each category shows the points earned out of the points we can measure from public Google data. The total is scaled to 100, so your score is {r.total} out of 100.</p>
        <div className="p-cards">
          {r.sections.map((s) => {
            const st = status(s)
            const worst = [...s.items].sort((x, y) => x.score / x.max - y.score / y.max)
            const focus = (worst.filter((i) => i.sev !== 'good').length ? worst.filter((i) => i.sev !== 'good') : worst).slice(0, 2)
            const lost = s.max - s.score
            return (
              <div className={'p-card p-cat ' + st} key={s.id}>
                <div className="p-cat-h"><b>{TITLE[s.id]}</b><b>{s.score} / {s.max}</b></div>
                <div className="p-bar"><i style={{ width: Math.round(ratio(s) * 100) + '%' }} /></div>
                <div className="p-cat-m"><span className={'p-chip ' + (st === 'priority' ? 'red' : st === 'improve' ? 'amber' : 'teal')}>{CHIP[st]}</span><em>{lost > 0 ? '+' + lost + ' pts*' : 'Maintain'}</em></div>
                <p className="p-cat-d">{focus.map((i) => i.lines[0]).join(' ')}</p>
                <div className="p-cat-a"><div className="p-eyebrow gray">Recommended action</div>{focus.map((i) => <p key={i.id}>{i.steps[0]}{/[.!?]$/.test(i.steps[0]) ? '' : '.'}</p>)}</div>
              </div>
            )
          })}
        </div>
        <p className="p-foot">*Points shown are the points still available in each category: {pointsNote || 'none'}. The +{potential} total is a simple sum of those estimates, not a forecast. {r.notMeasured.map((n) => n.title).join(' and ')} {r.notMeasured.length > 1 ? 'are' : 'is'} not scored because {r.notMeasured.length > 1 ? 'they need' : 'it needs'} owner access to the profile. Actual scoring and search position may differ.</p>
      </section>

      {/* ---------------- 4. Profile health check ---------------- */}
      <section className="pg">
        <div className="p-band"><h1>A strong profile starts with the basics</h1><p>Profile fields and a practical completeness review</p></div>
        <div className="p-complete">
          <div className="p-complete-l"><div className="p-eyebrow">Profile completeness</div><strong>{health.pct}%</strong></div>
          <div className="p-bar big"><i style={{ width: health.pct + '%' }} /></div>
          <div className="p-complete-r"><div className={'p-eyebrow ' + (health.pct >= 85 ? '' : 'amberT')}>{health.pct >= 85 ? 'Looking good' : 'Needs attention'}</div><p>A few missing or underused fields can make it harder for a prospect to understand the offer and take action.</p></div>
        </div>
        <div className="p-listhead"><span className="p-eyebrow">Listing health check</span><span className="p-eyebrow gray">Based on public Google data</span></div>
        <div className="p-two even">
          {[['Business information', health.rows.info], ['Content & actions', health.rows.content]].map(([title, rows]) => (
            <div className="p-card p-rows" key={title}>
              <h3>{title}</h3>
              {rows.map((x) => (
                <div className="p-row" key={x.name}>
                  <div className="p-row-t"><b>{x.name}</b><span className={'p-st ' + x.st[1]}>{x.st[0]}</span></div>
                  <div className="p-row-h">{x.hint}</div>
                </div>
              ))}
            </div>
          ))}
        </div>
        <p className="p-foot">{health.checked} of 14 fields can be read from public Google data. The {health.verify} marked <b>Verify</b> cannot be read without owner access, so please check them in the profile.</p>
      </section>

      {/* ---------------- 5. 30-day plan ---------------- */}
      <section className="pg last">
        <h1 className="p-h1">A focused 30-day action plan</h1>
        <p className="p-lead">A practical sequence to address the audit findings without overwhelming your team.</p>
        <div className="p-weeks">
          {plan.map((w) => (
            <div className="p-card p-week" key={w.wk}>
              <div className="p-wk">{w.wk}</div>
              <div className="p-week-b"><h3>{w.title}</h3><p>{w.text}</p></div>
              <span className="p-tag">{w.tag}</span>
            </div>
          ))}
        </div>
        <div className="p-two even">
          <div className="p-box mint"><div className="p-eyebrow">Measure what matters</div><p>Record a baseline, then review monthly: calls, website clicks, direction requests, review count and review pace. Also track visibility for agreed local search terms.</p></div>
          <div className="p-box"><div className="p-eyebrow dark">What this audit does not show</div><p>This export does not include actual calls, website clicks, direction requests, booked-customer data, keyword-level ranking positions or named competitor comparisons. These should be measured before claiming business impact.</p></div>
        </div>
        <div className="p-cta">
          <div><b>Let’s turn these findings into action.</b><p>Acumensa Tech can help implement the priority fixes and establish a repeatable review, photo and posting workflow.</p></div>
          <a href={waHref('Hi, I checked the Google profile health of ' + b.name + ' (score ' + r.total + '/100). I’d like to discuss a 30-day sprint.')}>Discuss a 30-day sprint</a>
        </div>
      </section>
    </div>
  )
}