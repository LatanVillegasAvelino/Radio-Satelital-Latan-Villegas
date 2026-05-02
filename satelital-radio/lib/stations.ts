import type { Station } from '../types/station'

export function mergeStationSources(defaultStations:Station[], globalStations:Station[], customStations:Station[]){
  const map = new Map<string, Station>()
  const keyFor = (s:Station)=>`${s.name}|${s.url}`
  ;[...defaultStations, ...globalStations, ...customStations].forEach(s=>{
    const k = keyFor(s)
    if(!map.has(k)) map.set(k,s)
  })
  return Array.from(map.values())
}

export async function loadGlobalStations(){
  try{
    if(typeof window === 'undefined') return []
    const cfg = (window as any).SUPABASE_CONFIG
    if(!cfg) return []
    // placeholder: should call supabase REST endpoint
    return [] as Station[]
  }catch(e){return []}
}

export async function persistGlobalStation(station:Station){
  try{
    const cfg = (window as any).SUPABASE_CONFIG
    if(!cfg) return false
    // placeholder: persist via supabase client if available
    return true
  }catch(e){return false}
}
