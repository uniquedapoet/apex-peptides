import { useState } from 'react'
import { Mail, Clock, MapPin, Send } from 'lucide-react'

const INFO = [
  {
    Icon: Mail,
    label: 'Email',
    value: 'orders@apexpeptides.com',
    sub: 'We respond within 24 hours',
  },
  {
    Icon: Clock,
    label: 'Business Hours',
    value: 'Mon–Fri, 9AM–6PM EST',
    sub: 'Excluding US federal holidays',
  },
  {
    Icon: MapPin,
    label: 'Fulfillment',
    value: 'United States',
    sub: 'Domestic shipping only',
  },
]

export default function Contact() {
  const [form, setForm]       = useState({ name: '', email: '', subject: '', message: '' })
  const [status, setStatus]   = useState('idle')

  function handleChange(e) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setStatus('loading')

    const DEMO = import.meta.env.VITE_DEMO_MODE === 'true' || !import.meta.env.VITE_API_URL
    if (DEMO) {
      await new Promise((r) => setTimeout(r, 800))
      setStatus('success')
      setForm({ name: '', email: '', subject: '', message: '' })
      return
    }

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      setStatus(res.ok ? 'success' : 'error')
      if (res.ok) setForm({ name: '', email: '', subject: '', message: '' })
    } catch {
      setStatus('error')
    }
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-apex-dark py-20 px-4 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-1/3 w-px h-full bg-gold" />
          <div className="absolute top-0 right-1/3 w-px h-full bg-gold" />
        </div>
        <span className="font-accent text-xs font-semibold tracking-[0.4em] uppercase text-gold">
          Get in Touch
        </span>
        <h1 className="font-display text-5xl md:text-7xl text-white tracking-widest mt-2">
          CONTACT
        </h1>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-14">

          {/* Info sidebar */}
          <div>
            <span className="font-accent text-xs font-semibold tracking-[0.4em] uppercase text-gold">
              Reach Us
            </span>
            <h2 className="section-title text-3xl mt-2 mb-2">We're Here<br />to Help</h2>
            <div className="gold-divider mb-8" />
            <p className="text-apex-gray font-body text-sm leading-relaxed mb-8">
              Questions about an order, a product, or peptide research? Our team replies within one business day.
            </p>
            <div className="space-y-6">
              {INFO.map(({ Icon, label, value, sub }) => (
                <div key={label} className="flex gap-4">
                  <div className="w-10 h-10 border border-gold/30 flex items-center justify-center text-gold shrink-0">
                    <Icon size={18} />
                  </div>
                  <div>
                    <p className="font-accent text-xs font-bold tracking-widest uppercase text-apex-muted mb-0.5">
                      {label}
                    </p>
                    <p className="font-body text-sm text-apex-dark font-semibold">{value}</p>
                    <p className="font-body text-xs text-apex-muted">{sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-2">
            {status === 'success' ? (
              <div className="border border-gold/40 bg-gold/5 p-10 text-center h-full flex flex-col items-center justify-center gap-4">
                <div className="w-16 h-16 border-2 border-gold flex items-center justify-center text-gold text-3xl">
                  ✓
                </div>
                <h3 className="font-accent font-bold text-xl text-apex-dark tracking-wide">Message Sent</h3>
                <p className="text-apex-muted font-body text-sm">
                  We'll get back to you within one business day.
                </p>
                <button
                  onClick={() => setStatus('idle')}
                  className="btn-outline-gold text-xs mt-4"
                >
                  Send Another
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block font-accent text-xs font-bold tracking-widest uppercase text-apex-dark mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Dr. Jane Smith"
                      className="input-field"
                    />
                  </div>
                  <div>
                    <label className="block font-accent text-xs font-bold tracking-widest uppercase text-apex-dark mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={form.email}
                      onChange={handleChange}
                      placeholder="you@institution.edu"
                      className="input-field"
                    />
                  </div>
                </div>
                <div>
                  <label className="block font-accent text-xs font-bold tracking-widest uppercase text-apex-dark mb-2">
                    Subject *
                  </label>
                  <select
                    name="subject"
                    required
                    value={form.subject}
                    onChange={handleChange}
                    className="input-field cursor-pointer"
                  >
                    <option value="">Select a subject…</option>
                    <option>Order Inquiry</option>
                    <option>Product Question</option>
                    <option>COA / Lab Results</option>
                    <option>Shipping & Tracking</option>
                    <option>Returns & Refunds</option>
                    <option>Wholesale / Bulk</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <label className="block font-accent text-xs font-bold tracking-widest uppercase text-apex-dark mb-2">
                    Message *
                  </label>
                  <textarea
                    name="message"
                    required
                    rows={6}
                    value={form.message}
                    onChange={handleChange}
                    placeholder="How can we help you?"
                    className="input-field resize-none"
                  />
                </div>

                {status === 'error' && (
                  <p className="text-red-500 text-xs font-body">
                    Something went wrong. Please email us directly at orders@apexpeptides.com
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="btn-gold flex items-center gap-2 disabled:opacity-60"
                >
                  <Send size={15} />
                  {status === 'loading' ? 'Sending…' : 'Send Message'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
