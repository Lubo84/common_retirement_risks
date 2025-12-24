import React, { useMemo, useState } from 'react'
import { replyTo } from '../lib/rulesChat.js'

export default function CuratedChat({ context }){
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState([
    { role:'assistant', content: "I’m your Risk Radar sidekick. Ask me about your risks, what they mean, or what to do next." }
  ])

  const canSend = input.trim().length > 0

  function send(){
    const text = input.trim()
    if (!text) return
    const next = [...messages, { role:'user', content:text }]
    const answer = replyTo(text, context)
    setMessages([...next, { role:'assistant', content:answer }])
    setInput('')
  }

  return (
    <div className="card">
      <h3 style={{marginTop:0}}>Ask AI (curated)</h3>
      <p className="muted" style={{marginTop:0}}>
        This chat is deliberately constrained to retirement risk education and next steps.
      </p>

      <div className="chatlog" role="log" aria-label="chat log">
        {messages.map((m, idx) => (
          <div key={idx} className={'msg ' + (m.role === 'user' ? 'user' : 'assistant')}>
            {m.content}
          </div>
        ))}
      </div>

      <div className="field">
        <label>Your question</label>
        <textarea value={input} onChange={(e)=>setInput(e.target.value)} placeholder="e.g., Explain sequencing risk like I’m busy and tired." />
      </div>
      <div className="btnrow">
        <button className="btn primary" onClick={send} disabled={!canSend}>Send</button>
        <button className="btn" onClick={()=>setMessages([{role:'assistant', content:"Fresh start. What risk are you thinking about?"}])}>Reset</button>
      </div>

      <p className="small muted" style={{marginTop:12}}>
        If you later want an LLM-backed version, keep the same guardrails and run it via a server-side proxy (don’t ship API keys to browsers).
      </p>
    </div>
  )
}
