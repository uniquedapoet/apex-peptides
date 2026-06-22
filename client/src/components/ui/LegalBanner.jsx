import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ShieldCheck, X } from 'lucide-react'

const STORAGE_KEY = 'apex_legal_accepted'

export default function LegalBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (!localStorage.getItem(STORAGE_KEY)) setVisible(true)
  }, [])

  function accept() {
    localStorage.setItem(STORAGE_KEY, 'true')
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div className="fixed inset-0 z-[9999] flex items-end sm:items-center justify-center p-4 bg-apex-black/70 backdrop-blur-sm">
      <div className="bg-white w-full max-w-lg border-t-4 border-gold shadow-2xl p-8">
        <div className="flex items-start gap-4 mb-5">
          <ShieldCheck className="text-gold shrink-0 mt-0.5" size={28} />
          <div>
            <h2 className="font-accent font-bold text-xl text-apex-dark mb-1 tracking-wide">
              Research Purposes Only
            </h2>
            <p className="text-apex-gray text-sm font-body leading-relaxed">
              APEX PEPTIDES sells research-grade peptides exclusively for{' '}
              <strong>laboratory and scientific research use</strong>. These products are{' '}
              <strong>not intended for human consumption</strong>, medical treatment, or
              veterinary use. By entering this site you confirm:
            </p>
          </div>
        </div>

        <ul className="space-y-2 mb-6 text-sm text-apex-gray font-body">
          {[
            'You are 18 years of age or older.',
            'You are a qualified researcher or are purchasing for research purposes.',
            'You understand these products are not for human use.',
            'You accept our Terms of Service and Research Disclaimer.',
          ].map((item) => (
            <li key={item} className="flex items-start gap-2">
              <span className="text-gold font-bold mt-0.5">✓</span>
              {item}
            </li>
          ))}
        </ul>

        <div className="flex flex-col sm:flex-row gap-3">
          <button onClick={accept} className="btn-gold flex-1 text-center">
            I Agree — Enter Site
          </button>
          <a
            href="https://www.google.com"
            className="btn-outline-gold flex-1 text-center text-xs"
          >
            Exit
          </a>
        </div>

        <p className="text-center text-xs text-apex-muted mt-4 font-body">
          <Link to="/disclaimer" className="underline hover:text-gold" onClick={accept}>
            View full research disclaimer
          </Link>
        </p>
      </div>
    </div>
  )
}
