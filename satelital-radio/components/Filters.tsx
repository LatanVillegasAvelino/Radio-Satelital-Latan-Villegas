"use client"
import React, { useState } from 'react'
import useStations from '../hooks/useStations'

export default function Filters(){
  const { setQuery, filters, toggleOnlyFavs } = useStations()
  const [q, setQ] = useState('')

  return (
    <div className="filters-row">
      <input placeholder="Buscar emisora" value={q} onChange={(e)=>{setQ(e.target.value); setQuery(e.target.value)}} />
      <select onChange={(e)=>filters.setCountry(e.target.value)}>
        <option value="">Todos los países</option>
        {filters.countries.map(c=> <option key={c} value={c}>{c}</option>)}
      </select>
      <select onChange={(e)=>filters.setRegion(e.target.value)}>
        <option value="">Todas las regiones</option>
        {filters.regions.map(r=> <option key={r} value={r}>{r}</option>)}
      </select>
      <label style={{display:'flex',alignItems:'center',gap:6}}>
        <input type="checkbox" onChange={(e)=>toggleOnlyFavs(e.target.checked)} /> Favoritos
      </label>
    </div>
  )
}
