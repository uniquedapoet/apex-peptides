// Automatic cart-total tiers — applied at checkout without a code
export const AUTO_TIERS = [
  { threshold: 500, percent: 15, label: '15% off orders $500+' },
  { threshold: 300, percent: 10, label: '10% off orders $300+' },
  { threshold: 150, percent: 5,  label: '5% off orders $150+' },
]

// Returns the best automatic tier for a given subtotal
export function getAutoDiscount(subtotal) {
  return AUTO_TIERS.find((t) => subtotal >= t.threshold) || null
}

// Static promo codes (backend validates in production; used for demo mode)
export const PROMO_CODES = {
  APEX10:    { percent: 10, description: 'Welcome discount — email subscribers' },
  APEX15:    { percent: 15, description: 'VIP promo code' },
  RESEARCH5: { percent: 5,  description: 'Research community code' },
}

export function validatePromoCode(code) {
  return PROMO_CODES[code.toUpperCase()] || null
}

// Returns the better of auto-tier vs. promo code (they don't stack)
export function getBestDiscount(subtotal, promoCode = '') {
  const auto  = getAutoDiscount(subtotal)
  const promo = promoCode ? validatePromoCode(promoCode) : null

  const autoPercent  = auto  ? auto.percent  : 0
  const promoPercent = promo ? promo.percent : 0

  if (autoPercent === 0 && promoPercent === 0) return null

  if (autoPercent >= promoPercent) {
    return { percent: autoPercent, source: 'auto', label: auto.label }
  }
  return { percent: promoPercent, source: 'promo', label: `Code ${promoCode.toUpperCase()} — ${promo.description}` }
}
