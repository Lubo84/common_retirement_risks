import React from 'react'

export default function Footer(){
  return (
    <div className="footer">
      <div className="hr" />
      <p>
        <strong>General information only.</strong> This tool doesn’t consider your objectives, financial situation or needs.
        It isn’t personal advice. Consider your circumstances and seek advice if needed.
      </p>
      <p className="small">
        Data is stored in your browser (localStorage) unless you export it. No server is provided in this GitHub Pages build.
      </p>
    </div>
  )
}
