import { Link } from 'react-router-dom'
import { Trash2, ShoppingBag, ChevronRight, Tag, X } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { useState } from 'react'
import { validatePromoCode } from '../data/discounts'

export default function Cart() {
  const {
    items, subtotal, discount, discountAmount, total,
    removeFromCart, updateQuantity, setPromoCode, promoCode,
  } = useCart()

  const [codeInput, setCodeInput] = useState(promoCode || '')
  const [codeError, setCodeError] = useState('')

  function applyCode() {
    if (!codeInput.trim()) return
    const valid = validatePromoCode(codeInput.trim())
    if (valid) {
      setPromoCode(codeInput.trim().toUpperCase())
      setCodeError('')
    } else {
      setCodeError('Invalid or expired code.')
    }
  }

  function removeCode() {
    setPromoCode('')
    setCodeInput('')
    setCodeError('')
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-5 px-4 py-20">
        <ShoppingBag size={56} className="text-apex-border" />
        <h2 className="font-display text-4xl tracking-widest text-apex-dark">YOUR CART IS EMPTY</h2>
        <p className="text-apex-muted font-body text-sm">Add some research peptides to get started.</p>
        <Link to="/products" className="btn-gold mt-2">Browse Products</Link>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="bg-apex-dark py-12 px-4 text-center">
        <h1 className="font-display text-4xl md:text-5xl text-white tracking-widest">YOUR CART</h1>
        <p className="text-white/40 font-body text-sm mt-2">{items.length} item{items.length !== 1 ? 's' : ''}</p>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

          {/* Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map(({ product, size, quantity }) => (
              <div key={`${product.id}-${size}`} className="card flex gap-5 p-5">
                <Link to={`/products/${product.id}`} className="shrink-0">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-24 h-24 object-cover"
                  />
                </Link>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <Link
                        to={`/products/${product.id}`}
                        className="font-accent font-bold text-apex-dark hover:text-gold transition-colors text-sm"
                      >
                        {product.name}
                      </Link>
                      <p className="text-xs text-apex-muted font-body mt-0.5">
                        {size} · {product.form}
                      </p>
                    </div>
                    <button
                      onClick={() => removeFromCart(product.id, size)}
                      className="text-apex-muted hover:text-red-500 transition-colors shrink-0"
                      aria-label="Remove item"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                  <div className="flex items-center justify-between mt-4">
                    {/* Qty */}
                    <div className="flex border border-apex-border">
                      <button
                        onClick={() => updateQuantity(product.id, size, quantity - 1)}
                        className="w-8 h-8 flex items-center justify-center text-apex-gray hover:text-apex-dark font-bold"
                      >
                        −
                      </button>
                      <span className="w-8 h-8 flex items-center justify-center font-accent font-bold text-sm text-apex-dark border-x border-apex-border">
                        {quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(product.id, size, quantity + 1)}
                        className="w-8 h-8 flex items-center justify-center text-apex-gray hover:text-apex-dark font-bold"
                      >
                        +
                      </button>
                    </div>
                    <span className="font-accent font-bold text-apex-dark">
                      ${(product.price * quantity).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            ))}

            <div className="flex justify-between pt-4">
              <Link to="/products" className="text-gold font-accent text-xs font-semibold tracking-widest uppercase hover:text-gold-700 transition-colors flex items-center gap-1">
                ← Continue Shopping
              </Link>
            </div>
          </div>

          {/* Order summary */}
          <div className="lg:col-span-1">
            <div className="card p-6 sticky top-24">
              <h3 className="font-accent font-bold text-sm tracking-widest uppercase text-apex-dark mb-5 pb-4 border-b border-apex-border">
                Order Summary
              </h3>

              {/* Promo code */}
              <div className="mb-5">
                <p className="font-accent text-xs font-semibold tracking-widest uppercase text-apex-muted mb-2">
                  Promo Code
                </p>
                {promoCode ? (
                  <div className="flex items-center justify-between bg-gold/10 border border-gold/30 px-3 py-2">
                    <span className="flex items-center gap-2 text-sm font-accent font-semibold text-gold">
                      <Tag size={13} /> {promoCode}
                    </span>
                    <button onClick={removeCode} className="text-apex-muted hover:text-red-500">
                      <X size={14} />
                    </button>
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Enter code"
                      value={codeInput}
                      onChange={(e) => { setCodeInput(e.target.value); setCodeError('') }}
                      onKeyDown={(e) => e.key === 'Enter' && applyCode()}
                      className="input-field flex-1 py-2 text-xs"
                    />
                    <button onClick={applyCode} className="btn-dark text-xs py-2 px-4">
                      Apply
                    </button>
                  </div>
                )}
                {codeError && <p className="text-red-500 text-xs mt-1.5 font-body">{codeError}</p>}
              </div>

              {/* Totals */}
              <div className="space-y-3 text-sm font-body">
                <div className="flex justify-between text-apex-gray">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-apex-gray">
                  <span>Shipping</span>
                  <span className={subtotal >= 150 ? 'text-green-600 font-semibold' : ''}>
                    {subtotal >= 150 ? 'FREE' : 'Calculated at checkout'}
                  </span>
                </div>
                {discount && (
                  <div className="flex justify-between text-green-600 font-semibold">
                    <span className="flex items-center gap-1.5">
                      <Tag size={12} />
                      Discount ({discount.percent}% off)
                    </span>
                    <span>−${discountAmount.toFixed(2)}</span>
                  </div>
                )}
                <div className="border-t border-apex-border pt-3 flex justify-between font-bold text-apex-dark text-base">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              {/* Discount tier hints */}
              {subtotal < 500 && (
                <div className="mt-4 bg-apex-light border border-apex-border p-3 text-xs font-body text-apex-gray">
                  {subtotal < 150 && <p>Spend <strong>${(150 - subtotal).toFixed(2)}</strong> more for <strong>5% off + free shipping</strong></p>}
                  {subtotal >= 150 && subtotal < 300 && <p>Spend <strong>${(300 - subtotal).toFixed(2)}</strong> more for <strong>10% off</strong></p>}
                  {subtotal >= 300 && subtotal < 500 && <p>Spend <strong>${(500 - subtotal).toFixed(2)}</strong> more for <strong>15% off</strong></p>}
                </div>
              )}

              <Link to="/checkout" className="btn-gold w-full text-center flex items-center justify-center gap-2 mt-6">
                Proceed to Checkout <ChevronRight size={16} />
              </Link>

              <p className="text-center text-xs text-apex-muted font-body mt-4">
                Secure checkout · Crypto & manual payment
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
