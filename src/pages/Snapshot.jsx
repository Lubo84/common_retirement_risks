import React, { useMemo, useState } from 'react'
import ScoreGauge from '../components/ScoreGauge.jsx'
import { computeReadinessScore } from '../lib/scoring.js'
import { downloadJson } from '../lib/storage.js'

const AGE_BANDS = [
  { value:'45-49', label:'45–49' },
  { value:'50-54', label:'50–54' },
  { value:'55-59', label:'55–59' },
  { value:'60-64', label:'60–64' },
  { value:'65-69', label:'65–69' },
  { value:'70+', label:'70+' },
]

const COST_BANDS = [
  { value:'asfa-modest', label:'ASFA Modest (anchor)' },
  { value:'asfa-comfortable', label:'ASFA Comfortable (anchor)' },
  { value:'custom', label:'My own number' },
]

const RISKS = [
  { key:'longevity', title:'Longevity (outliving savings)' },
  { key:'sequencing', title:'Sequencing (bad markets early)' },
  { key:'inflation', title:'Inflation (prices rising)' },
  { key:'age pension', title:'Age Pension uncertainty' },
  { key:'market', title:'Market volatility' },
  { key:'health', title:'Health shock / care costs' },
  { key:'cognitive', title:'Cognitive decline / scams' },
]

export default function Snapshot({ state, setState }){
  const snap = state.snapshot || {}
  const [local, setLocal] = useState({
    ageBand: snap.ageBand || '',
    vision: snap.vision || '',
    costBand: snap.costBand || '',
    checkedOnTrack: snap.checkedOnTrack || '',
    risksSelected: snap.risksSelected || [],
    notes: snap.notes || '',
  })

  const scorePack = useMemo(() => computeReadinessScore(local), [local])

  function toggleRisk(key){
    setLocal(prev => {
      const set = new Set(prev.risksSelected || [])
      if (set.has(key)) set.delete(key); else set.add(key)
      return { ...prev, risksSelected: Array.from(set) }
    })
  }

  function save(){
    const next = { ...state, snapshot: local }
    setState(next)
    alert('Saved in your browser.')
  }

  function exportIt(){
    downloadJson('retirement_snapshot.json', { snapshot: local, score: scorePack })
  }

  const modules = useMemo(() => {
    const items = []
    items.push({
      title: "1) Set Your Vision",
      why: "Your vision is the north star. Without it, ‘retirement planning’ becomes… a vibe.",
      doThis: local.vision?.trim()
        ? "Refine your vision into 3 bullets (Lifestyle • Health • Family/Work)."
        : "Write 2–3 sentences: what does a great week in retirement look like?",
    })
    items.push({
      title: "2) Know Your Number",
      why: "You can’t hit a target you won’t name.",
      doThis: local.costBand
        ? "Use your anchor and sanity-check the biggest categories (housing, food, health)."
        : "Pick an anchor (Modest, Comfortable, or your own number).",
    })
    items.push({
      title: "3) Check if You’re on Track",
      why: "A quick projection turns anxiety into a plan (or at least a to‑do list).",
      doThis: local.checkedOnTrack === 'yes'
        ? "Re-run your projection annually (or after big life changes)."
        : "Do one rough ‘on track’ check using your super fund’s calculator.",
    })
    items.push({
      title: "4) Review and Revisit",
      why: "Life changes. Plans should too.",
      doThis: "Set a yearly reminder: check balance, contributions, and whether your plan still fits your life.",
    })
    items.push({
      title: "5) Understand Income Options",
      why: "Retirement income usually comes from a mix (super + Age Pension + other).",
      doThis: "Learn the basics: account-based pensions, minimum drawdowns, and how Age Pension interacts.",
    })
    return items
  }, [local])

  return (
    <div className="grid">
      <div className="col-12">
        <ScoreGauge score={scorePack.score} />
      </div>

      <div className="col-8 card">
        <h2 style={{marginTop:0}}>Retirement Snapshot (3–4 minutes)</h2>
        <p className="muted" style={{marginTop:0}}>
          Answer quickly. The goal is momentum, not perfection.
        </p>

        <div className="field">
          <label>Age band</label>
          <select value={local.ageBand} onChange={(e)=>setLocal({...local, ageBand:e.target.value})}>
            <option value="">Select…</option>
            {AGE_BANDS.map(a => <option key={a.value} value={a.value}>{a.label}</option>)}
          </select>
        </div>

        <div className="field">
          <label>Your retirement vision (1–3 sentences)</label>
          <textarea value={local.vision} onChange={(e)=>setLocal({...local, vision:e.target.value})}
            placeholder="e.g., More time with family, some travel, staying active, and not stressing about bills." />
        </div>

        <div className="field">
          <label>Cost-of-living anchor</label>
          <select value={local.costBand} onChange={(e)=>setLocal({...local, costBand:e.target.value})}>
            <option value="">Select…</option>
            {COST_BANDS.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
          </select>
        </div>

        <div className="field">
          <label>Have you checked if you’re on track (projection/calculator)?</label>
          <select value={local.checkedOnTrack} onChange={(e)=>setLocal({...local, checkedOnTrack:e.target.value})}>
            <option value="">Select…</option>
            <option value="yes">Yes</option>
            <option value="no">Not yet</option>
          </select>
        </div>

        <div className="field">
          <label>Your top risks (choose 1–3)</label>
          <div className="pillrow">
            {RISKS.map(r => (
              <button key={r.key} className="btn" type="button" onClick={()=>toggleRisk(r.key)}
                style={local.risksSelected?.includes(r.key) ? {borderColor:'rgba(255,208,0,0.65)', background:'rgba(255,208,0,0.10)'} : {}}>
                {r.title}
              </button>
            ))}
          </div>
        </div>

        <div className="field">
          <label>Anything else to capture?</label>
          <textarea value={local.notes} onChange={(e)=>setLocal({...local, notes:e.target.value})}
            placeholder="Optional notes..." />
        </div>

        <div className="btnrow">
          <button className="btn primary" onClick={save}>Save</button>
          <button className="btn" onClick={exportIt}>Export JSON</button>
        </div>

        <p className="small muted" style={{marginTop:12}}>
          (Yes, you can keep it brutally simple. That’s the point.)
        </p>
      </div>

      <div className="col-4 card">
        <h3 style={{marginTop:0}}>Why this score?</h3>
        <p className="muted" style={{marginTop:0}}>
          It rewards clarity and action—not having a giant balance.
        </p>
        <ul className="list">
          {scorePack.reasons.map((r, idx)=>(<li key={idx}>{r}</li>))}
        </ul>
      </div>

      <div className="col-12 card">
        <h3 style={{marginTop:0}}>Your personalised pathway (micro‑modules)</h3>
        <div className="grid">
          {modules.map((m, idx) => (
            <div className="col-4 card" key={idx} style={{background:'rgba(255,255,255,0.03)'}}>
              <div className="tag">{m.title}</div>
              <p className="muted"><strong>Why:</strong> {m.why}</p>
              <p><strong>Do this:</strong> {m.doThis}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
