import type { Station } from '../types/station'
import defaultStationsData from '../data/stations.json'
export { loadGlobalStations, persistGlobalStation } from './supabase'

export const defaultStations = defaultStationsData as Station[]

export function mergeStationSources(defaultStations:Station[], globalStations:Station[], customStations:Station[]){
  const map = new Map<string, Station>()
  const keyFor = (s:Station)=>`${s.name}|${s.url}`
  ;[...defaultStations, ...globalStations, ...customStations].forEach(s=>{
    const k = keyFor(s)
    if(!map.has(k)) map.set(k,s)
  })
  return Array.from(map.values())
}
