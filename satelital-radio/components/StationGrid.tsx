"use client"
import React from 'react'
import StationCard from './StationCard'
import type { Station } from '../types/station'

type Props = {
  stations: Station[]
  playStation: (station: Station) => void
  toggleFavorite: (station: Station) => void
}

export default function StationGrid({ stations, playStation, toggleFavorite }: Props){
  return (
    <div className="glass-panel rounded-xl shadow-sm hover:shadow-md transition-all duration-200" id="station-list">
      <div className="panel-head station-panel-head">
        <h3>Frecuencias</h3>
      </div>
      <div className="station-grid">
        {stations.map(s=> (
          <StationCard key={`${s.name}-${s.url}`} station={s} onPlay={playStation} onToggleFav={toggleFavorite} />
        ))}
      </div>
    </div>
  )
}
