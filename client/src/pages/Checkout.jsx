import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Bitcoin, Wallet, FileText, ChevronRight, Copy, CheckCircle, Tag, ShieldCheck } from 'lucide-react'
import { useCart } from '../context/CartContext'

const WALLETS = {
  BTC:  '1ApexXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
  ETH:  '0xApexXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
  USDC: '0xApexXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
}

const STATES_US = ['AL','AK','AZ','AR','CA','CO','CT','DE','FL','GA','HI','ID','IL','IN','IA','KS','KY','LA','ME','MD','MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ','NM','NY','NC','ND','OH','OK','OR','PA','RI','SC','SD','TN','TX','UT','VT','VA','WA','WV','WI','WY']

const EMPTY_FORM = {
  firstName: '', lastName: '', email: '', phone: '',
  address1: '', address2: '', city: '', state: '', zip: '',
  notes: '',
}

function CopyButton({ text }) {
  const [copied, setCopied] = useState(false)
  function copy() {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }
  return (
    <button onClick={copy} className="text-gold hover:text-gold-700 transition-colors" title="Copy address">
      {copied ? <CheckCircle size={14} className="text-green-500" /> : <Copy size={14} />}
    </button>
  )
}

export default function Checkout() {
  const { items, subtotal, discount, discountAmount, total, clearCart } = useCart()
  const navigate = useNavigate()

  const [method, setMethod] = useState('crypto')
  const [coin, setCoin]     = useState('BTC')
  const [form, setForm]     = useState(EMPTY_FORM)
  const [txId, setTxId]     = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [errors, setErrors] = useState({})

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 px-4">
        <p className="font-accent text-xl tracking-widest text-apex-dark">Your cart is empty</p>
        <Link to="/products" className="btn-gold text-sm">Shop Now</Link>
      </div>
    )
  }

  function validate() {
    const e = {}
    if (!form.firstName.trim()) e.firstName = 'Required'
    if (!form.lastName.trim())  e.lastName  = 'Required'
    if (!form.email.trim())     e.email     = 'Required'
    if (!form.address1.trim())  e.address1  = 'Required'
    if (!form.city.trim())      e.city      = 'Required'
    if (!form.state)            e.state     = 'Required'
    if (!form.zip.trim())       e.zip       = 'Required'
    if (method === 'crypto' && !txId.trim()) e.txId = 'Please enter your transaction ID after sending payment'
    return e
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    setErrors({})
    setSubmitting(true)

    const order = {
      items:   items.map((i) => ({ id: i.product.id, name: i.product.name, size: i.size, qty: i.quantity, price: i.product.price })),
      subtotal, discount: discount ? { percent: discount.percent, label: discount.label } : null,
      discountAmount, total,
      paymentMethod: method,
      cryptoCoin:    method === 'crypto' ? coin : null,
      txId:          method === 'crypto' ? txId : null,
      customer: form,
      createdAt: new Date().toISOString(),
    }

    const DEMO = import.meta.env.VITE_DEMO_MODE === 'true' || !import.meta.env.VITE_API_URL
    if (DEMO) {
      await new Promise((r) => setTimeout(r, 1000))
      const orderId = 'APEX-' + Math.random().toString(36).slice(2,9).toUpperCase()
      clearCart()
      navigate('/order-confirmation', { state: { orderId, email: form.email, total, method } })
      return
    }

    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(order),
      })
      const data = await res.json()
      if (res.ok) {
        clearCart()
        navigate('/order-confirmation', { state: { orderId: data.orderId, email: form.email, total, method } })
      } else {
        setErrors({ submit: data.message || 'Order failed. Please try again.' })
      }
    } catch {
      setErrors({ submit: 'Server error. Please email orders@apexpeptides.com' })
    } finally {
      setSubmitting(false)
    }
  }

  function field(name, label, type = 'text', placeholder = '') {
    return (
      <div>
        <label className="block font-accent text-xs font-bold tracking-widest uppercase text-apex-dark mb-2">
          {label}
        </label>
        <input
          type={type}
          name={name}
          value={form[name]}
          onChange={(e) => setForm((f) => ({ ...f, [name]: e.target.value }))}
          placeholder={placeholder}
          className={`input-field ${errors[name] ? 'border-red-400' : ''}`}
        />
        {errors[name] && <p className="text-red-500 text-xs mt-1">{errors[name]}</p>}
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="bg-apex-dark py-10 px-4 text-center">
        <h1 className="font-display text-4xl md:text-5xl text-white tracking-widest">CHECKOUT</h1>
      </div>

      <form onSubmit={handleSubmit} noValidate>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

            {/* Left — shipping + payment */}
            <div className="lg:col-span-2 space-y-8">

              {/* Shipping */}
              <section className="card p-6">
                <h2 className="font-accent font-bold text-sm tracking-widest uppercase text-apex-dark mb-5 pb-4 border-b border-apex-border">
                  Shipping Information
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {field('firstName', 'First Name', 'text', 'John')}
                  {field('lastName',  'Last Name',  'text', 'Smith')}
                  <div className="sm:col-span-2">{field('email', 'Email Address', 'email', 'john@lab.com')}</div>
                  {field('phone', 'Phone (optional)', 'tel', '+1 (555) 000-0000')}
                  <div className="sm:col-span-2">{field('address1', 'Address Line 1', 'text', '123 Research Blvd')}</div>
                  {field('address2', 'Address Line 2 (optional)', 'text', 'Suite / Apt')}
                  {field('city', 'City', 'text', 'Boston')}
                  <div>
                    <label className="block font-accent text-xs font-bold tracking-widest uppercase text-apex-dark mb-2">State</label>
                    <select
                      value={form.state}
                      onChange={(e) => setForm((f) => ({ ...f, state: e.target.value }))}
                      className={`input-field cursor-pointer ${errors.state ? 'border-red-400' : ''}`}
                    >
                      <option value="">Select…</option>
                      {STATES_US.map((s) => <option key={s}>{s}</option>)}
                    </select>
                    {errors.state && <p className="text-red-500 text-xs mt-1">{errors.state}</p>}
                  </div>
                  {field('zip', 'ZIP Code', 'text', '02101')}
                </div>
              </section>

              {/* Payment method tabs */}
              <section className="card p-6">
                <h2 className="font-accent font-bold text-sm tracking-widest uppercase text-apex-dark mb-5 pb-4 border-b border-apex-border">
                  Payment Method
                </h2>
                <div className="flex gap-3 mb-6">
                  {[
                    { id: 'crypto', label: 'Cryptocurrency', icon: Bitcoin },
                    { id: 'manual', label: 'Manual Payment', icon: FileText },
                  ].map(({ id, label, icon: Icon }) => (
                    <button
                      key={id}
                      type="button"
                      onClick={() => setMethod(id)}
                      className={`flex-1 flex items-center justify-center gap-2 py-3 border font-accent text-xs font-semibold tracking-wider uppercase transition-all ${
                        method === id ? 'border-gold bg-gold/5 text-gold' : 'border-apex-border text-apex-gray hover:border-gold/50'
                      }`}
                    >
                      <Icon size={15} /> {label}
                    </button>
                  ))}
                </div>

                {/* Crypto panel */}
                {method === 'crypto' && (
                  <div>
                    <p className="text-sm font-body text-apex-gray mb-4">
                      Select your coin, send the exact amount to the address below, then paste your transaction ID.
                    </p>
                    {/* Coin selector */}
                    <div className="flex gap-2 mb-5">
                      {Object.keys(WALLETS).map((c) => (
                        <button
                          key={c}
                          type="button"
                          onClick={() => setCoin(c)}
                          className={`px-5 py-2 border font-accent text-sm font-bold tracking-wider transition-all ${
                            coin === c ? 'border-gold bg-gold text-white' : 'border-apex-border text-apex-gray hover:border-gold'
                          }`}
                        >
                          {c}
                        </button>
                      ))}
                    </div>
                    {/* Wallet address */}
                    <div className="bg-apex-light border border-apex-border p-4 mb-4">
                      <p className="font-accent text-xs font-semibold tracking-widest uppercase text-apex-muted mb-2">
                        Send {coin} to:
                      </p>
                      <div className="flex items-center justify-between gap-3">
                        <span className="font-mono text-xs text-apex-dark break-all">{WALLETS[coin]}</span>
                        <CopyButton text={WALLETS[coin]} />
                      </div>
                      <p className="text-xs text-red-500 font-body mt-3 font-semibold">
                        ⚠ Placeholder address — do not send real funds during this demo.
                      </p>
                    </div>
                    <div className="bg-gold/5 border border-gold/20 p-4 mb-5 text-xs font-body text-apex-gray">
                      Send exactly <strong className="text-apex-dark">${total.toFixed(2)} USD equivalent</strong> in {coin}.
                      Orders are processed after 1 network confirmation. Include your email in the memo/notes field of your transaction if possible.
                    </div>
                    <div>
                      <label className="block font-accent text-xs font-bold tracking-widest uppercase text-apex-dark mb-2">
                        Transaction ID / Hash *
                      </label>
                      <input
                        type="text"
                        placeholder="Paste your TX hash here after sending"
                        value={txId}
                        onChange={(e) => setTxId(e.target.value)}
                        className={`input-field font-mono text-xs ${errors.txId ? 'border-red-400' : ''}`}
                      />
                      {errors.txId && <p className="text-red-500 text-xs mt-1">{errors.txId}</p>}
                    </div>
                  </div>
                )}

                {/* Manual panel */}
                {method === 'manual' && (
                  <div>
                    <p className="text-sm font-body text-apex-gray mb-5">
                      Submit your order below. We'll email you payment instructions (bank transfer or money order)
                      within one business day. Your order is held for 48 hours pending payment.
                    </p>
                    <div className="bg-apex-light border border-apex-border p-4 text-xs font-body text-apex-gray space-y-1">
                      <p>✦ Bank transfers typically process in 1–2 business days</p>
                      <p>✦ Money orders ship to our P.O. Box (provided in confirmation email)</p>
                      <p>✦ Order ships once payment is confirmed</p>
                    </div>
                    <div className="mt-4">
                      <label className="block font-accent text-xs font-bold tracking-widest uppercase text-apex-dark mb-2">
                        Order Notes (optional)
                      </label>
                      <textarea
                        rows={3}
                        placeholder="Any special instructions…"
                        value={form.notes}
                        onChange={(e) => setForm((f) => ({ ...f, notes: e.target.value }))}
                        className="input-field resize-none"
                      />
                    </div>
                  </div>
                )}
              </section>
            </div>

            {/* Right — order summary */}
            <div className="lg:col-span-1">
              <div className="card p-6 sticky top-24">
                <h3 className="font-accent font-bold text-sm tracking-widest uppercase text-apex-dark mb-5 pb-4 border-b border-apex-border">
                  Order Summary
                </h3>

                <div className="space-y-4 mb-5">
                  {items.map(({ product, size, quantity }) => (
                    <div key={`${product.id}-${size}`} className="flex gap-3">
                      <img src={product.image} alt={product.name} className="w-12 h-12 object-cover shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="font-accent font-semibold text-xs text-apex-dark truncate">{product.name}</p>
                        <p className="text-xs text-apex-muted">{size} × {quantity}</p>
                      </div>
                      <span className="font-accent font-bold text-xs text-apex-dark shrink-0">
                        ${(product.price * quantity).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="border-t border-apex-border pt-4 space-y-2 text-sm font-body">
                  <div className="flex justify-between text-apex-gray">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-apex-gray">
                    <span>Shipping</span>
                    <span className={subtotal >= 150 ? 'text-green-600 font-semibold' : ''}>
                      {subtotal >= 150 ? 'FREE' : 'TBD'}
                    </span>
                  </div>
                  {discount && (
                    <div className="flex justify-between text-green-600 font-semibold">
                      <span className="flex items-center gap-1"><Tag size={11} /> {discount.percent}% off</span>
                      <span>−${discountAmount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between font-bold text-apex-dark text-base pt-2 border-t border-apex-border">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>

                {errors.submit && (
                  <p className="text-red-500 text-xs mt-4 font-body bg-red-50 p-3 border border-red-200">
                    {errors.submit}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={submitting}
                  className="btn-gold w-full flex items-center justify-center gap-2 mt-6 py-4 disabled:opacity-60"
                >
                  {submitting ? 'Placing Order…' : method === 'crypto' ? 'Confirm Crypto Order' : 'Request Invoice'}
                  <ChevronRight size={16} />
                </button>

                <div className="flex items-center justify-center gap-2 mt-4 text-apex-muted">
                  <ShieldCheck size={13} />
                  <p className="text-xs font-body">Secure · Discreet Packaging</p>
                </div>

                <p className="text-center text-xs text-apex-muted font-body mt-3">
                  For research purposes only. Must be 18+.
                </p>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}
