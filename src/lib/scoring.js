export function clamp(n, lo, hi){ return Math.min(hi, Math.max(lo, n)) }

// Simple readiness score (0–100). It's intentionally lightweight and explainable.
// It rewards: clarity on goals, knowing costs, being within ~10 years, and having checked risks/actions.
export function computeReadinessScore(snapshot){
  if (!snapshot) return { score: 0, reasons: ['No snapshot yet.'] }

  let score = 35
  const reasons = []

  if (snapshot.vision && snapshot.vision.trim().length >= 12){ score += 12; reasons.push('You described your retirement vision.') }
  else reasons.push('Your retirement vision is still fuzzy (that’s normal).')

  if (snapshot.costBand){ score += 10; reasons.push('You picked a cost-of-living anchor (Modest/Comfortable/Custom).') }
  else reasons.push('You haven’t picked a cost-of-living anchor yet.')

  if (snapshot.checkedOnTrack === 'yes'){ score += 14; reasons.push('You’ve checked whether you’re on track (gold star).') }
  else reasons.push('You haven’t checked if you’re on track yet.')

  if (snapshot.risksSelected?.length >= 2){ score += 8; reasons.push('You’ve identified your top risks.') }
  else reasons.push('You haven’t identified your top risks yet.')

  if (snapshot.ageBand){
    const near = ['60-64','65-69','70+'].includes(snapshot.ageBand)
    if (near){ score += 8; reasons.push('You’re close enough to retirement for details to matter (good time to plan).') }
    else { score += 4; reasons.push('You’ve got time on your side—small actions compound.') }
  }

  score = clamp(score, 0, 100)
  return { score, reasons }
}
