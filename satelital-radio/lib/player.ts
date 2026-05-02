import type { Station } from '../types/station'

const AUDIO_ID = 'radioPlayer'

export function getAudio(){
  const el = typeof window !== 'undefined' ? document.getElementById(AUDIO_ID) as HTMLAudioElement | null : null
  return el
}

export function playStation(s: Station){
  const audio = getAudio()
  if(!audio) return
  audio.src = s.url
  audio.play().catch(()=>{})
}

export function togglePlay(){
  const audio = getAudio()
  if(!audio) return
  if(audio.paused) audio.play().catch(()=>{})
  else audio.pause()
}

export function skipStation(nextUrl: string){
  const audio = getAudio()
  if(!audio) return
  audio.src = nextUrl
  audio.play().catch(()=>{})
}

export function setPlayingState(state:boolean){
  const audio = getAudio()
  if(!audio) return
  if(state) audio.play().catch(()=>{})
  else audio.pause()
}
