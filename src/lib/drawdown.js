// Minimum pension payment factors (standard SIS Regs Schedule 7).
// NOTE: There was a temporary 50% reduction for several years during COVID; many funds note it ended 30 June 2023.
// This app uses the standard factors by default.
export const MIN_DRAWDOWN_FACTORS = [
  { label: 'Under 65', minAge: 0, maxAge: 64, factor: 0.04 },
  { label: '65–74',    minAge: 65, maxAge: 74, factor: 0.05 },
  { label: '75–79',    minAge: 75, maxAge: 79, factor: 0.06 },
  { label: '80–84',    minAge: 80, maxAge: 84, factor: 0.07 },
  { label: '85–89',    minAge: 85, maxAge: 89, factor: 0.09 },
  { label: '90–94',    minAge: 90, maxAge: 94, factor: 0.11 },
  { label: '95+',      minAge: 95, maxAge: 200, factor: 0.14 },
]

export function getMinFactor(age){
  const a = Number(age)
  if (!Number.isFinite(a) || a < 0) return null
  return MIN_DRAWDOWN_FACTORS.find(r => a >= r.minAge && a <= r.maxAge) || null
}

export function fmtCurrency(n){
  const x = Number(n)
  if (!Number.isFinite(x)) return ''
  return x.toLocaleString('en-AU', { style: 'currency', currency: 'AUD', maximumFractionDigits: 0 })
}

export function fmtPct(n){
  const x = Number(n)
  if (!Number.isFinite(x)) return ''
  return (x*100).toFixed(1) + '%'
}

export function safeNum(x){
  const n = Number(String(x).replace(/,/g,''))
  return Number.isFinite(n) ? n : null
}

export function calcDrawdown({ balance, age, targetIncome, agePension, otherIncome }){
  const b = safeNum(balance)
  const a = safeNum(age)
  const t = safeNum(targetIncome)
  const ap = safeNum(agePension) ?? 0
  const oi = safeNum(otherIncome) ?? 0
  if (b == null || a == null || t == null) return { ok:false, reason:'Missing required inputs.' }

  const minRow = getMinFactor(a)
  const minAnnual = minRow ? b * minRow.factor : null

  const gap = Math.max(0, t - ap - oi)
  const suggested = Math.min(b, gap) // can't draw more than balance in year (simple guard)
  const suggestedPct = suggested / b

  // Heuristic "lanes" – not advice; just a nudge:
  // Lane A: Minimum required (regulatory)
  // Lane B: "Needs-based" (income gap)
  // Lane C: "Buffer" (gap + 10%)
  const buffer = Math.min(b, gap * 1.10)
  return {
    ok: true,
    inputs: { balance:b, age:a, targetIncome:t, agePension:ap, otherIncome:oi },
    minRow,
    minAnnual,
    gap,
    suggestedAnnual: suggested,
    suggestedPct,
    bufferAnnual: buffer,
    bufferPct: buffer / b,
  }
}
