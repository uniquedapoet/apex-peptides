import { useLocation, Link } from 'react-router-dom'
import { CheckCircle, Package, Mail, ArrowRight } from 'lucide-react'

export default function OrderConfirmation() {
  const { state } = useLocation()

  if (!state?.orderId) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 px-4">
        <p className="font-accent text-xl tracking-widest text-apex-dark">No order found</p>
        <Link to="/" className="btn-gold text-sm">Return Home</Link>
      </div>
    )
  }

  const { orderId, email, total, method } = state

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-4 py-20">
      <div className="max-w-lg w-full">
        {/* Checkmark */}
        <div className="flex justify-center mb-8">
          <div className="w-20 h-20 border-2 border-gold flex items-center justify-center">
            <CheckCircle size={40} className="text-gold" />
          </div>
        </div>

        <div className="text-center mb-10">
          <span className="font-accent text-xs font-semibold tracking-[0.4em] uppercase text-gold">
            Order Received
          </span>
          <h1 className="font-display text-5xl text-apex-dark tracking-widest mt-2">
            THANK YOU
          </h1>
          <p className="text-apex-muted font-body text-sm mt-3">
            Your order has been successfully placed.
          </p>
        </div>

        {/* Order details */}
        <div className="card p-6 mb-6">
          <div className="grid grid-cols-2 gap-4 text-sm font-body">
            <div>
              <p className="text-apex-muted text-xs font-accent font-semibold tracking-widest uppercase mb-1">Order ID</p>
              <p className="font-mono font-bold text-apex-dark">{orderId}</p>
            </div>
            <div>
              <p className="text-apex-muted text-xs font-accent font-semibold tracking-widest uppercase mb-1">Total</p>
              <p className="font-bold text-apex-dark">${total?.toFixed(2)}</p>
            </div>
            <div>
              <p className="text-apex-muted text-xs font-accent font-semibold tracking-widest uppercase mb-1">Payment</p>
              <p className="font-semibold text-apex-dark capitalize">
                {method === 'crypto' ? 'Cryptocurrency' : 'Manual Payment'}
              </p>
            </div>
            <div>
              <p className="text-apex-muted text-xs font-accent font-semibold tracking-widest uppercase mb-1">Email</p>
              <p className="text-apex-dark truncate">{email}</p>
            </div>
          </div>
        </div>

        {/* Next steps */}
        <div className="space-y-4 mb-10">
          <h3 className="font-accent font-bold text-sm tracking-widest uppercase text-apex-dark">Next Steps</h3>
          {method === 'crypto' ? (
            <>
              <Step icon={CheckCircle} title="Payment Verification" desc="We're verifying your transaction on the blockchain. This typically takes 10–30 minutes." />
              <Step icon={Package} title="Order Fulfillment" desc="Once confirmed, your order will be packed and shipped within 24 hours." />
              <Step icon={Mail} title="Confirmation Email" desc={`A confirmation with tracking details will be sent to ${email}.`} />
            </>
          ) : (
            <>
              <Step icon={Mail} title="Invoice Email" desc={`Check ${email} for payment instructions within one business day.`} />
              <Step icon={CheckCircle} title="Complete Payment" desc="Send payment via the method provided. Your order ships once payment is confirmed." />
              <Step icon={Package} title="Fulfillment" desc="Orders ship within 24 hours of confirmed payment." />
            </>
          )}
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <Link to="/products" className="btn-outline-gold flex-1 text-center flex items-center justify-center gap-2">
            Continue Shopping <ArrowRight size={15} />
          </Link>
          <Link to="/contact" className="btn-dark flex-1 text-center">
            Need Help?
          </Link>
        </div>

        <p className="text-center text-xs text-apex-muted font-body mt-6">
          Order ID <span className="font-mono">{orderId}</span> — save this for your records.
        </p>
      </div>
    </div>
  )
}

function Step({ icon: Icon, title, desc }) {
  return (
    <div className="flex gap-4 items-start">
      <div className="w-8 h-8 border border-gold/30 flex items-center justify-center text-gold shrink-0 mt-0.5">
        <Icon size={15} />
      </div>
      <div>
        <p className="font-accent font-semibold text-sm text-apex-dark">{title}</p>
        <p className="text-xs text-apex-muted font-body mt-0.5 leading-relaxed">{desc}</p>
      </div>
    </div>
  )
}
