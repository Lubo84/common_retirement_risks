import React, { useEffect, useMemo, useState } from 'react'
import { HashRouter, Routes, Route } from 'react-router-dom'
import TopBar from './components/TopBar.jsx'
import Footer from './components/Footer.jsx'
import Home from './pages/Home.jsx'
import Snapshot from './pages/Snapshot.jsx'
import RiskRadar from './pages/RiskRadar.jsx'
import Drawdown from './pages/Drawdown.jsx'
import Privacy from './pages/Privacy.jsx'
import { loadState, saveState, clearState } from './lib/storage.js'

export default function App(){
  const [state, setState] = useState(() => loadState() || { snapshot:null, riskRadar:null, drawdown:null })

  useEffect(() => {
    saveState(state)
  }, [state])

  return (
    <HashRouter>
      <div className="container">
        <TopBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/snapshot" element={<Snapshot state={state} setState={setState} />} />
          <Route path="/risk-radar" element={<RiskRadar state={state} setState={setState} />} />
          <Route path="/drawdown" element={<Drawdown state={state} setState={setState} />} />
          <Route path="/privacy" element={<Privacy />} />
        </Routes>

        <div className="btnrow" style={{marginTop:16}}>
          <button className="btn danger" onClick={()=>{ clearState(); setState({ snapshot:null, riskRadar:null, drawdown:null }); }}>
            Clear saved data
          </button>
        </div>

        <Footer />
      </div>
    </HashRouter>
  )
}
