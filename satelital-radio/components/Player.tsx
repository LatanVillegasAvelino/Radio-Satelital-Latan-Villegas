"use client"
import React, { useEffect, useState } from 'react'
import usePlayer from '../hooks/usePlayer'
import type { Station } from '../types/station'
import { Pause, Play, SkipBack, SkipForward, Volume2 } from 'lucide-react'

type Props = {
  currentStation: Station | null
  onNextStation: () => void
  onPrevStation: () => void
}

export default function Player({ currentStation, onNextStation, onPrevStation }: Props){
  const { isPlaying, togglePlay, secondsElapsed } = usePlayer()
  const [volume, setVolume] = useState(0.8)

  useEffect(() => {
    const audio = document.getElementById('radioPlayer') as HTMLAudioElement | null
    if (!audio) return

    audio.volume = volume

    const handleError = (e: Event) => {
      console.error('[Player UI] Error de audio:', (e.target as HTMLAudioElement)?.error?.message)
    }

    const handleLoadstart = () => {
      console.log('[Player UI] Iniciando carga de stream...')
    }

    audio.addEventListener('error', handleError)
    audio.addEventListener('loadstart', handleLoadstart)

    return () => {
      audio.removeEventListener('error', handleError)
      audio.removeEventListener('loadstart', handleLoadstart)
    }
  }, [volume])

  const handleVolumeChange = (value: number) => {
    const audio = document.getElementById('radioPlayer') as HTMLAudioElement | null
    if (audio) {
      audio.volume = value
    }
    setVolume(value)
  }

  return (
    <div className="player-section glass-panel rounded-xl shadow-sm hover:shadow-md transition-all duration-200" id="player-section">
      <div className="player-waves-container parallax">
        <svg className="waves" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M0,30 C300,90 900,0 1200,30 L1200,120 L0,120 Z" fill="var(--accent)" />
        </svg>
      </div>

      <div className="player-info">
        <span className={`status-indicator ${isPlaying ? 'live' : ''}`}>
          {isPlaying ? 'EN VIVO' : 'LISTO'}
        </span>
        <h2 className="track-title">{currentStation?.name || 'Radio Satelital'}</h2>
        <div className="track-meta">{currentStation?.country || 'Selecciona una emisora'} • {currentStation?.region || '—'}</div>
      </div>

      <div className="now-playing-container">
        <p className="track-artist">{currentStation?.name || 'Sin reproducción'}</p>
      </div>

      <div className="custom-controls">
        <div className={`timer-text ${isPlaying ? 'live' : ''}`}>{new Date(secondsElapsed * 1000).toISOString().substring(14, 19)}</div>
        <div className="control-group">
          <button className="sec-btn" onClick={onPrevStation} aria-label="Anterior">
            <SkipBack size={20} strokeWidth={2.2} />
          </button>
          <button className="play-btn" onClick={togglePlay} aria-pressed={isPlaying} id="playBtn" aria-label={isPlaying ? 'Pausar' : 'Reproducir'}>
            {isPlaying ? <Pause size={30} strokeWidth={2.4} /> : <Play size={30} strokeWidth={2.4} />}
          </button>
          <button className="sec-btn" onClick={onNextStation} aria-label="Siguiente">
            <SkipForward size={20} strokeWidth={2.2} />
          </button>
        </div>
        <div className="volume-control">
          <Volume2 size={18} strokeWidth={2.1} className="volume-icon" aria-hidden="true" />
          <input
            className="volume-slider"
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={(event) => handleVolumeChange(Number(event.target.value))}
            aria-label="Volumen"
          />
        </div>
      </div>

      <audio 
        id="radioPlayer" 
        crossOrigin="anonymous"
        preload="none"
      />
    </div>
  )
}
