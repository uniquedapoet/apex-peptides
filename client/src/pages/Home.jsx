import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ShieldCheck, Zap, Truck, Star, ChevronRight, FlaskConical, Award, Clock } from 'lucide-react'
import ProductCard from '../components/ui/ProductCard'
import { getFeaturedProducts } from '../data/products'

const HERO_IMG = 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1600&q=80'
const WHY_IMG  = 'https://images.unsplash.com/photo-1579165466741-7f35e4755660?w=900&q=80'

const TRUST_ITEMS = [
  {
    Icon: FlaskConical,
    title: 'Third-Party Tested',
    desc:  'Every batch verified by independent labs for 99%+ purity.',
  },
  {
    Icon: Zap,
    title: 'Ships in 24 Hours',
    desc:  'Orders placed before 2PM EST ship same business day.',
  },
  {
    Icon: ShieldCheck,
    title: 'Secure Checkout',
    desc:  'Crypto and manual payment options — no stored card data.',
  },
  {
    Icon: Award,
    title: 'Quality Guaranteed',
    desc:  'Not satisfied? We stand behind every product we sell.',
  },
]

const TESTIMONIALS = [
  {
    name:   'Marcus T.',
    role:   'Research Scientist',
    rating: 5,
    quote:  'The BPC-157 purity is exceptional. COAs match exactly what is advertised. Will be reordering consistently.',
  },
  {
    name:   'Jordan R.',
    role:   'Sports Performance Researcher',
    rating: 5,
    quote:  'The GH Optimization Stack arrived well-packaged and ahead of schedule. Lab data was exactly what we needed.',
  },
  {
    name:   'Dr. S. Mercer',
    role:   'Independent Lab',
    rating: 5,
    quote:  'Consistently the most reliable supplier in the space. Purity profiles are top tier and communication is excellent.',
  },
]

const WHY_POINTS = [
  'Every batch tested by certified third-party laboratories',
  'Lyophilized powder form for maximum stability and shelf life',
  'Temperature-controlled packaging on all shipments',
  'Detailed Certificate of Analysis with every order',
  'Dedicated research support — we answer your questions',
  'Discreet, professional packaging',
]

export default function Home() {
  const featured = getFeaturedProducts()
  const [email, setEmail]       = useState('')
  const [subStatus, setSubStatus] = useState('idle') // idle | loading | success | error

  async function handleSubscribe(e) {
    e.preventDefault()
    if (!email) return
    setSubStatus('loading')

    const DEMO_MODE = import.meta.env.VITE_DEMO_MODE === 'true' || !import.meta.env.VITE_API_URL
    if (DEMO_MODE) {
      await new Promise((r) => setTimeout(r, 800))
      setSubStatus('success')
      setEmail('')
      return
    }

    try {
      const res = await fetch('/api/subscribers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      setSubStatus(res.ok ? 'success' : 'error')
      if (res.ok) setEmail('')
    } catch {
      setSubStatus('error')
    }
  }

  return (
    <div>
      {/* ── HERO ──────────────────────────────────────────────────── */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        <img
          src={HERO_IMG}
          alt="Apex Peptides Hero"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 overlay-dark" />

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <span className="inline-block font-accent text-xs font-semibold tracking-[0.4em] uppercase text-gold mb-6">
            Research Grade · Third-Party Tested
          </span>
          <h1 className="font-display text-6xl sm:text-7xl md:text-8xl text-white tracking-widest mb-6 leading-none">
            ELEVATE<br />
            <span className="text-gradient-gold">BEYOND</span><br />
            LIMITS
          </h1>
          <p className="text-white/70 font-body text-lg md:text-xl max-w-xl mx-auto mb-10 leading-relaxed">
            Premium peptides for serious research. Unmatched purity. Verified results.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/products" className="btn-gold text-sm px-10 py-4">
              Shop All Peptides
            </Link>
            <Link to="/lab-results" className="btn-outline-gold text-sm px-10 py-4 border-white text-white hover:bg-white hover:text-apex-dark">
              View Lab Results
            </Link>
          </div>
          <p className="text-white/35 text-xs font-body mt-8 tracking-wide">
            For research purposes only · Not for human consumption · Must be 18+
          </p>
        </div>

        {/* Scroll cue */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/40">
          <span className="text-[10px] font-accent tracking-widest uppercase">Scroll</span>
          <div className="w-px h-10 bg-gradient-to-b from-white/40 to-transparent" />
        </div>
      </section>

      {/* ── TRUST BAR ─────────────────────────────────────────────── */}
      <section className="bg-apex-light border-y border-apex-border py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {TRUST_ITEMS.map(({ Icon, title, desc }) => (
              <div key={title} className="flex flex-col items-center text-center gap-3">
                <div className="w-12 h-12 border border-gold/30 flex items-center justify-center text-gold">
                  <Icon size={22} />
                </div>
                <div>
                  <p className="font-accent font-bold text-sm text-apex-dark tracking-wide">{title}</p>
                  <p className="text-xs text-apex-muted font-body mt-1 leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURED PRODUCTS ─────────────────────────────────────── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <span className="font-accent text-xs font-semibold tracking-[0.4em] uppercase text-gold">
            Best Sellers
          </span>
          <h2 className="section-title mt-2">Featured Products</h2>
          <div className="gold-divider mx-auto" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featured.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
        <div className="text-center mt-10">
          <Link to="/products" className="btn-outline-gold inline-flex items-center gap-2">
            View All Products <ChevronRight size={16} />
          </Link>
        </div>
      </section>

      {/* ── WHY APEX ──────────────────────────────────────────────── */}
      <section className="bg-apex-light border-y border-apex-border py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <img
                src={WHY_IMG}
                alt="Lab quality"
                className="w-full object-cover aspect-square"
              />
              {/* Floating stat */}
              <div className="absolute -bottom-6 -right-6 bg-white border border-apex-border p-5 shadow-lg hidden sm:block">
                <p className="font-display text-4xl text-gold tracking-wider">99%+</p>
                <p className="font-accent text-xs font-semibold tracking-widest uppercase text-apex-gray mt-1">
                  Verified Purity
                </p>
              </div>
            </div>
            <div>
              <span className="font-accent text-xs font-semibold tracking-[0.4em] uppercase text-gold">
                Why Choose Apex
              </span>
              <h2 className="section-title mt-2 mb-4">
                Research-Grade<br />Peptides Delivered<br />to Your Door
              </h2>
              <div className="gold-divider" />
              <p className="text-apex-gray font-body leading-relaxed mb-8 mt-6">
                We source from world-class manufacturers and independently verify every batch before it ships.
                No shortcuts. No compromises. Just the highest-quality research peptides available.
              </p>
              <ul className="space-y-3 mb-8">
                {WHY_POINTS.map((point) => (
                  <li key={point} className="flex items-start gap-3 text-sm font-body text-apex-gray">
                    <span className="text-gold font-bold mt-0.5 shrink-0">✦</span>
                    {point}
                  </li>
                ))}
              </ul>
              <Link to="/about" className="btn-dark inline-flex items-center gap-2">
                Our Story <ChevronRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ─────────────────────────────────────────── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <span className="font-accent text-xs font-semibold tracking-[0.4em] uppercase text-gold">
            Trusted by Researchers
          </span>
          <h2 className="section-title mt-2">What They're Saying</h2>
          <div className="gold-divider mx-auto" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t) => (
            <div key={t.name} className="card p-8 flex flex-col gap-4">
              <div className="flex gap-1">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} size={14} className="text-gold fill-gold" />
                ))}
              </div>
              <blockquote className="text-apex-gray font-body text-sm leading-relaxed flex-1">
                "{t.quote}"
              </blockquote>
              <div className="border-t border-apex-border pt-4">
                <p className="font-accent font-bold text-sm text-apex-dark">{t.name}</p>
                <p className="text-xs text-apex-muted font-body">{t.role}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── EMAIL SIGNUP ─────────────────────────────────────────── */}
      <section className="bg-apex-dark py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Decorative gold lines */}
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-px h-full bg-gold" />
          <div className="absolute top-0 right-1/4 w-px h-full bg-gold" />
        </div>

        <div className="max-w-xl mx-auto text-center relative z-10">
          <span className="font-accent text-xs font-semibold tracking-[0.4em] uppercase text-gold">
            Exclusive Offer
          </span>
          <h2 className="font-display text-4xl md:text-5xl text-white tracking-widest mt-2 mb-4">
            GET 10% OFF
          </h2>
          <p className="text-white/60 font-body text-sm leading-relaxed mb-8">
            Subscribe to the APEX research newsletter and receive an exclusive 10% discount code
            instantly. Be first to know about new products, deals, and research updates.
          </p>

          {subStatus === 'success' ? (
            <div className="border border-gold/40 p-6 text-center">
              <p className="text-gold font-accent font-semibold tracking-widest text-sm mb-1">
                YOU'RE IN ✦
              </p>
              <p className="text-white/60 font-body text-sm">
                Check your email for your 10% discount code.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                required
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 bg-white/10 border border-white/20 text-white placeholder-white/40 px-4 py-3 font-body text-sm focus:outline-none focus:border-gold transition-colors"
              />
              <button
                type="submit"
                disabled={subStatus === 'loading'}
                className="btn-gold shrink-0 disabled:opacity-60"
              >
                {subStatus === 'loading' ? 'Subscribing…' : 'Subscribe'}
              </button>
            </form>
          )}

          {subStatus === 'error' && (
            <p className="text-red-400 text-xs mt-3 font-body">
              Something went wrong. Please try again.
            </p>
          )}

          <p className="text-white/30 text-xs font-body mt-4">
            No spam. Unsubscribe any time. For research professionals only.
          </p>
        </div>
      </section>
    </div>
  )
}
