const KEY = 'rtk_state_v1'

export function loadState(){
  try{
    const raw = localStorage.getItem(KEY)
    return raw ? JSON.parse(raw) : null
  }catch{
    return null
  }
}

export function saveState(state){
  try{
    localStorage.setItem(KEY, JSON.stringify(state))
  }catch{
    // ignore
  }
}

export function clearState(){
  try{ localStorage.removeItem(KEY) }catch{}
}

export function downloadJson(filename, data){
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  a.click()
  URL.revokeObjectURL(url)
}
