"use client"
import React from 'react'
import { setTheme } from '../lib/theme'
import Filters from './Filters'

type Props = {
  open: boolean
  onClose: () => void
  loading: boolean
  error: string | null
  stationsCount: number
  setQuery: (value: string) => void
  filters: {
    countries: string[]
    regions: string[]
    setCountry: (value: string) => void
    setRegion: (value: string) => void
  }
  toggleOnlyFavs: (value: boolean) => void
  onResetFilters: () => void
}

export default function SideMenu({ open, onClose, loading, error, stationsCount, setQuery, filters, toggleOnlyFavs, onResetFilters }: Props){
  const themes = ['amoled','gold','purple','white','wear-ocean','wear-sunset','wear-galaxy','wear-mint','wear-cherry']

  return (
    <div className={`side-menu ${open ? 'open' : ''}`} aria-hidden={!open}>
      <div className="side-menu-content" style={{padding:16}}>
        <button onClick={onClose}>Cerrar</button>

        <h3 style={{ marginTop: 16 }}>Panel rápido</h3>
        <div className="glass-panel mini-form" style={{ marginBottom: 12 }}>
          {loading ? (
            <p className="track-meta">Cargando emisoras...</p>
          ) : error ? (
            <p className="track-meta" style={{ color: '#ff6b6b' }}>{error}</p>
          ) : (
            <p className="track-meta">{stationsCount} emisoras disponibles</p>
          )}
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            <button className="btn-text" id="btnInstall">INSTALAR APP</button>
            <button className="btn-text" id="clearFilters" onClick={onResetFilters}>RESET</button>
          </div>
        </div>

        <Filters setQuery={setQuery} filters={filters} toggleOnlyFavs={toggleOnlyFavs} />

        <h3>Tema</h3>
        <div style={{display:'flex',flexWrap:'wrap',gap:8}}>
          {themes.map(t=> (
            <button key={t} className="sec-btn" onClick={()=>{setTheme(t)}}>{t}</button>
          ))}
        </div>

        <h3 style={{marginTop:16}}>Redes</h3>
        <div style={{display:'flex',flexDirection:'column',gap:8}}>
          <a href="https://twitter.com">Twitter</a>
          <a href="https://github.com">GitHub</a>
        </div>
      </div>
    </div>
  )
}
