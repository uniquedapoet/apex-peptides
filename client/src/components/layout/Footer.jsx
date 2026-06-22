import { Link } from 'react-router-dom'
import { Instagram, Twitter, Facebook, Mail } from 'lucide-react'

const LINKS = {
  Shop: [
    { label: 'All Products',    to: '/products' },
    { label: 'Stacks',          to: '/products?category=Stacks' },
    { label: 'Recovery',        to: '/products?category=Recovery+%26+Healing' },
    { label: 'Growth Hormone',  to: '/products?category=Growth+Hormone' },
    { label: 'Weight Management', to: '/products?category=Weight+Management' },
  ],
  Company: [
    { label: 'About Us',        to: '/about' },
    { label: 'Lab Results',     to: '/lab-results' },
    { label: 'FAQ',             to: '/faq' },
    { label: 'Contact',         to: '/contact' },
  ],
  Legal: [
    { label: 'Research Disclaimer', to: '/disclaimer' },
    { label: 'Privacy Policy',      to: '/privacy' },
    { label: 'Terms of Service',    to: '/terms' },
    { label: 'Shipping Policy',     to: '/shipping' },
  ],
}

export default function Footer() {
  return (
    <footer className="bg-apex-dark text-white">
      {/* Gold top accent */}
      <div className="h-0.5 bg-gradient-to-r from-transparent via-gold to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">

          {/* Brand column */}
          <div className="lg:col-span-2">
            <div className="mb-4">
              <span className="font-display text-3xl tracking-widest text-white">APEX</span>
              <br />
              <span className="font-accent text-[9px] font-semibold tracking-[0.3em] text-gold">
                PEPTIDES
              </span>
            </div>
            <p className="text-white/60 text-sm font-body leading-relaxed max-w-xs">
              Premium research-grade peptides. Every batch independently tested for purity and potency.
            </p>
            <div className="flex gap-3 mt-6">
              {[
                { Icon: Instagram, label: 'Instagram' },
                { Icon: Twitter,   label: 'Twitter' },
                { Icon: Facebook,  label: 'Facebook' },
                { Icon: Mail,      label: 'Email' },
              ].map(({ Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="w-9 h-9 border border-white/20 flex items-center justify-center text-white/60 hover:border-gold hover:text-gold transition-colors"
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(LINKS).map(([heading, links]) => (
            <div key={heading}>
              <h4 className="font-accent text-xs font-bold tracking-widest uppercase text-gold mb-4">
                {heading}
              </h4>
              <ul className="space-y-2">
                {links.map((l) => (
                  <li key={l.label}>
                    <Link
                      to={l.to}
                      className="text-white/60 hover:text-white text-sm font-body transition-colors"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/40 text-xs font-body">
            © {new Date().getFullYear()} APEX PEPTIDES. All rights reserved.
          </p>
          <p className="text-white/30 text-xs font-body text-center sm:text-right max-w-lg">
            All products sold strictly for laboratory research purposes only. Not intended for human consumption, medical treatment, or veterinary use. Must be 18+ to purchase.
          </p>
        </div>
      </div>
    </footer>
  )
}
