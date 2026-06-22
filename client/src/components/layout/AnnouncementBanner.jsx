import { useState, useEffect } from 'react'
import { X } from 'lucide-react'

const MESSAGES = [
  'FREE SHIPPING ON ALL ORDERS OVER $150',
  'NEW ARRIVAL — TIRZEPATIDE NOW IN STOCK',
  'SUBSCRIBE & GET 10% OFF YOUR FIRST ORDER',
  'SPEND $300+ FOR AN AUTOMATIC 10% DISCOUNT AT CHECKOUT',
]

export default function AnnouncementBanner() {
  const [visible, setVisible] = useState(true)
  const [index, setIndex]     = useState(0)

  useEffect(() => {
    if (!visible) return
    const id = setInterval(() => setIndex((i) => (i + 1) % MESSAGES.length), 4000)
    return () => clearInterval(id)
  }, [visible])

  if (!visible) return null

  return (
    <div className="bg-apex-dark text-white text-xs font-accent font-semibold tracking-widest py-2.5 px-4 flex items-center justify-between">
      <span />
      <span className="flex-1 text-center transition-all duration-500">
        <span className="text-gold-400">✦</span>{' '}
        {MESSAGES[index]}{' '}
        <span className="text-gold-400">✦</span>
      </span>
      <button
        onClick={() => setVisible(false)}
        className="text-white/60 hover:text-white transition-colors"
        aria-label="Dismiss announcement"
      >
        <X size={14} />
      </button>
    </div>
  )
}
