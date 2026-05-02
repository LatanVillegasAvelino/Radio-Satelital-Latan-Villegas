"use client"
import React from 'react'
import { Station } from '../types/station'

type Props = {
  station: Station
  onPlay?: (s: Station)=>void
  onToggleFav?: (s: Station)=>void
}

export default function StationCard({ station, onPlay, onToggleFav }: Props){
  const badgeClass = `badge-${(station.country||'').toLowerCase()}`

  return (
    <div className="station-card">
      <div className="station-icon">
        <img src={station.icon||'/favicon.png'} alt="" style={{width:40,height:40,borderRadius:'50%'}} />
        <div className={`flag-badge ${badgeClass}`} />
      </div>
      <div style={{flex:1}}>
        <div style={{fontWeight:700}}>{station.name}</div>
        <div style={{fontSize:12,opacity:0.8}}>{station.region||station.country}</div>
      </div>
      <div style={{display:'flex',flexDirection:'column',gap:6}}>
        <button className="sec-btn" onClick={()=>onPlay?.(station)}>▶</button>
        <button className="fav-btn" onClick={()=>onToggleFav?.(station)} aria-label="Favorito">★</button>
      </div>
    </div>
  )
}
