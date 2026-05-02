"use client"
import React from 'react'
import StationCard from './StationCard'
import Filters from './Filters'
import useStations from '../hooks/useStations'

export default function StationGrid(){
  const { stations, playStation, toggleFavorite } = useStations()

  return (
    <div>
      <Filters />
      <div className="stations-grid">
        {stations.map(s=> (
          <StationCard key={`${s.name}-${s.url}`} station={s} onPlay={playStation} onToggleFav={toggleFavorite} />
        ))}
      </div>
    </div>
  )
}
