import React, { useMemo, useState } from 'react'
import CuratedChat from '../components/CuratedChat.jsx'
import { RISK_LIBRARY } from '../riskLibrary.js'
import { downloadJson } from '../lib/storage.js'

const RISK_OPTIONS = [
  { key:'longevity', title:'Longevity (outliving savings)' },
  { key:'sequencing', title:'Sequencing risk (bad markets early)' },
  { key:'inflation', title:'Inflation (rising prices)' },
  { key:'age pension', title:'Age Pension uncertainty' },
  { key:'market', title:'Market volatility' },
  { key:'health', title:'Health shock / care costs' },
  { key:'cognitive', title:'Cognitive decline / scams' },
]

export default function RiskRadar({ state, setState }){
  const saved = state.riskRadar || { selected: [], topTwo: [] }
  const [selected, setSelected] = useState(saved.selected || [])

  function toggle(key){
    setSelected(prev => {
      const s = new Set(prev)
      if (s.has(key)) s.delete(key); else s.add(key)
      return Array.from(s)
    })
  }

  const topTwo = useMemo(() => {
    // For now: top two are the first two selected in order.
    const list = selected.slice(0, 2).map(k => ({ key:k, title: RISK_OPTIONS.find(r=>r.key===k)?.title || k }))
    return list
  }, [selected])

  const other = useMemo(() => selected.slice(2).map(k => ({ key:k, title: RISK_OPTIONS.find(r=>r.key===k)?.title || k })), [selected])

  function save(){
    const next = { ...state, riskRadar: { selected, topTwo } }
    setState(next)
    alert('Saved in your browser.')
  }

  function exportIt(){
    downloadJson('risk_radar.json', { selected, topTwo })
  }

  return (
    <div className="grid">
      <div className="col-12 card hero">
        <h2>Risk Radar</h2>
        <p>
          Pick the risks that keep popping up in your head at 2am.
          We’ll explain your top two in plain English and give you sensible next steps.
        </p>
        <div className="btnrow">
          <button className="btn primary" onClick={save}>Save</button>
          <button className="btn" onClick={exportIt}>Export JSON</button>
        </div>
      </div>

      <div className="col-8 card">
        <h3 style={{marginTop:0}}>Choose your risks</h3>
        <p className="muted" style={{marginTop:0}}>Tip: 2–3 is plenty. More than that and you’re just collecting Pokémon.</p>

        <div className="pillrow">
          {RISK_OPTIONS.map(r => (
            <button key={r.key} className="btn" onClick={()=>toggle(r.key)}
              style={selected.includes(r.key) ? {borderColor:'rgba(255,208,0,0.65)', background:'rgba(255,208,0,0.10)'} : {}}>
              {r.title}
            </button>
          ))}
        </div>

        <div className="hr" />
        <h3>Your top two</h3>
        {topTwo.length === 0 && <p className="muted">Select at least one risk to see the explainer.</p>}

        {topTwo.map((r) => {
          const lib = RISK_LIBRARY[r.key]
          return (
            <div className="card" key={r.key} style={{marginTop:12, background:'rgba(255,255,255,0.03)'}}>
              <div className="tag">{lib?.title || r.title}</div>
              <p className="muted" style={{marginTop:10}}>{lib?.plainEnglish}</p>
              <p><strong>Try this:</strong> {lib?.tryThis}</p>
            </div>
          )
        })}

        {other.length > 0 && (
          <div style={{marginTop:14}}>
            <h4>Other risks you picked</h4>
            <div className="pillrow">
              {other.map(r => <span className="pill" key={r.key}>{RISK_LIBRARY[r.key]?.title || r.title}</span>)}
            </div>
          </div>
        )}

        <div className="notice" style={{marginTop:14}}>
          Want the “so what?” version? Scroll down to the curated chat and ask: <em>“What should I do next?”</em>
        </div>
      </div>

      <div className="col-4">
        <CuratedChat context={{ topRisks: topTwo.map(r => ({...r, title: RISK_LIBRARY[r.key]?.title || r.title})) }} />
      </div>
    </div>
  )
}
