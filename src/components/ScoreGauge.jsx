import React from 'react'

export default function ScoreGauge({ score=0 }){
  const pct = Math.max(0, Math.min(100, Number(score)||0))
  const deg = (pct/100)*180
  return (
    <div className="card">
      <div className="kpi">
        <div>
          <div className="label">Retirement Readiness Score</div>
          <div className="value">{pct}</div>
          <div className="sub">A simple signal (not a verdict).</div>
        </div>
        <div style={{width:120, height:70, position:'relative'}} aria-label="gauge">
          <div style={{position:'absolute', left:0, right:0, bottom:0, height:60, borderRadius: 999, border:'1px solid rgba(255,255,255,0.12)', background:'rgba(255,255,255,0.04)'}} />
          <div style={{
            position:'absolute', left:'50%', bottom:10,
            width:2, height:52,
            background:'rgba(255,208,0,0.85)',
            transformOrigin:'bottom',
            transform:`translateX(-50%) rotate(${deg-90}deg)`
          }} />
          <div style={{position:'absolute', left:'50%', bottom:8, width:14, height:14, borderRadius:999, transform:'translateX(-50%)', background:'rgba(255,208,0,0.85)'}} />
        </div>
      </div>
    </div>
  )
}
