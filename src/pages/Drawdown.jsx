import React, { useMemo, useState } from 'react'
import { MIN_DRAWDOWN_FACTORS, calcDrawdown, fmtCurrency, fmtPct } from '../lib/drawdown.js'
import { downloadJson } from '../lib/storage.js'

export default function Drawdown({ state, setState }){
  const saved = state.drawdown || {}
  const [form, setForm] = useState({
    age: saved.age || '',
    balance: saved.balance || '',
    targetIncome: saved.targetIncome || '',
    agePension: saved.agePension || '',
    otherIncome: saved.otherIncome || '',
  })

  const result = useMemo(() => calcDrawdown(form), [form])

  function save(){
    const next = { ...state, drawdown: form }
    setState(next)
    alert('Saved in your browser.')
  }

  function exportIt(){
    downloadJson('drawdown_guide.json', { form, result })
  }

  return (
    <div className="grid">
      <div className="col-12 card hero">
        <h2>Drawdown Guide</h2>
        <p>
          A practical nudge to help pick a pension payment. It uses the minimum drawdown rules and an “income gap” approach.
        </p>
        <div className="btnrow">
          <button className="btn primary" onClick={save}>Save</button>
          <button className="btn" onClick={exportIt}>Export JSON</button>
        </div>
      </div>

      <div className="col-6 card">
        <h3 style={{marginTop:0}}>Your details</h3>

        <div className="field">
          <label>Age</label>
          <input value={form.age} onChange={(e)=>setForm({...form, age:e.target.value})} placeholder="e.g., 67" inputMode="numeric" />
        </div>

        <div className="field">
          <label>Pension balance (at 1 July)</label>
          <input value={form.balance} onChange={(e)=>setForm({...form, balance:e.target.value})} placeholder="e.g., 450000" inputMode="numeric" />
        </div>

        <div className="field">
          <label>Target annual spending (income you want to live on)</label>
          <input value={form.targetIncome} onChange={(e)=>setForm({...form, targetIncome:e.target.value})} placeholder="e.g., 65000" inputMode="numeric" />
        </div>

        <div className="field">
          <label>Estimated Age Pension (annual) (optional)</label>
          <input value={form.agePension} onChange={(e)=>setForm({...form, agePension:e.target.value})} placeholder="e.g., 28000" inputMode="numeric" />
        </div>

        <div className="field">
          <label>Other income (annual) (optional)</label>
          <input value={form.otherIncome} onChange={(e)=>setForm({...form, otherIncome:e.target.value})} placeholder="e.g., 5000" inputMode="numeric" />
        </div>

        <div className="notice">
          This is general guidance only. It’s not telling you what to do. It’s showing the trade-offs.
        </div>
      </div>

      <div className="col-6 card">
        <h3 style={{marginTop:0}}>Results</h3>
        {!result.ok && (
          <p className="muted">Enter age, balance, and target income to see results.</p>
        )}

        {result.ok && (
          <>
            <div className="kpi">
              <div>
                <div className="label">Income gap (after Age Pension & other income)</div>
                <div className="value">{fmtCurrency(result.gap)}</div>
                <div className="sub">This is what super needs to cover (in a simple world).</div>
              </div>
              <div className="tag">{result.minRow?.label} min drawdown: {fmtPct(result.minRow?.factor)}</div>
            </div>

            <div className="hr" />

            <p className="muted">
              A simple set of “lanes”:
            </p>

            <ul className="list">
              <li><strong>Lane A — Minimum required:</strong> {fmtCurrency(result.minAnnual)} per year (regulatory minimum).</li>
              <li><strong>Lane B — Needs-based:</strong> {fmtCurrency(result.suggestedAnnual)} per year ({fmtPct(result.suggestedPct)} of balance).</li>
              <li><strong>Lane C — Buffer:</strong> {fmtCurrency(result.bufferAnnual)} per year ({fmtPct(result.bufferPct)} of balance).</li>
            </ul>

            <div className="notice" style={{marginTop:12}}>
              If Lane B is **well above** the minimum, it’s a signal to test sustainability (and/or refine your targets).
              If Lane B is **below** the minimum, it’s a signal the minimum rules may force extra withdrawals.
            </div>

            <div className="hr" />

            <h4>Minimum drawdown table (standard factors)</h4>
            <div className="grid">
              {MIN_DRAWDOWN_FACTORS.map(r => (
                <div className="col-4" key={r.label}>
                  <div className="kpi">
                    <div>
                      <div className="label">{r.label}</div>
                      <div className="value">{(r.factor*100).toFixed(0)}%</div>
                      <div className="sub">of 1 July balance</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
