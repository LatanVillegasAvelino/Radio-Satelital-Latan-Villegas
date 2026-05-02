"use client"
import React, { useEffect, useRef, useState } from 'react'
import usePlayer from '../hooks/usePlayer'

export default function Player(){
  const { currentStation, isPlaying, playStation, togglePlay, secondsElapsed } = usePlayer()

  return (
    <div className="player">
      <div className="parallax">
        <svg className="waves" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M0,30 C300,90 900,0 1200,30 L1200,120 L0,120 Z" fill="var(--accent)" />
        </svg>
      </div>

      <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginTop:12}}>
        <div>
          <div style={{fontWeight:700,fontSize:18}}>{currentStation?.name||'Radio Satelital'}</div>
          <div style={{fontSize:12,opacity:0.8}}>{currentStation?.country||'—' } • {new Date(secondsElapsed*1000).toISOString().substr(14,5)}</div>
        </div>
        <div>
          <button className="sec-btn" onClick={()=>{ /* prev */ }} aria-label="Anterior">⏮</button>
          <button className="play-btn" onClick={togglePlay} aria-pressed={isPlaying} id="playBtn">{isPlaying? '⏸':'▶'}</button>
          <button className="sec-btn" onClick={()=>{ /* next */ }} aria-label="Siguiente">⏭</button>
        </div>
      </div>

      <audio id="radioPlayer" crossOrigin="anonymous" />
    </div>
  )
}
