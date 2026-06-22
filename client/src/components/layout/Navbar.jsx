import { useState, useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { ShoppingCart, Menu, X, ChevronDown } from 'lucide-react'
import { useCart } from '../../context/CartContext'

const NAV_LINKS = [
  { label: 'Home',        to: '/' },
  { label: 'Products',    to: '/products' },
  { label: 'Lab Results', to: '/lab-results' },
  { label: 'About',       to: '/about' },
  { label: 'FAQ',         to: '/faq' },
  { label: 'Contact',     to: '/contact' },
]

export default function Navbar() {
  const { itemCount } = useCart()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled]     = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
  }, [location])

  return (
    <header
      className={`sticky top-0 z-50 bg-white transition-shadow duration-300 ${
        scrolled ? 'shadow-md' : 'shadow-sm'
      }`}
    >
      {/* ─── border-bottom gold accent ─── */}
      <div className="h-0.5 bg-gradient-to-r from-transparent via-gold to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link to="/" className="flex flex-col leading-none group">
            <span className="font-display text-2xl tracking-widest text-apex-dark group-hover:text-gold transition-colors">
              APEX
            </span>
            <span className="font-accent text-[9px] font-semibold tracking-[0.3em] text-gold -mt-1">
              PEPTIDES
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                className={({ isActive }) =>
                  `font-accent text-xs font-semibold tracking-widest uppercase transition-colors ${
                    isActive ? 'text-gold' : 'text-apex-gray hover:text-apex-dark'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-4">
            <Link
              to="/cart"
              className="relative p-2 text-apex-gray hover:text-gold transition-colors"
              aria-label="Cart"
            >
              <ShoppingCart size={20} />
              {itemCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-gold text-white text-[10px] font-bold w-4.5 h-4.5 rounded-full flex items-center justify-center min-w-[18px] min-h-[18px] px-1">
                  {itemCount}
                </span>
              )}
            </Link>

            <Link to="/products" className="hidden md:block btn-gold text-xs py-2 px-5">
              Shop Now
            </Link>

            {/* Mobile hamburger */}
            <button
              className="md:hidden p-2 text-apex-gray hover:text-apex-dark transition-colors"
              onClick={() => setMobileOpen((o) => !o)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-apex-border bg-white">
          <nav className="px-4 py-4 flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                className={({ isActive }) =>
                  `font-accent text-sm font-semibold tracking-widest uppercase py-2.5 border-b border-apex-border/50 transition-colors ${
                    isActive ? 'text-gold' : 'text-apex-gray'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
            <Link to="/products" className="btn-gold text-center mt-4 text-sm py-3">
              Shop Now
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}
