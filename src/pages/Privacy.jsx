import React from 'react'

export default function Privacy(){
  return (
    <div className="card">
      <h2 style={{marginTop:0}}>Privacy & data</h2>
      <p className="muted">
        This GitHub Pages build stores your progress <strong>only in your browser</strong> using localStorage.
        Nothing is sent to a server unless you later add one.
      </p>
      <div className="notice">
        Tip: If you’re demoing this internally, you can export the JSON and share it with a colleague
        (or your future self) without building any backend.
      </div>
      <div className="hr" />
      <p className="small muted">
        If you plan to collect data, make sure you have a proper privacy policy, consent flow,
        and secure storage—especially for anything that could be personal information.
      </p>
    </div>
  )
}
