const THEME_KEY = 'ultra_theme'

export function setTheme(name:string){
  try{
    document.documentElement.setAttribute('data-theme', name)
    localStorage.setItem(THEME_KEY, name)
    const meta = document.querySelector('meta[name="theme-color"]')
    if(meta) meta.setAttribute('content', getThemeColor(name))
  }catch(e){}
}

export function getTheme(){
  try{
    return localStorage.getItem(THEME_KEY) || 'amoled'
  }catch(e){return 'amoled'}
}

function getThemeColor(name:string){
  // simple mapping
  switch(name){
    case 'white': return '#ffffff'
    case 'gold': return '#d4af37'
    default: return '#05070a'
  }
}
