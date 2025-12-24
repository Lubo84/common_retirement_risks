import React from 'react'
import { NavLink } from 'react-router-dom'

export default function TopBar(){
  return (
    <div className="topbar">
      <div className="brand">
        <div className="logo" aria-label="logo">
          <svg viewBox="0 0 100 100" role="img" aria-hidden="true">
            <path d="M20 58 L50 20 L80 58 L50 80 Z" fill="#FFD000"/>
          </svg>
        </div>
        <div>
          <h1>Retirement Toolkit</h1>
          <p>Snapshot • Risk Radar • Drawdown Guide</p>
        </div>
      </div>

      <nav className="nav" aria-label="primary navigation">
        <NavLink to="/" end className={({isActive}) => isActive ? 'active' : ''}>Home</NavLink>
        <NavLink to="/snapshot" className={({isActive}) => isActive ? 'active' : ''}>Snapshot</NavLink>
        <NavLink to="/risk-radar" className={({isActive}) => isActive ? 'active' : ''}>Risk Radar</NavLink>
        <NavLink to="/drawdown" className={({isActive}) => isActive ? 'active' : ''}>Drawdown</NavLink>
        <NavLink to="/privacy" className={({isActive}) => isActive ? 'active' : ''}>Privacy</NavLink>
      </nav>
    </div>
  )
}
