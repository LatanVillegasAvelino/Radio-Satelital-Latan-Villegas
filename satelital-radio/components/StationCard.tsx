"use client"
import React from 'react'
import { Station } from '../types/station'

const countryClassMap: Record<string, string> = {
  'perú': 'badge-peru',
  'venezuela': 'badge-venezuela',
  'argentina': 'badge-argentina',
  'chile': 'badge-chile',
  'colombia': 'badge-colombia',
  'méxico': 'badge-mexico',
  'mexico': 'badge-mexico',
  'españa': 'badge-espana',
  'francia': 'badge-francia',
  'alemania': 'badge-alemania',
  'ecuador': 'badge-ecuador',
  'bolivia': 'badge-bolivia',
  'honduras': 'badge-honduras',
  'nicaragua': 'badge-nicaragua',
  'puerto rico': 'badge-puerto-rico',
  'ee.uu': 'badge-eeuu',
  'eeuu': 'badge-eeuu',
  'usa': 'badge-eeuu'
}

type Props = {
  station: Station
  onPlay?: (s: Station)=>void
  onToggleFav?: (s: Station)=>void
}

export default function StationCard({ station, onPlay, onToggleFav }: Props){
  const badgeClass = countryClassMap[(station.country || '').toLowerCase()] || 'badge-default'

  return (
    <div className="station-card">
      <div className="st-info">
        <div className={`st-icon ${badgeClass}`}>
          <div className={`flag-badge ${badgeClass}`} />
        </div>
        <div>
          <span className="st-name">{station.name}</span>
          <span className="st-meta">{station.region || station.country}</span>
        </div>
      </div>
      <div style={{display:'flex',alignItems:'center',gap:8}}>
        <button className="sec-btn" onClick={()=>onPlay?.(station)} aria-label="Reproducir">▶</button>
        <button className="fav-btn" onClick={()=>onToggleFav?.(station)} aria-label="Favorito">★</button>
      </div>
    </div>
  )
}
