import React from 'react'
import { Link } from 'react-router-dom'

export default function Home(){
  return (
    <div className="grid">
      <div className="col-12 card hero">
        <h2>Make retirement less mysterious… and more “sorted.”</h2>
        <p>
          Three quick tools to help members take small, high-impact steps:
          a 3–4 minute snapshot quiz, a risk explainer that stays in plain English, and a drawdown guide for pension payments.
        </p>
        <div className="pillrow">
          <span className="pill"><strong>Snapshot</strong> personalised next steps</span>
          <span className="pill"><strong>Risk Radar</strong> top risks + guidance</span>
          <span className="pill"><strong>Drawdown</strong> pick a payment</span>
        </div>
        <div className="btnrow">
          <Link to="/snapshot" className="btn primary">Start: Retirement Snapshot</Link>
          <Link to="/risk-radar" className="btn">Open: Risk Radar</Link>
          <Link to="/drawdown" className="btn">Open: Drawdown Guide</Link>
        </div>
      </div>

      <div className="col-6 card">
        <h3 style={{marginTop:0}}>What this is</h3>
        <ul className="list">
          <li>A static web app suitable for GitHub Pages.</li>
          <li>Designed for disengaged-to-mid engaged members: simple, clear, confidence‑building.</li>
          <li>Uses gentle “next best action” nudges (not heavy modelling).</li>
        </ul>
      </div>

      <div className="col-6 card">
        <h3 style={{marginTop:0}}>What this is not</h3>
        <ul className="list">
          <li>Not personal advice. No individual recommendations.</li>
          <li>Not a full retirement calculator (it can link out to one).</li>
          <li>Not collecting data on a server by default (browser storage only).</li>
        </ul>
      </div>

      <div className="col-12 card">
        <h3 style={{marginTop:0}}>The 5 Fundamentals (RPM)</h3>
        <p className="muted" style={{marginTop:0}}>
          The tools follow a simple flow: vision → number → on track → revisit → income options.
        </p>
        <ol className="list">
          <li><strong>Set Your Vision</strong> — your “north star”.</li>
          <li><strong>Know Your Number</strong> — income needs, anchored by Modest/Comfortable.</li>
          <li><strong>Check if You’re on Track</strong> — projections, buffers, adjustments.</li>
          <li><strong>Review and Revisit</strong> — annually or after life changes.</li>
          <li><strong>Understand Your Retirement Income Options</strong> — super + Age Pension + other.</li>
        </ol>
      </div>
    </div>
  )
}
